"use strict";
//const fs = require("fs")//.promises;
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.updateAppoinments = void 0;
var fs2 = require("fs").promises;
function modify(pacientid, obj, data) {
    var type = obj.type, name = obj.name, time = obj.time;
    var nData = __spreadArrays(data);
    var data3;
    console.log(nData);
    var data1 = nData.filter(function (it) { return it.id === pacientid; })[0];
    if (data1 === undefined) {
        data3 = { id: pacientid, visits: [{ vizId: 0, type: type, name: name, time: time }] };
        nData.push(data3);
    }
    else {
        data3 = { vizId: data1.visits.length, type: type, name: name, time: time };
        data1.visits.push(data3);
    }
    return nData;
}
// function write (data2: string){
//     fs.writeFileSync("../appointByUser.json", data2, function(err: any) {
//         if(err) {
//             return console.log("jakiś error");
//         }
//         console.log("changes are saved");
//     });
// }
function updateAppoinments(pacient_id, type, name, time) {
    //sugestion of ΔO 'delta zero' in https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
    var obj = { type: type, name: name, time: time };
    //read file
    fs2.readFile("../appointByUser.json", 'utf8')
        //change to js object
        .then(function (data0) { return JSON.parse(data0); })
        //modyfy data
        .then(function (data) { return modify(pacient_id, obj, data); })
        //change data to string
        .then(function (data2) { return JSON.stringify(data2, null, 2); }) //https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
        //write data in file
        .then(function (body) { return fs2.writeFile("../appointByUser.json", body); })["catch"](function (error) { return console.warn(error); });
}
exports.updateAppoinments = updateAppoinments;
//  export function updateAppoinments2(pacient_id:number, type: string, name: string, time: Date) {
//      let obj = { type, name, time};
//     //read file
//     let data0 = fs.readFileSync("../appointByUser.json",'utf8');
//     console.log(typeof data0)
//     let data = JSON.parse(data0);
//     console.log( "data",data)
//    // console.log('data', data0,  data);
//     //modyfy data
//     let data2 = modify(pacient_id,obj, data )//.toString();
//   //  console.log('data2', data2);
//     //let data4 = JSON.stringify(data2);
//     //write data
//     let d =JSON.stringify(data2, null, 2)//.toString();//https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
//     // console.log("is ok" //,data2, typeof data2.toString()
//     // , d)
//    //// write(d);
// }
// updateAppoinments2(1,'type', 'name', new Date);
//updateAppoinments(2,'type', 'name', new Date);
module.exports = { updateAppoinments: updateAppoinments };
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
