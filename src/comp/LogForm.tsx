import React from 'react';
import './../App.css';
import udata from '../usersdata.json';

function LogForm(props: any ) {

  return (
    <div >
      <h3>{props.name}</h3>
      
    <form onSubmit={props.onSubmit} 
   className="right-log-form">
    <div>
      <label>{props.label}</label> <input value={props.login} onChange={(e)=>{props.onChange(e,"username")}}/>
    </div>
    {props.additionalJSX}
    <div>
     <label> Password: </label> <input value={props.password} onChange={(e)=>{props.onChange(e,"password")}}
      type="password"/>
      </div>
   <div id="button"> <button type="submit" >Submit</button></div> 
   </form>
    {
      Object.values(props.error).map((it:any, id: number)=>
        (<div key={id} className = "error">
          {it}
        </div>       
        ))
      
    }

    {JSON.stringify(udata)}
    </div> 
  );
}

export default LogForm;
