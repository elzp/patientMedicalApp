import React from 'react';
import './../App.css';
import { BrowserRouter as Router, redirect, Route } from 'react-router-dom';
import udata from '../usersdata.json';

export function LogForm(props: any ) {
  if (localStorage.getItem('isLogin')==="true") {
    redirect("/start");
    return (<></>)
  } else {
  return (
    <div>
      <h3>{props.name}</h3>
      
    <form onSubmit={props.onSubmit} 
   className="right-log-form">
    <div>
      <label>login:</label> <input value={props.login} onChange={(e)=>{props.onChange(e,"log")}}/>
    </div>
    <div>
     <label> Password: </label> <input value={props.password} onChange={(e)=>{props.onChange(e,"pass")}}
      type="password"/>
      </div>
   <div id="button"> <button type="submit" >Submit</button></div> 
   </form>
    {props.error}

    </div> 
  );
  }
}

// export default LogForm;
