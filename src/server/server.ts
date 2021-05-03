import  express  = require('express'); //install : "npm add -D @types/node @types/express "; to get access to ts types for express (in development phase).
import cors = require('cors'); //npm i cors ; npm i @types/cors
//bug with express_1[default](): https://stackoverflow.com/questions/34520288/node-js-typescript-unclear-syntax-with-type-script-compiled-code

const app = express()
const port = 3001
// add     '"buildts": "tsc --project ./",' to scripts in package.json and to compie ts files write in terminal  'npm run buildts'.
//to run server add ex. '"startserver": "node ./src/server/dist/server.js", ' in scripts section in package.json; then run in terminal: npm run startserver .
//!!!! to START SERVER: enter in terminal localization of js file of sever and use 'node server' or 'nodemon server'.


app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.post('/newVisit', function(req, res) {
    // const newDataOfVisit = {
    //     pacientid: req.body.id,
    //     type: req.body.type,
    //     name: req.body.name,
    //     time: req.body.time,
    // };

    const { type, name, time } = req.body;
  //id:pacientid, type: selectedOption[0],name: selectedOption2[0], time:startDate
  //books.push(newBook);
  //updateAppoinments({pacientid, type, name, time})
    console.log(name);
    res.send(JSON.stringify({name,type,time}))
  });

//   app.get('/newVisit', (req, res) => {
//     const {pacientid, type, name, time } = req.body;
//     //id:pacientid, type: selectedOption[0],name: selectedOption2[0], time:startDate
//     //books.push(newBook);
//     //updateAppoinments({pacientid, type, name, time})
//       console.log(name);
// })
app.get("/newAppointment",(req, res)=>{


    
} )


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
