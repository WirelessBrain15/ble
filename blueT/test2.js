const bluetooth = require("webbluetooth").bluetooth;


deviceName = 'BP2941';
primaryUUID = '0000fff0-0000-1000-8000-00805f9b34fb';
writeUUID = "0000fff2-0000-1000-8000-00805f9b34fb";
readUUID  = "0000fff1-0000-1000-8000-00805f9b34fb";

const buffer = new ArrayBuffer(5);
const view = new DataView(buffer);
view.setInt8(0,0x00)
view.setInt8(1,0x02)
view.setInt8(2,0x03)
view.setInt8(3,0x40)
view.setInt8(4,0x45)

async function func(){
    isSuccess1 = false;
    isError1 = false;

	try {
		console.log("Requesting Bluetooth Devices...");

		const device = await bluetooth.requestDevice({
			filters: [{name: deviceName}],
            optionalServices: [primaryUUID]
		});
		console.log(`Found device: ${device.name}`);

		const server = await device.gatt.connect();
		console.log(`Gatt server connected: ${server.connected}`);
		
		const service = await server.getPrimaryService(primaryUUID);
		console.log(`Primary service: ${service.uuid}`);

		inboundChar = await service.getCharacteristic(readUUID);
        outboundChar = await service.getCharacteristic(writeUUID);

        console.log(inboundChar);
        console.log(outboundChar);

        await outboundChar.writeValueWithoutResponse(view);
        console.log(view.buffer);
        await inboundChar.startNotifications();
        await inboundChar.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
        console.log("after read");
        await inboundChar.startNotifications();
		console.log("Notifications started");

        async function handleCharacteristicValueChanged(event) {
            const value = event.target.value;
            // console.log("Length " + value.byteLength)
            for(var i = 0; i < value.byteLength; i++)
            {
                if (i == 2 && isError1 == false)
                {
                    sys = parseInt(value.getUint8(i).toString(16), 16);
                    console.log(` SYSTOLIC >> ${sys}`);
                }
                else if (i == 3 && isError1 == false)
                {
                    dia = parseInt(value.getUint8(i).toString(16), 16);
                    console.log(` DIASTOLIC >> ${dia}`);
                }
                else if (i == 4 && isError1 == false)
                {
                    pul = parseInt(value.getUint8(i).toString(16), 16);
                    console.log(` PULSE >> ${pul}`);
                }
                else if (i == 0 && isError1 == false && isSuccess1 == false)
                {
                    num = parseInt(value.getUint8(i).toString(16), 16);
                    if (num == 4)
                    {
                        console.log('Test Finished')
                        isSuccess1 = true;
                        isError1 = false;
                        return;
                    }
                    if (num == 2)
                    {
                        console.log('Error while measuring, please try again.')
                        isError1 = true;
                        isSuccess1 = false;
                        return;
                    }
                }
                // if (isSuccess == true)
                // {
                //     console.log(` Received ${i} : ${value.getUint8(i).toString(16)}`);    
                // }
            }
        }
	} catch(error) {
		console.log(error);
		process.exit(1);
	};
}

func();