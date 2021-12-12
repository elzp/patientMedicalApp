import React from 'react';
import './../App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import data from './../somedata.json';


function Start(props: any ) {
 //const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;

  return (
    <div>
      {localStorage.getItem('isLogin')==="true" ?
      <h3>Welcome {props.userdata.currentuser.pacientUsername}, you're id:{props.userdata.currentuser.pacientId}.</h3>
      :<div> Welcome UNKNOWN, <Router forceRefresh={true} ><Link to="/login"  >login</Link> or <Link to="/signin" >Sign In</Link></Router>.
      </div>
}
    </div>
    
  );
}

export default Start;
