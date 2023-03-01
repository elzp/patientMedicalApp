import React from 'react';
import Refferal from './Refferal';
import { DSTshiftedHour } from './srcfunctions';
import './../App.css';

function Appointment(props: any) {
 //const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;

 const data =  props.dataAboutAppointment || {
  "vizId": 1,
  "type": "Gynecologist",
  "name": "dr green Gynecologist",
  "time": "2021-05-30T09:30:00.000Z"
}
 const {vizId, type, name, time} = data;
  const date = new Date(time)


  return (
    <div className="appointment">
 
        {/* {JSON.stringify( DSTshiftedHour(date))} */}
        <p>{vizId+1}. appointment with <span>{type}</span>:</p>
        <p> dr <span>{name}</span>.</p> 
        <p>Date:  {time.substr(0,10)}. Time:  {DSTshiftedHour(date) + time.substr(13,3)}.</p>
        {/* <p>Time:  {time.substr(11,5)}.</p>        */}
        {/* <Refferal noOfAppointment = {value}/> */}
       
       
   
    </div>
  );
}

export default Appointment;
