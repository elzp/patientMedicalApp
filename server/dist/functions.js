import * as fs from 'fs';
import { __dirname } from './configuration.js';
function modify(obj, data) {
    const { pacient_id, type, name, time } = obj;
    console.log(pacient_id);
    let copyOfData = [...data];
    let data3;
    console.log(copyOfData);
    const filteredData = copyOfData.filter(it => it.id == `${pacient_id}`)[0];
    console.log('id_pacient type of data:', typeof filteredData, "; filteredData :", filteredData);
    if (filteredData === undefined) {
        const madeId = `${pacient_id}`;
        data3 = { id: madeId, visits: [{ vizId: 0, type: type, name: name, time: time }] };
        copyOfData.push(data3);
    }
    if (filteredData !== undefined) {
        data3 = { vizId: filteredData.visits.length, type: type, name: name, time: time };
        filteredData.visits.push(data3);
    }
    console.log('data was modified.');
    return copyOfData;
}
export function write(JSONData, path) {
    fs.writeFile(path, JSONData, function (err) {
        if (err) {
            return console.log("problems with write json text with new data");
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
export function updateAppoinments(path, pacient_id, type, name, time) {
    let obj = { pacient_id, type, name, time };
    console.log('path:', path);
    //read file
    let dataFromFile = fs.readFileSync(__dirname + `/${path}`, 'utf8');
    let parsedDataFromFile = JSON.parse(dataFromFile);
    //modyfy data
    let modifiedData = modify(obj, parsedDataFromFile);
    //write data
    let stringifiedAndModifiedData = JSON.stringify(modifiedData, null, 2); //https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
    write(stringifiedAndModifiedData, __dirname + `/${path}`);
    console.log(modifiedData);
    console.log("finish updating appinintments");
}
// updateAppoinments2(1,'type', 'name', new Date);
//updateAppoinments(2,'type', 'name', new Date);
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
