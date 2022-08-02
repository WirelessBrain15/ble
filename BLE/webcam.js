// var myFunc = () =>
// {
//     console.log("test arrow func");
// }

var video = document.querySelector("#videoElement");
var container = document.querySelector("#container");

function startStream()
{
    if (navigator.mediaDevices.getUserMedia)
    {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(function (stream)
        {
            video.srcObject = stream;
        })
        .catch(function (err0r)
        {
            console.log("something went wrong!");
        });
    }
}

function stop(e)
{
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for(var i = 0; i < tracks.length; i++)
    {
        var track = tracks[i];
        track.stop();
    }
    video.srcObject = null;
}

// ------------------------------------------------------------------------ 

const bluetooth = require("webbluetooth").bluetooth;

bluetooth.requestDevice({
    filters: [{
      services: ['acceptAllDevices:true']
    }]
   })
   .then((device) => {
     return device.gatt.connect()
   })
   .then((server) => {
     return server.getPrimaryService('battery_service');
   })
   .then((service) => {
     return service.getCharacteristic('battery_level');
   })
   .then((characteristic) => {
     return characteristic.readValue();
   })
   .then((value) => {
     console.log('Battery percentage: ' + value.getUint8(0));
   })
   .catch((error) => {
     console.error(error);
   });
// ------------------------------------------------------------------------ 

// video.addEventListener("click", function(event)
// {
//     var rect = container.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     console.log(`x: ${x}   y: ${y}`);
//     document.getElementById('coorX').innerHTML = "X: " + x;
//     document.getElementById('coorY').innerHTML = "Y: " + y;
// },false);

// function printMousePos(event)
// {
//     document.body.textContent = "clientX: " + event.clientX + 
//     " - clientY: " + event.clientY;
// }
// document.addEventListener("click",printMousePos);


var ros = new ROSLIB.Ros({
    url : 'ws://192.168.0.120:9091'
  });
  
  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });
  
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });
  
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
  
// ------------------------------------------------------------------------ 
  
//   var result = new ROSLIB.Topic({
//     ros : ros,
//     name : '/mouseClick',
//     messageType : 'geometry_msgs/Point'
//   });

//   var msg = new ROSLIB.Message({
//       x : 0,
//       y : 0,
//       z : 0
//   });


// // var container = document.querySelector("#webcamera1");

// container.addEventListener("click", function(event)
// {
//     var rect = container.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     console.log(`x: ${x}   y: ${y}`);
//     msg.x = x;
//     msg.y = y;
//     // msg.z = 0;
//     result.publish(msg);
//     document.getElementById('coorX').innerHTML = "X: " + x;
//     document.getElementById('coorY').innerHTML = "Y: " + y;
// },false);


// ------------------------------------------------------------------------

// var result = new ROSLIB.Topic({
//   ros : ros,
//   name : '/medicine',
//   messageType : 'medicine_despense/medicine'
//   });
  
//   var msg = new ROSLIB.Message(
//       {medicine_list: ["bananas","are","excellent", "source","of","pottassium","period","iconoclastic"]}
//   );

// container.addEventListener("click", function(event)
// {
//   result.publish(msg);
//   console.log('hello');
// },false);
  
// ------------------------------------------------------------------------

// var result = new ROSLIB.Topic({
//   ros : ros,
//   name : '/keyPress',
//   messageType : 'std_msgs/String'
// });

// // for(var i = 0; i< 10 ; i++)
// // {
// // // var msg = new ROSLIB.Message({JSON.stringify("test_msg")});
// // result.publish("test");
// // }

// let started = false;

// let x = 0;

// var buttonUP = document.getElementById('up');
// var buttonDown = document.getElementById('down');
// var buttonRight = document.getElementById('right');
// var buttonLeft = document.getElementById('left');

// buttonUP.addEventListener('mousedown', upStart);
// buttonUP.addEventListener('mouseup', upHold);

// buttonDown.addEventListener('mousedown', downStart);
// buttonDown.addEventListener('mouseup', downHold);

// buttonLeft.addEventListener('mousedown', leftStart);
// buttonLeft.addEventListener('mouseup', leftHold);

// buttonRight.addEventListener('mousedown', rightStart);
// buttonRight.addEventListener('mouseup', rightHold);

// function upStart()
// {
//     console.log('UP START');
//     var msg = new ROSLIB.Message({data:'UPSTART'});
//     result.publish(msg);
//     started = true;
//     // buttonUP.addEventListener('click', holdVal);
// }

// function upHold()
// {
//   console.log('UP HOLD');
//   var msg = new ROSLIB.Message({data:'UPHOLD'});
//   started = false;
//   result.publish(msg);
// }

// function downStart()
// {
//   console.log('DOWN START');
//   var msg = new ROSLIB.Message({data:'DWSTART'});
//   result.publish(msg);
//   started = true;
//   // buttonDown.addEventListener('mouseover', holdVal);
// }

// function downHold()
// {
//   console.log('DOWN HOLD');
//   var msg = new ROSLIB.Message({data:'DWHOLD'});
//   started = false;
//   result.publish(msg);
// }

// function leftStart()
// {
//     console.log('LEFT START');
//     var msg = new ROSLIB.Message({data:'LFSTART'});
//     result.publish(msg);
//     started = true;
//     // buttonLeft.addEventListener('mouseover', holdVal);
// }

// function leftHold()
// {
//   console.log('LEFT HOLD');
//   var msg = new ROSLIB.Message({data:'LFHOLD'});
//   started = false;
//   result.publish(msg);
// }

// function rightStart()
// {
//   console.log('RIGHT START');
//   var msg = new ROSLIB.Message({data:'RTSTART'});
//   result.publish(msg);
//   started = true;
//   // buttonRight.addEventListener('mouseover', holdVal);
// }

// function rightHold()
// {
//   console.log('RIGHT HOLD');
//   var msg = new ROSLIB.Message({data:'RTHOLD'});
//   started = false;
//   result.publish(msg);
// }

// function holdVal()
// {
//   while (started == true)
//   {
//     var msg = new ROSLIB.Message({data:'W'});
//     result.publish(msg);
//     console.log('mouseover')
//   }
// }

// ------------------------------------------------------------------------

var result = new ROSLIB.Topic({
  ros : ros,
  name : '/medicine',
  messageType : 'medicine_despense/medicine'
  });

var msg = new ROSLIB.Message(
  {
    medicine_list: ["A","C"]
  }
);

button = document.getElementById("up");
button.addEventListener('click', () => result.publish(msg));