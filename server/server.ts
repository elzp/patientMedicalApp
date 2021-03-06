// declare function require(name:string):any;
import { idText } from 'typescript';
import {} from './server1'
// tslint:disable-next-line: no-var-requires
const express = require('express');
const functions = require('./functions');
const fs = require('fs');
//  import express from 'express';
/*install :
npm install --save-dev @types/node
and 'npm install --save-dev @types/express;
npm add -D @types/node @types/express '; to get access to ts types for
 express (in development phase).*/
// tslint:disable-next-line: no-var-requires
const cors = require('cors');

/* import cors from 'cors';
import * as fs from 'fs';
import { writeFile } from 'fs';
import { updateAppoinments } from '../src/functions';
npm i cors ; npm i @types/cors
bug with express_1[default](): https://stackoverflow.com/questions/
34520288/node-js-typescript-unclear-syntax-with-type-script-compiled-code - replace import with require();

*/
const app = express()
const port = 3001
const path = "appointByUser.json";
const path2 = "./../../src/usersdata.json";
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
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

app.get('/', (req:any, res:any) => {
   //// res.send('Hello World!')
  })

    app.post(   '/newVisit', (req, res) => {
      
      // res.send(
      //   `I received your POST request. This is what you sent me:`  
      //  // ${req.body.post}`
      //   )
        const {id, type, name, time } = req.body;
        //functions.updateAppoinments(pacientid, type, name, time)

          console.log(req.body, 'posted on newvisit');
          if (typeof id !==undefined) functions.updateAppoinments(path, req.body.id, req.body.type, req.body.name, req.body.time) // function not saving data to file
          console.log('updated appointments througt post');
          let data0 =fs.readFileSync(__dirname +`/${path}`,'utf8');
          //console.log(typeof data0)
         // let data = JSON.parse(data0);
          console.log('updated data',data0)
  });

  app.get('/:id', (req, res) => {
     //getting data from file json
      let data0 =fs.readFileSync(__dirname +`/${path}`,'utf8');
      const data1 = JSON.parse(data0).filter(it=> it.id == req.params.id)[0];
      console.log(JSON.stringify(data1))
      //sending to react
      if (data1===[]) {res.status(200).json(
        //sending default data
         { "id": req.params.id, "visits": []})}
      else {//sending real data
        res.status(200).json(JSON.stringify(data1))}
 })

//get data from server for signin and send to react response with info if usersname exist
 app.post('/isusernameunique', (req, res) => {
  //getting data from file json
   let data0 =fs.readFileSync(__dirname +`/${path2}`,'utf8');

   const data1 = Object.entries(JSON.parse(data0))
          .map((it:[string,any])=>{return {...it[1],id: it[0]}})
          .filter(it=> it.username === req.body.username);
  //sending info to app  
if(data1.length>0){
  res.status(200).json("true")
  console.log("Name:",req.body.username, " is used by another user.")
}
else{
  console.log("Name:",req.body.username, " of new user's login was not found in database.")
  res.status(200).json("false") 
}
})

app.post('/isemailunique', (req, res) => {
  //getting data from file json
   let data0 =fs.readFileSync(__dirname +`/${path2}`,'utf8');
   const data1 = Object.entries(JSON.parse(data0))
          .map((it:[string,any])=>{return {...it[1],id: it[0]}})
          .filter(it=> it["e-mail"] === req.body.email);
  console.log(data1)
  //sending info to app  
if(data1.length>0){
  res.status(200).json("true")
  console.log("Email ",req.body.email, " is used in database.")
}
else{
  console.log("You can use email ",req.body.email,".")
  res.status(200).json("false") 
}
})
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Example app listening at http://localhost:${port}`)
  })



