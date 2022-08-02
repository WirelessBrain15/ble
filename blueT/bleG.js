// TO RUN : paste the script in the rdev4 folder and execute "node bleG.js" in terminal
// STATUS :  WORKING BUT REQUIRES BUG FIXES.
// --> if both devices connected [WORKING]
// --> if only bp connected [NOT WORKING]
// --> if only gluco connected [NOT TESTED]
// --> gluco testing after/before bp [NOT TESTED]


const bluetooth = require("webbluetooth").bluetooth;

deviceName = 'Contour7803H6996366';
primaryUUID = '00001808-0000-1000-8000-00805f9b34fb';
readUUID  = "00002a18-0000-1000-8000-00805f9b34fb";

flag = false;
isError = false;

async function bleConnect(){
    device = await bluetooth.requestDevice({
        filters: [{name: deviceName}],
        optionalServices: [primaryUUID]
    });
    try{
        console.log(`looking for glucometer..`)
        
        if(!device.gatt.connected)
        {
            server = await device.gatt.connect();
            console.log(`server: ${server}`);
            flag = true;

        }

        
        glucoTest(flag);
    }
    

    catch(error)
    {
        console.log(error);
        if(!device.gatt.connected)
        {
            console.log("Could not find glucometer")
            // bleConnect();
        }
        
    }
    
}

async function glucoTest(flag)
    {
        console.log(`glucometer found..`)
        if (flag == true)//(device.gatt.connected)
        {
            const service = await server.getPrimaryService(primaryUUID);
            inboundChar = await service.getCharacteristic(readUUID);

            console.log(inboundChar);

            await inboundChar.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
            // console.log("after read");
            await inboundChar.startNotifications();
        }
        else 
        {
            console.log("Glucometer not connected, trying again...");
            bleConnect();
        }
    }

    async function handleCharacteristicValueChanged(event) {
        console.log("hello")
        const value = event.target.value;
        console.log("Length " + value.byteLength)
        for(var i = 0; i < value.byteLength; i++)
        {
            if (i == 12 && isError == false)
            {
                d1 = parseInt(value.getUint8(i), 16);
                console.log(` d1 >> ${d1}`);
            }
            else if (i == 13 && isError == false)
            {
                d2 = parseInt(value.getUint8(i), 16);
                console.log(` d2 >> ${d2}`);

                console.log(`result : ${(d2 - 374)*100 + d1}`)
            }
            // else if ()   //  Success or failure
            // {}
            else
            {
                console.log(` Received ${i} : ${value.getUint8(i).toString(16)}`);    
            }
        }
    }


    bleConnect();
