//    ---------------------------------------------------------------------
// chrome://flags/#enable-experimental-web-platform-features
//    ---------------------------------------------------------------------

// import browserEnv from 'browser-env';

// browserEnv(['navigator']);

// const bluetooth = require("webbluetooth").bluetooth;

// global.navigator.bluetooth.requestDevice({
//     filters: [{
//       services: ['acceptAllDevices:true']
//     }]
//    })
//    .then((device) => {
//      return device.gatt.connect()
//    })
//    .then((server) => {
//      return server.getPrimaryService('battery_service');
//    })
//    .then((service) => {
//      return service.getCharacteristic('battery_level');
//    })
//    .then((characteristic) => {
//      return characteristic.readValue();
//    })
//    .then((value) => {
//      console.log('Battery percentage: ' + value.getUint8(0));
//    })
//    .catch((error) => {
//      console.error(error);
//    });

//    ---------------------------------------------------------------------

// const gatttool = require("gatttool");
// const { Writable } = require("stream");

// const fs = require("fs");
 
// const ble = new Writable({
//   objectMode: true,
//   write: (data, encoding, done) => {
//     console.log(`[stream] ←${data.toString(encoding)}`);
//     done();
//   }
// });
 
// const handleData = data => console.log(`[onData] ←${data}`);
 
// (async function() {
//   gatttool.start({ onData: handleData, stream: ble }); //onData: handleData, stream: ble 
 
//   const btAddress = "59:4B:00:00:B6:96";
//   console.log(`Found a BT device at: ${btAddress}`);
 
//   if (btAddress) {
//     try
//     {
//     // setTimeout(() => gatttool.write(`-I >> reading.txt`), 400);
//       setTimeout(() => gatttool.write(`connect ${btAddress}`), 500);
  
//     setTimeout(() => gatttool.write("char-write-req 1a 0002034045"), 10000);

//     // setTimeout(() => console.log(handleData), 12000);
//     // setTimeout(() => gatttool.write("char-desc 0x0017"), 40000);
    
//     setTimeout(() => {const temp = gatttool.write("char-read-hnd 0x0017")
//   console.log(`test variable : ${temp}`)
// }, 40000);
//   } 
//   catch(err)
//   {
//     console.error(err, `Error occured`)
//     process.exit();
//   }
// }
// })();

// function output() 
// {
//   fs.readFile('reading.txt', (error, txtString) => {
 
//     if (error) throw err;
 
//     console.log(txtString.toString());
 
//   });
// }
//    ---------------------------------------------------------------------

// var noble = require('@abandonware/noble');

// // noble.startScanning();

// var peripheralIdOrAddress = "59:4B:00:00:B6:96";

// noble.on('stateChange', function(state) {
//   if (state === 'poweredOn') {
//     noble.startScanning();
//     console.log("Powered On")
//   } else {
//     noble.stopScanning();
//     console.log("Powered Off")
//   }
// });

// noble.on('scanStart', ()=>console.log("Scanning started"))
// noble.on('scanStop', ()=>console.log("Scanning stopped"))

// noble.on('discover', function(peripheral) {
//   console.log("Discovered something!");
//   if (peripheral.id === peripheralIdOrAddress || peripheral.address === peripheralIdOrAddress) 
//   {
//     noble.stopScanning();
//     console.log('peripheral with ID ' + peripheral.id + ' found');
//     var advertisement = peripheral.advertisement;
//     console.log(JSON.stringify(advertisement));

//     peripheral.on('disconnect', function() {
//       console.log("Peripheral disconnected");
//       process.exit(0);
//     });

//     peripheral.on('connect', ()=>console.log("Peripheral connected"));
  
//     peripheral.connect(function(error) {
//       peripheral.discoverServices("a0521000-2a63-479e-9d0a-09dfa7c8fd98",()=>console.log("Service discovered"));

//     });
//   }
//   else{console.log("Not the one.  still searching...")}
// });

//    ---------------------------------------------------------------------

const bluetooth = require("webbluetooth").bluetooth;

// const deviceFound = (device, selectFn) => {
//   if (device.name === 'BP2941') return true;
// };

// const bluetooth = new Bluetooth({ deviceFound });

const device = bluetooth.requestDevice({
  filters:[{ "name": 'BP2941' },{services: ['0000fff1-0000-1000-8000-00805f9b34fb']}]
})

setTimeout(() => {const server = device.gatt.connect();}, 5000)
