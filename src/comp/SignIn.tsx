import React, { useState } from 'react';
import LogForm from './LogForm';
import './../App.css';
import axios from 'axios';
import udata from '../usersdata.json';

function SignIn(props: any ) {
  const [ login2, setlogin ]= useState("");
  const [ isLoginUnique, setisLoginUnique]= useState(false); 
  const [ password, setpass ]= useState("")
  const [ isPasswordOk, setisPasswordOk]= useState(false);
  const [ email, setEmail]= useState("");
  const [ isEmailUnique, setisEmailUnique]= useState(false);
  const [ showAccountPage, setshowAccountPage ] = useState(false)
  const [ error , setError] = useState({"login": "","email":""})
  // defaultuser={currentuser: {
                  //     pacientId: "-5",
                  //     pacientUsername: "",
                  //     isLogin: false
                  //   }
                  // }
  // const { currentuser } = props.defaultuser;
  // const newdefaultuser = [currentuser.pacientId, currentuser.pacientUsername, currentuser.isLogin, ""];
  // preparing users data from json file to use for authorification
    const sth3:any = Object.entries(udata).map(it=>{

      const neww:any = [it[0], //pacientId
                      Object.entries(it[1])[0][1],//pacientUsername
                      Object.entries(it[1])[2][1],//isLogin
                      Object.entries(it[1])[1][1]//password
                    ]
    return neww
    })
  function changeofError(
    errorStatus: boolean, 
    indexOfMessage: number,
    errorType: string,
    ){
    const textOfMessages = [
      "Another user is using this name. Choose another username.",
      "This e-mail adress was used before. ",      
    ]
  
    if (errorStatus===true){
      const newBadError = {...error, [errorType]: textOfMessages[indexOfMessage]};
      setError(error => newBadError)
      }else{
        const newGoodError = {...error, [errorType]: "" };
      setError(error => newGoodError)
      }
    }
  function handleChangeofError (errorStatus: boolean, errorType: string) {
    
    switch (errorType){
      case "username":
        changeofError(errorStatus, 0, errorType);
        break;
      case "email":
        changeofError(errorStatus, 1, errorType);
        break;
    }
  }
  
  async function validateUniqueness (
    valueFromInputToValidate: string,
    previousValue: string,
    APIstring: string,
    // previousIsValueUnique: boolean,
    typeOfValue: string,
    isUniqueSetter: Function,
    ) {
    if(valueFromInputToValidate !== "" && valueFromInputToValidate !== previousValue) {//if something in login input has changed then...
      //send to server new username to check if is unique
      await axios
        .post(`http://localhost:3001/${APIstring}`, {[typeOfValue]: valueFromInputToValidate})
          .then((res:any) => {
            //save in react getted response about if username was used in database is unique(=true)
            isUniqueSetter(()=>JSON.parse(res.data))
            handleChangeofError(JSON.parse(res.data), typeOfValue);
          })
          .catch((err: any) => {
            console.error(err);
          }); 
      }
  }
  async function validateinput(e:any, type: string, setterOfIfIsUnique: Function = ()=>{}){
    e.preventDefault()
    switch (type){
      case "username":
        validateUniqueness(e.target.value, login2, `is${type}unique`, `${type}`, setterOfIfIsUnique)

        // if(e.target.value !== "" && e.target.value !== login2) {//if something in login input has changed then...
        // //send to server new username to check if is unique
        // await axios
        //   .post(`http://localhost:3001/isusernameunique`, {login2:e.target.value})
        //     .then((res:any) => {
        //       //save in react getted response about if username was used in database is unique(=true)
        //       setisLoginUnique(isLoginUnique=>JSON.parse(res.data))
        //       handleChangeofError(JSON.parse(res.data));
        //     })
        //     .catch((err: any) => {
        //       console.error(err);
        //     }); 
        // }
        break
      case "email":
        validateUniqueness(e.target.value, email, `is${type}unique`, `${type}`, setterOfIfIsUnique);
        break
      case "password":
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
  switch(type){
  case "username":
    // console.log('targetvaue: ',e.target.value, " ." )
    validateinput(e, type, setisLoginUnique);
    setlogin(login=>e.target.value);
    break;
  case "password":
    setpass(password=>e.target.value)
    validateinput(e, type);
    break;
  case "email":
    setEmail(email=>e.target.value)
    validateinput(e, type, setisEmailUnique)
    break;
  }
}

  async function onSubmit(e:any){
    e.preventDefault();
  //   const array= [isLoginUnique, isEmailUnique, isPasswordOk];
  //   if (array === [true, true, true]) {

  //   }
  // // send new user login data to file/server
    
  }


  return (
    <>
      <LogForm 
      name="Singin as a new user"
      onSubmit = {onSubmit}
      login = {login2}
      password = {password}
      onChange = {onChange}
      error = {error}
      label = {"your username"}
      additionalJSX = {(
      <div>
        <label> e-mail: </label> <input value={email} onChange={(e)=>{onChange(e,"email")}}
         type="text"/>
      </div>
         )}
      />
    {JSON.stringify(udata)}
    {`${login2}; password ${password}`}
  
    {JSON.stringify([isLoginUnique, isPasswordOk])}
    {JSON.stringify(/@|#|$|%|\^|&|\*|(|)|!|~/.test("%65"))
    ///[@#$%^&*()!~]
    }


    {/* <Route
      render={(props) =>   localStorage.getItem('isLogin')==="true" &&
      <Redirect to={{pathname: '/'} }/>}
    /> */}
    
        {/* {JSON.stringify( sth3.find((it:any)=>it[1]===login)
    )} */}

    </> 
    
   
  );
}

export default SignIn;
