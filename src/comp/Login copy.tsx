import React, { useState } from 'react';
import './../App.css';
import { BrowserRouter as Router, Link, 
  // Redirect, 
  Route } from 'react-router';
import axios from 'axios';
import udata from '../usersdata.json';
import useEffect from 'react';


function Login(props: any ) {
  const [ login, setlogin ]= useState("");
  const [ password, setpass ]= useState("")
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
      
    
    // if(goodlogin===login && goodpassword === pass){
    //   return true;
    // }else {
    //   return false;
    // } 
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
      //setshowAccountPage(showAccountPage => getvalidationdatafromserver(login, password));
      const validation = validateWithDataFromServer(login, password);
      await console.log(validation)

      if (validation===newdefaultuser) {
        setError(error=>"Wrong login or password.");
        await console.log("error",error);
        return
      }
      else{
        await setError(error => "good login & password.");
        await console.log("error",error)
        props.changeuser(validation[1], validation[0], validation[3])
        
      }
    }
  }


  return (
    <div>
      <h3>Login Page</h3>
      {JSON.stringify(udata)}
   <form onSubmit={onSubmit} >
    <div>
      <label>login:</label> <input value={login} onChange={(e)=>{onChange(e,"log")}}/>
    </div>
    <div>
     <label> Password: </label> <input value={password} onChange={(e)=>{onChange(e,"pass")}}
      type="password"/>
      </div>
   <div id="button"> <button type="submit" >Submit</button></div> 
   </form>
    {/*login + ', ' +password*/}
    {error}
    {/*JSON.stringify(showAccountPage)  */}
    


    {/* <Route
      render={(props) =>   localStorage.getItem('isLogin')==="true" &&
      <Redirect to={{pathname: '/'} }/>}
    /> */}
    
        {/* {JSON.stringify( sth3.find((it:any)=>it[1]===login)
    )} */}

    </div> 
    
   
  );
}

export default Login;
