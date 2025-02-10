import React, { useState } from 'react';
import { Navigate } from 'react-router';
import {LogForm} from './LogForm';
import './../App.css';
import axios from 'axios';
import udata from '../usersdata.json';
import useEffect from 'react';

export function SignIn(props: any ) {
  const [ login2, setlogin ]= useState("");
  const [ isLoginUnique, setisLoginUnique]= useState(false); 
  const [ password, setpass ]= useState("")
  const [ isPasswordOk, setisPasswordOk]= useState(false); 
  const [ showAccountPage, setshowAccountPage ] = useState(false)
  const [ error , setError] = useState("")
  const [response, setResponse] =useState('')
  const [refresh, setRefresh] =useState(false)

  const { currentuser } = props.defaultuser;
  const newdefaultuser = [currentuser.pacientId, currentuser.pacientUsername, currentuser.isLogin, ""];
  
  async function validateinput(e:any, type: string, value: string){
    switch (type){
      case "log":
        //send to server new username to check if is unique
        setlogin(login=>e.target.value);
        await axios
          .post(`http://localhost:3001/isusernameunique`, {login2:value})
            .then((res:any) => {
              //save in react getted response about if username was used in database is unique(=true)
              if (login2 !== ""){
                if (JSON.parse(res.data)===false){
                  setError(error=>"Another user is using this name. Choose another username.");
                  setisLoginUnique(isLoginUnique=>JSON.parse(res.data))
                }
                else {
                  setError(error=>"")
                };
              };
              setisLoginUnique(isLoginUnique=>JSON.parse(res.data))
            })
            .catch((err: any) => {
              console.error(err);
            }); 
        break
      case "pass":
        // validate prenounciation of password
        // if(/@|#|$|%|\^|&|\*|(|)|!|~/ig.test(password)){
        //   setError(error=>"Your password shouldn't have sighs like: @,#.")
        //   setisPasswordOk(isPasswordOk=>false)
        // }else{
          
          setisPasswordOk(isPasswordOk=>true)
          setpass(password=>e.target.value)
        // }
        break;
     default:   
  };
}
  
async function onChange(e:any, type: string){
  e.preventDefault();
  if(type==="log") {
    console.log('validateinput', 'log')

    await validateinput(e, "log", e.target.value);
  }
  else{
    await validateinput(e,"pass", e.target.value);
  }
}
async function postNewUser( 
    urlPath: string, 
    dataToPost:any, 
    fnToSaveResponse: Function
    ) {
     // saving data from form to .json file
    let response: string = '';
    await axios
      .post(`${urlPath}`, dataToPost)
      .then((res:any): void =>{
        response = JSON.stringify(res.data)
        fnToSaveResponse(res.data)
        console.log('JSON.stringify(res.data)',JSON.stringify(res.data))
      })
      .catch((err: any) => {
        console.error(err);
        response = JSON.stringify(err)
      });
    return response;
  }

async function onSubmit(e:any){
  e.preventDefault();
  await validateinput(e, "log", login2);

// send new user login data to file/server
  const postUrl = "http://localhost:3001/newUser";
  const NewUserData = {login: login2, password};
  const goodError =  'New user added.';
  if(NewUserData.login !== "" &&  NewUserData.password !== "" && isLoginUnique && isPasswordOk){
    await postNewUser(postUrl, NewUserData, setResponse)
    console.log(response)
        setlogin("");
    setpass("");
    setisLoginUnique(false)
    setisPasswordOk(false)
    setRefresh(true);
  } else {
    setResponse('undefined')
  }
}

if(refresh){
  return <Navigate replace to="/" />;
}else{
  return (
    <div className='log-sign-in'>
    <LogForm 
    name="Singin as a new user"
    onSubmit = {onSubmit}
    login = {login2}
    password = {password}
    onChange = {onChange}
    error = {error}
    />
  </div>     
  );
}
}
