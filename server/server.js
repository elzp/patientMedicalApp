"use strict";
exports.__esModule = true;
// tslint:disable-next-line: no-var-requires
var express = require('express');
//  import express from 'express';
/*install :
npm install --save-dev @types/node
and 'npm install --save-dev @types/express;
npm add -D @types/node @types/express '; to get access to ts types for
 express (in development phase).*/
// tslint:disable-next-line: no-var-requires
var cors = require('cors');
/* import cors from 'cors';
import * as fs from 'fs';
npm i cors ; npm i @types/cors
bug with express_1[default](): https://stackoverflow.com/questions/
34520288/node-js-typescript-unclear-syntax-with-type-script-compiled-code - replace import with require();

*/
var app = express();
var port = 3001;
/*

2021-05-09 19:19 - npm install -g typescript


--------------------
2021-05-09 19:35 -
https://stackoverflow.com/questions/57998762/run-nodemon-with-typescript-compiling :
add

"start": "tsc-watch ./server/server.ts --project
 . --outDir ./server --onSuccess \"nodemon ./server/server.js\""

to  scripts in package.json in root of app/project i zainstalowano
 npm i g tsc-watch gdyż terminal zgłosił że nie nie mam takiej paczki.
--------------------------

!!! https://stackoverflow.com/questions/49582984/
how-do-i-disable-js-file-is-a-commonjs-module-it-may-be-converted-to-an-es6
 to fix problem
  "Not using the local TSLint version found for
  'c:/Users/lenovo/Documents/ITProjects/react-node/patientApp(04-2021)/
patient-doctor-app/server/server.js' To enable code execution from
  the current workspace you must enable workspace library execution.tslint(1)"
USE: ctrl+shift+P THEN write : "workbench.action.configureLanguageBasedSettings"
and in opened "file settings.json" add options:

"typescript.suggestionActions.enabled": false,
"javascript.suggestionActions.enabled": false
.
----------------------

use npm run server and  find out why in js is exports.__esModule = true;
ReferenceError: exports is not defined
- deleted {"type": "module"} from package.json in server folder and works!! :)

*/
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/', function (req, res) {
    //// res.send('Hello World!')
});
// tslint:disable-next-line: only-arrow-functions
//app.post('/newVisit', function(req:any, res:any) {
// const newDataOfVisit = {
//     pacientid: req.body.id,
//     type: req.body.type,
//     name: req.body.name,
//     time: req.body.time,
// };
// const { type , name , time } = req.body;
// id:pacientid, type: selectedOption[0],name: selectedOption2[0], time:startDate
// books.push(newBook);
// updateAppoinments({pacientid, type, name, time})
// tslint:disable-next-line: no-console
// console.log({name: name , type: type, time: time});
//res.send({name: name , type: type, time: time})
app.post('/newVisit', function (req, res) {
    console.log(req.body, 'posted on newvisit');
    // res.send(
    //   `I received your POST request. This is what you sent me:`  
    //  // ${req.body.post}`
    //   )
    var _a = req.body, pacientid = _a.pacientid, type = _a.type, name = _a.name, time = _a.time;
    res.json({ name: name, pacientid: pacientid, type: type, time: time }
    // ${req.body.post}`
    );
});
//   app.get('/newVisit', (req, res) => {
//     const {pacientid, type, name, time } = req.body;
//     //id:pacientid, type: selectedOption[0],name: selectedOption2[0], time:startDate
//     //books.push(newBook);
//     //updateAppoinments({pacientid, type, name, time})
//       console.log(name, pacientid, type, time);
//       res.json(
//         {name, pacientid, type, time }
//        // ${req.body.post}`
//         )
// })
app.listen(port, function () {
    // tslint:disable-next-line: no-console
    console.log("Example app listening at http://localhost:" + port);
});
