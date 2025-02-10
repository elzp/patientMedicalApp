import React from 'react';
import './../App.css';
import { BrowserRouter as Router, Link } from 'react-router';
import data from './../somedata.json';


export function Start(props: any ) {


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
      :<div> Welcome <span>unknown</span>, <span><Link to="/login" reloadDocument >login</Link></span> or <span><Link to="/signin" reloadDocument>sign in</Link></span>.
      </div>
}
    </div>
    
  );
}

// export default Start;
