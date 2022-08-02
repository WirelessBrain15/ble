// TO RUN : paste the script in the rdev4 folder and execute "node bleBP.js" in terminal
// STATUS :  WORKING BUT REQUIRES BUG FIXES.
// --> if both devices connected [WORKING]
// --> if only bp connected [NOT WORKING]
// --> if only gluco connected [NOT TESTED]
// --> gluco testing after/before bp [NOT TESTED]

const bluetooth = require("webbluetooth").bluetooth;

deviceNameBP = 'BP2941';
primaryUUIDBP = '0000fff0-0000-1000-8000-00805f9b34fb';
writeUUIDBP = "0000fff2-0000-1000-8000-00805f9b34fb";
readUUIDBP  = "0000fff1-0000-1000-8000-00805f9b34fb";

const buffer = new ArrayBuffer(5);
const view = new DataView(buffer);
view.setInt8(0,0x00)
view.setInt8(1,0x02)
view.setInt8(2,0x03)
view.setInt8(3,0x40)
view.setInt8(4,0x45)

isErrorBP = false;
isSuccessBP = false;

async function bleConnectBP(){
    deviceBP = await bluetooth.requestDevice({
        filters: [{name: deviceNameBP}],
        optionalServices: [primaryUUIDBP]
    });
    try{
        console.log('Requesting BLE devices... ');

        if(!deviceBP.gatt.connected)
        {
            serverBP = await deviceBP.gatt.connect();
            console.log(`serverBP: ${serverBP}`);
        }

        
        bpTest();
        
    }
    
    catch(error){
        if(!deviceBP.gatt.connected)
        {
            console.log(`Failed, to connect to BP device`);
        }
    }
}

async function bpTest()
    {
        isSuccessBP = false;
        isErrorBP = false;

        console.log("Starting");

        if(deviceBP.gatt.connected)
            {
                console.log(deviceBP);
                // console.log("connected to ble");
                // const service = await serverBP.getPrimaryService("0000fff0-0000-1000-8000-00805f9b34fb")

                const serviceBP = await serverBP.getPrimaryService(primaryUUIDBP);
                inboundCharBP = await serviceBP.getCharacteristic(readUUIDBP);
                outboundCharBP = await serviceBP.getCharacteristic(writeUUIDBP);

                console.log(inboundCharBP);
                console.log(outboundCharBP);

                
                await outboundCharBP.writeValueWithoutResponse(view);
                console.log(view.buffer);


                await inboundCharBP.startNotifications();
                await inboundCharBP.addEventListener('characteristicvaluechanged', handleCharacteristicValueChangedBP);
                console.log("after read");
                await inboundCharBP.startNotifications();

            }
        else 
        {
            bleConnectBP();
        }
        
        
    }

    async function handleCharacteristicValueChangedBP(event) {
        const value = event.target.value;
        // console.log("Length " + value.byteLength)
        for(var i = 0; i < value.byteLength; i++)
        {
            if (i == 2 && isErrorBP == false)
            {
                sys = parseInt(value.getUint8(i).toString(16), 16);
                console.log(` SYSTOLIC >> ${sys}`);
            }
            else if (i == 3 && isErrorBP == false)
            {
                dia = parseInt(value.getUint8(i).toString(16), 16);
                console.log(` DIASTOLIC >> ${dia}`);
            }
            else if (i == 4 && isErrorBP == false)
            {
                pul = parseInt(value.getUint8(i).toString(16), 16);
                console.log(` PULSE >> ${pul}`);
            }
            else if (i == 0 && isErrorBP == false && isSuccessBP == false)
            {
                num = parseInt(value.getUint8(i).toString(16), 16);
                if (num == 4)
                {
                    console.log('Test Finished')
                    isSuccessBP = true;
                    isErrorBP = false;

                    // if(flag == false && isSuccessBP == True)
                    // {
                    //     console.log("Glucometer not connected, trying again...");
                    //     bleConnect();
                    // }
                    return;
                }
                if (num == 2)
                {
                    console.log('Error while measuring, please try again.')
                    isErrorBP = true;
                    isSuccessBP = false;
                    return;
                }
            }
            // if (isSuccess == true)
            // {
            //     console.log(` Received ${i} : ${value.getUint8(i).toString(16)}`);    
            // }
        }
    }

    bleConnectBP();