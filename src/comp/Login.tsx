import React, { useState } from 'react';
import LogForm from './LogForm';
import './../App.css';
import {handleChangeOfUser} from './srcfunctions'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import udata from '../usersdata.json';
import useEffect from 'react';


function Login(props: any ) {
  const [ login, setlogin ]= useState("");
  const [ password, setpass ]= useState("")
  const [ showAccountPage, setshowAccountPage ] = useState(false)
  const [ error, setError ] = useState({"username": "", "password": ""})
  const changeuser:React.Dispatch<React.SetStateAction<typeuserdata>> = props.changeuser
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
          const newErrors = {...error, "password":"bad password"};
          setError(error=>newErrors)
          console.log(error)
          return newdefaultuser;
        }
      }
      
    
    // if(goodlogin===login && goodpassword === pass){
    //   return true;
    // }else {
    //   return false;
    // } 
  }


  function onChange(e:any, type: string){
    if(type==="username") {setlogin(login=>e.target.value);
    }
    else{setpass(password=>e.target.value)}

    
  }

  async function onSubmit(e:any){
    e.preventDefault();
    let newErrors = error;
    if(login.length >0 && password.length >0){
      newErrors = {"username": "", "password": ""};
      setError(error => newErrors);
       
      const validation = validateWithDataFromServer(login, password);
      await console.log(validation)

      if (validation===newdefaultuser) {
        newErrors = {...error, "username": "Wrong login or password."};
        setError(error=>newErrors);
        await console.log("error",error);
        return
      }
      else{
        const newuser = {currentuser: {pacientId: validation[1],
          pacientUsername: validation[0],
          isLogin: validation[3]}}
        newErrors = {...error, "username": "good login & password."};
        await setError(error => newErrors);
        await console.log("error",error)
        handleChangeOfUser(validation[1], validation[0], validation[3], props.changeuser, props.userdata )
        changeuser(newuser)
      }
    }
  }

  console.log(udata)
  return (
    <>
      {/* <h3>Login Page</h3>
      
    <form onSubmit={onSubmit} 
   className="right-log-form">
    <div>
      <label>login:</label> <input value={login} onChange={(e)=>{onChange(e,"log")}}/>
    </div>
    <div>
     <label> Password: </label> <input value={password} onChange={(e)=>{onChange(e,"pass")}}
      type="password"/>
      </div>
   <div id="button"> <button type="submit" >Submit</button></div> 
   </form>
    {error} */}

    <Route
      render={(props) =>   localStorage.getItem('isLogin')==="true" &&
      <Redirect to={{pathname: '/'} }/>}
    />
    <LogForm 
    name="Login as user"
    onSubmit = {onSubmit}
    login = {login}
    password = {password}
    onChange = {onChange}
    error = {error}
    label = {"username"}
    />
    </> 
  );
}

export default Login;
