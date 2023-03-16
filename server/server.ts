// tslint:disable-next-line: no-var-requires
import express  from 'express';
import updateAppoinments from './functions.js';
import fs from 'fs';
import cors from 'cors';

const app = express()
const port = 3001
const path = "appointByUser.json";
const path2 = "./../src/usersdata.json";

app.use(
    cors({
      origin: 'http://localhost:1234',
      credentials: true,
    })
  );
 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

app.get('/', (req:any, res:any) => {})

app.post(   '/newVisit', (req:any, res: any) => {

        const {id, type, name, time } = req.body;

          console.log(req.body, 'posted on newvisit');
          if (typeof id !==undefined) updateAppoinments(path, req.body.id, req.body.type, req.body.name, req.body.time) // function not saving data to file
          console.log('updated appointments througt post');
          let data0 =fs.readFileSync(__dirname +`/${path}`,'utf8');
         
          console.log('updated data',data0)
  });

  app.get('/:id', (req: any, res: any) => {
     //getting data from file json
      let data0 =fs.readFileSync(__dirname +`/${path}`,'utf8');
      const data1 = JSON.parse(data0).filter((it: any)=> it.id == req.params.id)[0];
      console.log(JSON.stringify(data1))
      //sending to react
      if (data1.length===0) {res.status(200).json(
        //sending default data
         { "id": req.params.id, "visits": []})}
      else {//sending real data
        res.status(200).json(JSON.stringify(data1))}
 }) 

//get data from server for signin and send to react response with info if usersname exist
 app.post('/isusernameunique', (req:any, res: any) => {
  //getting data from file json
   let data0 =fs.readFileSync(__dirname +`/${path2}`,'utf8');
   const data1 = Object.entries(JSON.parse(data0))
          .map((it:[string,any])=>{return {...it[1],id: it[0]}})
          .filter(it=> it.username === req.body.login2);
          console.log(data1)
 //sending to react
if(data1.length===0){
  res.status(200).json("true")
}
else{
  res.status(200).json("false") 
}
})


app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Example app listening at http://localhost:${port}`)
  })



