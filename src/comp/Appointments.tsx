import React from 'react';
import Appointment from './Appointment';
import './../App.css';

function Appointments(props: any ) {
 const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;

  return (
    <div className="appointment">

         <p> This is new appointment {JSON.stringify( value)}.</p> 
        
         <Appointment noOfAppointment = {value}/>
       
       
   
    </div>
  );
}

export default Appointments;
