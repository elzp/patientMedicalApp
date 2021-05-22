import React from 'react';
// import Appointment from './Appointment';
import './../App.css';

function Account(props: any ) {
 const {value}: {value: number} = props;
 const { pacientId } = props;
 //const {appointment} : {appointment: object} = props.styles;

  return (
    <div className="appointment">

         <p> This is new Account {JSON.stringify( value)}.</p> 
        
         {/* <Appointment noOfAppointment = {value}/> */}
       
       
   
    </div>
  );
}

export default Account;
