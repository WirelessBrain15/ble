const { Service } = require("noble");

deviceName = 'BP2941';
primaryUUID = '0000fff0-0000-1000-8000-00805f9b34fb';
writeUUID = "0000fff2-0000-1000-8000-00805f9b34fb";
readUUID  = "0000fff1-0000-1000-8000-00805f9b34fb";


function isWebBluetoothEnabled() {
    if (!navigator.bluetooth) {
      console.log('Web Bluetooth API is not available in this browser!')
      return false
    }

    return true
  }

  
async function bleConnect(){
    try{
        console.log('Requesting BLE devices... ');
        device = await navigator.bluetooth.requestDevice({
            filters: [{name: deviceName}],
            optionalServices: [{primaryUUID}]
        });
        
        server = await device.gatt.connect();
        const service = await server.getPrimaryService(primaryUUID);
        inboundChar = await service.getCharachtersistic(readUUID);
        outboundChar = await service.getCharachtersistic(writeUUID);
    }
    catch(error){
        console.log(`Failed, ${error}`);
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.stopPropagation()
    event.preventDefault()

    if (isWebBluetoothEnabled()) {
      bleConnect()
    }
  })