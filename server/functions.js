"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getdataFromFile = exports.updateAppoinments = void 0;
//import { writeFile, readFileSync } from 'fs';
var fs = require("fs");
var axios_1 = require("axios");
function modify(obj, data) {
    var pacient_id = obj.pacient_id, type = obj.type, name = obj.name, time = obj.time;
    console.log(pacient_id);
    var nData = __spreadArray([], data);
    var data3;
    console.log(nData);
    var data1 = nData.filter(function (it) { return it.id === pacient_id; })[0];
    console.log('id_pacient type of data:', typeof data1, "; data1 :", data1);
    if (data1 === undefined) {
        data3 = { id: pacient_id, visits: [{ vizId: 0, type: type, name: name, time: time }] };
        nData.push(data3);
    }
    if (data1 !== undefined) {
        data3 = { vizId: data1.visits.length, type: type, name: name, time: time };
        data1.visits.push(data3);
    }
    console.log('data was modified.');
    return nData;
}
function write(data2, path) {
    fs.writeFile(path, data2, function (err) {
        if (err) {
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
function updateAppoinments(path, pacient_id, type, name, time) {
    var obj = { pacient_id: pacient_id, type: type, name: name, time: time };
    console.log('path:', path);
    //read file
    var data0 = fs.readFileSync(__dirname + ("/" + path), 'utf8');
    //console.log(typeof data0)
    var data = JSON.parse(data0);
    //  console.log( "data",data)
    // console.log('data', data0,  data);
    //modyfy data
    var data2 = modify(obj, data); //.toString();
    //  console.log('data2', data2);
    //let data4 = JSON.stringify(data2);
    //write data
    var d = JSON.stringify(data2, null, 2); //.toString();//https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
    // console.log("is ok" //,data2, typeof data2.toString()
    // , d)
    write(d, __dirname + ("/" + path));
    console.log(data2);
    console.log("finish updating appinintments");
}
exports.updateAppoinments = updateAppoinments;
function getdataFromFile(urlAPI, reactsetcallback, parameter) {
    axios_1["default"]
        .get("" + urlAPI)
        .then(function (res) {
        //log in browser
        console.log('data was received', JSON.parse(res.data));
        var data = JSON.parse(res.data);
        reactsetcallback(function (parameter) { return data; });
        //setpacientVisitsData(pacientVisitsData => data)
    })["catch"](function (err) {
        console.error(err);
    });
}
exports.getdataFromFile = getdataFromFile;
// updateAppoinments2(1,'type', 'name', new Date);
//updateAppoinments(2,'type', 'name', new Date);
module.exports = {
    updateAppoinments: updateAppoinments,
    getdataFromFile: getdataFromFile
};
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
