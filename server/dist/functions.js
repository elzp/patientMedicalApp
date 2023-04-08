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
