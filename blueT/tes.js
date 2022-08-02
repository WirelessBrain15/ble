var buffer = new ArrayBuffer(5);
//var bufferview = new Uint8Array(buffer);


// bufferview[0] = 0x00;
// bufferview[1] = 0x02;
// bufferview[1] = 0x03;
// bufferview[1] = 0x40;
// bufferview[1] = 0x45;
// console.log(buffer);
    //Create a DataView referring to the buffer
    var view1 = new DataView(buffer,0);
    view1.setInt8(0,0xb1)
    view1.setInt8(1,0x02)
    view1.setInt8(2,0x03)
    view1.setInt8(3,0x40)
    view1.setInt8(4,0x45)
    console.log(view1)
  
    //Create a Int8Array view referring to the buffer
 //   var view2 = new Int8Array(buffer);
  
    //Put value of 32bits
    // view1.setInt32(1, 0x0002034045);
    //view1.setInt32(0, 0x0102030405);
    //console.log(view1)

    //console.log(enc.encode('0002304045'))
    //prints the 32bit value 
   if(parseInt(view1.getUint8(1), 16) == 2)
   {
      d1 = parseInt(view1.getUint8(1), 16);
   }
   console.log(d1 + parseInt(view1.getUint8(0), 16)); 
      
    //prints only 8bit value 
    //console.log(view1.getInt8(0).toString(16) + "<br>"); 
    //console.log(view2[0].toString(16));
      
    //   function str2ab(str) {
    //     var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    //     var bufView = new Uint16Array(buf);
    //     for (var i=0, strLen=str.length; i<strLen; i++) {
    //       bufView[i] = str.charCodeAt(i);
    //     }
    //     return buf;
    //   }

    //   console.log(str2ab("0002034045"));