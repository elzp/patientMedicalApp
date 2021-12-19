import React from 'react';
import './../App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import data from './../somedata.json';


function Start(props: any ) {


  return (
    <div className="right-start">
      {localStorage.getItem('isLogin')==="true" ?
      (
      <>
      <h3>Welcome {localStorage.getItem('nameOfLogin')}.</h3>
      <div>To add new appointment <Link to="/new" ><span>click here</span></Link>.</div>
      <div>To change data about your account <Link to="/account" ><span>click here</span></Link>.</div>
      </>
      )
      :<div> Welcome UNKNOWN, <Router forceRefresh={true} ><Link to="/login"  >login</Link> or <Link to="/signin" >Sign In</Link></Router>.
      </div>
}
    </div>
    
  );
}

export default Start;
