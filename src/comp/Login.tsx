import React, { useState } from 'react';
import './../App.css';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';
import data from '../somedata.json';
import useEffect from 'react';


function Login(props: any ) {
  const [ login, setlogin ]= useState("");
  const [ password, setpass ]= useState("")
  const [ showAccountPage, setshowAccountPage ] = useState(false)
  const [ error , setError] = useState("")
  function getvalidationdatafromserver(login:string, pass:string){
    // fn's which returns password for given login
    const goodlogin = "cos1";
    const goodpassword ="cos2";

    if(goodlogin===login && goodpassword === pass){
      return true;
    }else {
      return false;
    } 
  }


  function onChange(e:any, type: string){
    if(type==="log") {setlogin(login=>e.target.value);
    }
    else{setpass(password=>e.target.value)}

    
  }

  function onSubmit(e:any){
    e.preventDefault();

    if(login.length >0 && password.length >0){
      setError(error => "");
      setshowAccountPage(showAccountPage => getvalidationdatafromserver(login, password));
      props.changeuser(login)
      if(!showAccountPage){      setError(error => "Wrong login or password.");
      console.log(error)}
      else{
        setError(error => "good login & password.");
      console.log(error)
      }
    }
  }

  //useEffect(()=>{if(!showAccountPage){setError(error => "Wrong login or password.");}}, )

  return (
    <div>
      <h3>Log In part</h3>
   <form onSubmit={onSubmit} >
    <div>
      login: <input value={login} onChange={(e)=>{onChange(e,"log")}}/>
    </div>
    <div>
      Password:  <input value={password} onChange={(e)=>{onChange(e,"pass")}}/>
      </div>
   <div id="button"> <button type="submit" >Submit</button></div> 
   </form>
    {login + ', ' +password}
    {error}
    {JSON.stringify(showAccountPage)  }
    
    <Route exact path="/">
        {showAccountPage && (<Redirect  to="/account" /> )
        }
    </Route>
{JSON.stringify(props)}

    {/* <Route
      render={(props) => showAccountPage===true &&
      <Redirect to={{pathname: '/'} }/>}
    /> */}

    </div>
    
   
  );
}

export default Login;
