import React from 'react';
import Refferal from './Refferal';
import './../App.css';

function Appointment(props: any ) {
 const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;

  return (
    <div className="appointment">

         <p> This is new appointment {JSON.stringify( value)}.</p> 
        
         <Refferal noOfAppointment = {value}/>
       
       
   
    </div>
  );
}

export default Appointment;
