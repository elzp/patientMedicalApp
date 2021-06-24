"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// tslint:disable-next-line: no-var-requires
var express = require('express');
var functions = require('./functions');
var fs = require('fs');
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
import { writeFile } from 'fs';
import { updateAppoinments } from '../src/functions';
npm i cors ; npm i @types/cors
bug with express_1[default](): https://stackoverflow.com/questions/
34520288/node-js-typescript-unclear-syntax-with-type-script-compiled-code - replace import with require();

*/
var app = express();
var port = 3001;
var path = "appointByUser.json";
var path2 = "./../src/usersdata.json";
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
app.post('/newVisit', function (req, res) {
    // res.send(
    //   `I received your POST request. This is what you sent me:`  
    //  // ${req.body.post}`
    //   )
    var _a = req.body, id = _a.id, type = _a.type, name = _a.name, time = _a.time;
    //functions.updateAppoinments(pacientid, type, name, time)
    console.log(req.body, 'posted on newvisit');
    if (typeof id !== undefined)
        functions.updateAppoinments(path, req.body.id, req.body.type, req.body.name, req.body.time); // function not saving data to file
    console.log('updated appointments througt post');
    var data0 = fs.readFileSync(__dirname + ("/" + path), 'utf8');
    //console.log(typeof data0)
    // let data = JSON.parse(data0);
    console.log('updated data', data0);
});
app.get('/:id', function (req, res) {
    //getting data from file json
    var data0 = fs.readFileSync(__dirname + ("/" + path), 'utf8');
    var data1 = JSON.parse(data0).filter(function (it) { return it.id == req.params.id; })[0];
    console.log(JSON.stringify(data1));
    //sending to react
    if (data1 === []) {
        res.status(200).json(
        //sending default data
        { "id": req.params.id, "visits": [] });
    }
    else { //sending real data
        res.status(200).json(JSON.stringify(data1));
    }
});
//get data from server for signin and send to react response with info if usersname exist
app.post('/isusernameunique', function (req, res) {
    //getting data from file json
    var data0 = fs.readFileSync(__dirname + ("/" + path2), 'utf8');
    var data1 = Object.entries(JSON.parse(data0))
        .map(function (it) { return __assign(__assign({}, it[1]), { id: it[0] }); })
        .filter(function (it) { return it.username === req.body.login2; });
    console.log(data1);
    //sending to react
    if (data1.length === 0) {
        res.status(200).json("true");
    }
    else {
        res.status(200).json("false");
    }
});
app.listen(port, function () {
    // tslint:disable-next-line: no-console
    console.log("Example app listening at http://localhost:" + port);
});
