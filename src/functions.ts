import { writeFile, readFileSync } from 'fs';
import * as fs from 'fs';
//import {writeFile} fs = require("fs")//.promises;
// const { readFile, writeFile } = require('fs').promises;

interface in0{
    vizId: number,
    type:string,
    name: string, 
    time:Date
}
interface in1{
    id: number, visits: Array<in0>
}


function modify (pacientid: number,obj:{type: string; name: string; time: Date;}, data: Array<in1>){
    const {type, name, time} = obj;
    let nData =[...data];
    let data3;
    console.log(nData)
    const data1 = nData.filter(it=> it.id === pacientid)[0];
    if( data1 === undefined) {
        data3 = {id: pacientid, visits: [{vizId: 0, type: type, name: name, time: time}]};
        nData.push(data3);
        }else {
            data3 = {vizId: data1.visits.length,  type: type, name: name, time: time};
            data1.visits.push(data3);
 }
 return nData;
}

function write (data2: string){
    fs.writeFile("../appointByUser.json", data2, function(err: any) {
        if(err) {
            return console.log("jakiś error");
        }
        console.log("changes are saved");
    });
    
 }
/*!!!error TypeError: fs.readFileSync is not a function - cannot use fs on browser-client side but only on server side; I must build mini express server 
https://stackoverflow.com/questions/45466848/fs-readfilesync-is-not-a-function-meteor-react*/
// export function updateAppoinments2(pacient_id:number, type: string, name: string, time: Date) {
//     //sugestion of ΔO 'delta zero' in https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
//     let obj = { type, name, time};
//    //read file
//    readFile("../appointByUser.json",'utf8')
//     //change to js object
//         .then((data0:string)=>JSON.parse(data0))
//     //modyfy data
//         .then((data: Array<in1>)=>modify(pacient_id,obj, data ))
//     //change data to string
//         .then((data2: Array<in1>)=>JSON.stringify(data2, null, 2))//Seth in https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
//     //write data in file
//         .then((body:string) => writeFile("../appointByUser.json", body))
//         .catch((error:any) => console.warn(error))
// }

 export function updateAppoinments(pacient_id:number, type: string, name: string, time: Date) {
     let obj = { type, name, time};
    //read file
    let data0 =fs.readFileSync("../appointByUser.json",'utf8');
    console.log(typeof data0)
    let data = JSON.parse(data0);
    console.log( "data",data)
   // console.log('data', data0,  data);
    //modyfy data
    let data2 = modify(pacient_id,obj, data )//.toString();
  //  console.log('data2', data2);
    //let data4 = JSON.stringify(data2);
    //write data
    let d =JSON.stringify(data2, null, 2)//.toString();//https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
    // console.log("is ok" //,data2, typeof data2.toString()
    
    // , d)
    write(d);
}

// updateAppoinments2(1,'type', 'name', new Date);
//updateAppoinments(2,'type', 'name', new Date);

module.exports = {updateAppoinments};
// [
//     { "id": 0,
//      "visits": [
//          {"vizId": 0,
//          "type" : "Gynecologist",
//          "name": "dr yellow Gynecologist",
//          "time": "time0"},
//          {"vizId": 1,
//              "type" : "Pediatrician",
//              "name": "dr Grey Pediatrician",
//              "time": "time1"}
//      ]
//     }
//  ]
