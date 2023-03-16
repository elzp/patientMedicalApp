import {} from '../server1'
import { writeFile } from 'fs';
// npm install bcrypt
// npm install --save @types/bcrypt
const bcrypt = require('bcrypt')
const functions = require('./functions');
const fs = require('fs');
const path= "../../src/usersdata.json"

​
const saltRounds = 10;
// const plainTextPassword1 = "DFGh5546*%^__90";
// const plainTextPassword2 = "alamakota"

//   const saved = "$2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT/HRM/a";


async function hashAndSavePassword(data):Promise<void>{ 
  const u = await bcrypt
  .hash(data.password, saltRounds)//hashed password
  .then(hash => {
    console.log(`Hash: ${hash}`);
    return hash;})
  .then( (hash)=>{
  
    let data00 = fs.readFile(`${__dirname}${path}`,'utf8',(err, dataa)=> {
      if (err) {
        console.error('read err', err)
        return}
        console.log('was read')
        //modify text
        //console.log(typeof dataa, typeof JSON.parse(dataa))
        let data0 = JSON.parse(dataa)|| {}
        
        let data1 = Object.entries(data0).map(it=>it[1])
        //console.log(data1, data.username)
        let data2 = data1.filter(it =>data.username === it["username"])
        // console.log('d2',data2)
         const indexOfuser = data1.indexOf(data2[0])
         //console.log(indexOfuser)
         let data3=data0;
        if(data1 !==[]){
         // console.log(data3,data2)
          data3[indexOfuser].password = hash//save new hased password
          // console.log(data3[indexOfuser].password)
           // write all data to file
            //console.log("d3",data3)
            
          fs.writeFile(__dirname+`${path}`,JSON.stringify(data3), err => {
            if (err) {
              console.error('write err', err)
              return}
            })
        }
    
      }
    )
    
  })
  .catch(err => console.error(err.message));
}
let newuserData0 = {
  "username": "q1",
  "password": "q2",
  "islogin": "false"
}
let newuserData1 = {
  "username": "u2",
  "password": "2",
  "islogin": "false"
}
//console.log(' password before ',newuserData0.password )
//hashPassword(newuserData0)
console.log(' password before ',newuserData1.password )
const uu=hashAndSavePassword(newuserData1)
// const u = hashPassword(newuserData0)
 console.log(' password after', uu ,newuserData1.password )





 function validatepassword(passFromLoging:string, passFromServer:string, text:string){
     const u= bcrypt
    .compare(passFromLoging, passFromServer)
    .then(res => {
      console.log("1", res);
      return console.log(text,res);
    })
    .catch(err => console.error(err.message));
return u;
}

//read user data from file
let data0 =JSON.parse(fs.readFileSync(__dirname+`${path}`,'utf8'))|| {};
//console.log("data0", data0)
// new user data:
let newuserData = {
    "username": "q1",
    "password": "q2",
    "islogin": "false"
}

// async function hashing(data){
//   const dataPassword =  await hashPassword(data.password).then(data1=>{return data1})
//   return dataPassword
// }
//console.log("newsuserdata:", newuserData.password  )
//https://auth0.com/blog/hashing-in-action-understanding-bcrypt/

// save hased password in newuserData:
////const newHash =  hashing(newuserData)
//console.log(newHash,"after hashinng" )
//console.log("return of hashing", newuserData["password"], newuserData.password)
//SAVE new user from signup


//   fs.writeFile(path, JSON.stringify(newuserData), function(err: any) {
//     if(err) {
//         return console.log("jakiś error");
//     }
//     console.log("changes are saved");
// });
// "0":{
//     "username": "u1",
//     "password": "$2b$10$m0z/r2ucfg5qcAkjNVqC8.Bn4Rf9NlNZiOgO5lXd35kDi4YHOMyne",
//     "islogin": "false"
// }
//  to be continued
//  

//  preparing data to search for user
// testing data:
const addedByuser1="wrong"
const addedByuser2="p1"
const userLogin = 'u1'
const datadefault = [
    [ 'id', '-5' ],
    [ 'username', '' ],
    [ 'password', '' ],
    [ 'islogin', 'false' ]
  ]

// const data1 = Object.entries(data0).map(it=>{ it })
// console.log("data1", data1)
const data2 = Object.entries(data0).map(it=>{
    const cos= Object.entries(it[1]).map(it2=>[it2[0],it2[1]])
   return [["id",it[0]],...cos]
 })

 //console.log("data2" ,data2)
 const c0 = data2.find(it=>it[1][1]===userLogin) || datadefault;
 // console.log("this data coresponds to login is in DB",c0) 

// //check if finding works - OK
//  const c1 = data2.find(it=>it[1][1]==="u") || datadefault;
//  console.log("login is in DB",c1) 

////validatepassword(addedByuser1,c0[2][1], "should be false")//works



// validatepassword(addedByuser2,c0[2][1], "should be true")//works

// validatepassword(plainTextPassword1,saved, "should be true")//works
// validatepassword(plainTextPassword2,saved, "should be true")//works


