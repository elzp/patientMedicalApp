import {} from './server1'
// npm install bcrypt
// npm install --save @types/bcrypt
const bcrypt = require('bcrypt')
const functions = require('./functions');
const fs = require('fs');
const path= "../../src/usersdata.json"

// async function hashPasswordd(password, password2) { // updated
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)
// ​
//     const isSame = await bcrypt.compare(password2, hash) // updated
//     console.log(isSame) // updated
    
// }
// ​
// hashPasswordd('1234', '12345') // output: false
// hashPasswordd('1234', '1234') // output: true
​
const saltRounds = 10;
const plainTextPassword1 = "DFGh5546*%^__90";
const plainTextPassword2 = "alamakota"

  const saved = "$2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT/HRM/a";

  //hashPassword(plainTextPassword1)

async function hashPassword(password:string){ 
  const u = bcrypt
  .hash(password, saltRounds)
  .then(hash => {
    console.log(`Hash: ${hash}`);
    return "sth"// Store hash in your password DB.
  })
  .catch(err => console.error(err.message));
  return u;
}


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


let data0 =JSON.parse(fs.readFileSync(__dirname+`${path}`,'utf8'))|| {};
console.log(data0)
const data1 = Object.entries(data0).map(it=>{
   it
})
console.log(data1)

//const c0 = data1.map(it=>it[1].username;//==="u1")
//console.log(c0)

validatepassword(plainTextPassword1,saved, "should be true")//works
validatepassword(plainTextPassword2,saved, "should be true")//works


