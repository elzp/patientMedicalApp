import React from 'react';
import './../App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import udata from '../usersdata.json';

function LogForm(props: any ) {

  return (
    <div >
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

    <Route
      render={(props) =>   localStorage.getItem('isLogin')==="true" &&
      <Redirect to={{pathname: '/'} }/>}
    />
    {JSON.stringify(udata)}
    </div> 
  );
}

export default LogForm;
