import React from 'react';
import './../App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import data from './../somedata.json';


function Start(props: any ) {
 //const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;

  return (
    <div>
      <h3>Welcome {props.userdata.currentuser.pacientUsername}, you're id:{props.userdata.currentuser.pacientId}.</h3>
      {
      // <Router forceRefresh={true} > {/* forces refresh of page and loading nee type of content in rightboard */} 
      //   <Link to={`/${data.menu[1][1]}`} //className= "menu-a"
      //    >Sign a new appointment</Link>
      // </Router>
      }

    </div>
    
  );
}

export default Start;
