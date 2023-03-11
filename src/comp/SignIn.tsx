import React, { useState } from 'react';
import {LogForm} from './LogForm';
import './../App.css';
import axios from 'axios';
import udata from '../usersdata.json';

export function SignIn(props: any ) {
  const [ login2, setlogin ]= useState("");
  const [ isLoginUnique, setisLoginUnique]= useState(false); 
  const [ password, setpass ]= useState("")
  const [ isPasswordOk, setisPasswordOk]= useState(false); 
  const [ showAccountPage, setshowAccountPage ] = useState(false)
  const [ error , setError] = useState("")
  // defaultuser={currentuser: {
                  //     pacientId: "-5",
                  //     pacientUsername: "",
                  //     isLogin: false
                  //   }
                  // }
  const { currentuser } = props.defaultuser;
  const newdefaultuser = [currentuser.pacientId, currentuser.pacientUsername, currentuser.isLogin, ""];
  // preparing users data from json file to use for authorification
    const sth3:any = Object.entries(udata).map(it=>{

      const neww:any = [it[0], //pacientId
                      Object.entries(it[1])[0][1],//pacientUsername
                      Object.entries(it[1])[2][1],//isLogin
                      Object.entries(it[1])[1][1]//password
                    ]
    return neww
    })

  function validateWithDataFromServer(log:string, pass:string){
    // fn's which returns password for given login

    const sth4 = sth3.find((it:any)=>it[1]===log)
      if(sth4 === undefined || sth4 === null){
    return newdefaultuser;}
      else{ 
        if(sth4[3]===pass){return sth4;}
        else{
          setError(error=>"bad password")
          console.log(error)
          return newdefaultuser;
        }
      }
      
  }

  
  async function validateinput(e:any, type: string){//(e:any, type: string){
    e.preventDefault()
    switch (type){
      case "log":
        //send to server new username to check if is unique
        await axios
          .post(`http://localhost:3001/isusernameunique`, {login2:login2})
            .then((res:any) => {
              console.log(res.data,  'was send')
              //save in react getted response about if username was used in database is unique(=true)
              setisLoginUnique(isLoginUnique=>JSON.parse(res.data))//ERROR!!!problems with validating login and password in singin page
            })
            .catch((err: any) => {
              console.error(err);
            }); 
        if (isLoginUnique===false){setError(error=>"Another user is using this name. Choose another username.")};
        break
      case "pass":
        // validate prenounciation of password
        // if(/@|#|$|%|\^|&|\*|(|)|!|~/ig.test(password)){
        //   setError(error=>"Your password shouldn't have sighs like: @,#.")
        //   setisPasswordOk(isPasswordOk=>false)
        // }else{
          
          setisPasswordOk(isPasswordOk=>true)
        // }
        break;
     default:   
  };
}
  
function onChange(e:any, type: string){
  if(type==="log") {
    setlogin(login=>e.target.value);
    validateinput(e, "log");
  }
  else{
    setpass(password=>e.target.value)
    validateinput(e,"pass");
  }
}

  async function onSubmit(e:any){
    e.preventDefault();

  
  // send new user login data to file/server
    
  }

console.log(udata)
  return (
    <div className='log-sign-in'>
      {/* <h3>SignIn page</h3> */}
      
      
   {/*<form //onSubmit={onSubmit} 
    className="right-log-form"
   >
    <div>
      <label>login:</label> <input onChange={(e)=>{
        setlogin(login2=>e.target.value)
        validateinput(e, "log");
        }} />
    </div> 


    <div>
      <label>Password: </label> <input onChange={(e)=>{
        setpass(password=>e.target.value)
        validateinput(e,"pass");
      }} 
      type="password"
      />
    </div> 
    
    <div id="button"> <button  
   >Submit</button></div> 
   </form> */}
    
    {error}
    <LogForm 
    name="Singin as a new user"
    onSubmit = {onSubmit}
    login = {login2}
    password = {password}
    onChange = {onChange}
    error = {error}
    />
    {/* {JSON.stringify(udata)} */}
    {/* {`${login2}; password ${password}`} */}
  
    {/* {JSON.stringify([isLoginUnique, isPasswordOk])} */}
    {/* {JSON.stringify(/@|#|$|%|\^|&|\*|(|)|!|~/.test("%65"))
    ///[@#$%^&*()!~]
    } */}


    {/* <Route
      render={(props) =>   localStorage.getItem('isLogin')==="true" &&
      <Redirect to={{pathname: '/'} }/>}
    /> */}
    
        {/* {JSON.stringify( sth3.find((it:any)=>it[1]===login)
    )} */}

</div> 
    
   
  );
}

// export default SignIn;
