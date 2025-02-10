import React, { useState } from 'react';
import {LogForm} from './LogForm';
import './../App.css';
import {handleChangeOfUser} from './srcfunctions'
import { Navigate } from 'react-router';
import axios from 'axios';
import udata from '../usersdata.json';
import useEffect from 'react';
import {typeuserdata} from './../../types/common/main.d'


export  function Login(props: any ) {
  const [ login, setlogin ]= useState("");
  const [ password, setpass ]= useState("")
  const [ showAccountPage, setshowAccountPage ] = useState(false)
  const [ error , setError] = useState("")
  const changeuser:React.Dispatch<React.SetStateAction<typeuserdata>> = props.changeuser
  const { currentuser } = props.defaultuser;
  const newdefaultuser = [currentuser.pacientId, currentuser.pacientUsername, currentuser.isLogin, ""];

  async function validateLogin(login:string, password: string){

        await axios
          .post(`http://localhost:3001/user-validation`, {login, password})
            .then((res:any) => {
              const { isValid, userId } = JSON.parse(res.data);
              if(JSON.parse(isValid)) {
                // const userId = res.data.userId;
                const newuser = {
                  currentuser: {
                    pacientId: userId,
                    pacientUsername: login,
                    isLogin: 'true'
                  }
                }
                setError(error => "good login & password.");
                // await console.log("error",error)
                handleChangeOfUser(login, userId, true, props.changeuser)
                changeuser(newuser)
              } else {
                setError(error => "Check if login or password is correct.");
              }
            })
            .catch((err: any) => {
              console.error(err);
            }); 
}

function onChange(e:any, type: string){
    if(type==="log") {setlogin(login=>e.target.value);
    }
    else{setpass(password=>e.target.value)}
  }

  async function onSubmit(e:any){
    e.preventDefault();

    if(login.length >0 && password.length >0){
      setError(error => "");
       
      await validateLogin(login, password)
    }
  }
 

  if (localStorage.getItem('isLogin')==="true") {
    return <Navigate replace to="/" />;
  } else {
  return (
    <div className='log-sign-in'>
      <LogForm 
    name="Login as user"
    onSubmit = {onSubmit}
    login = {login}
    password = {password}
    onChange = {onChange}
    error = {error}
    />
    </div>
    

  );
  }
}
