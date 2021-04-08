import React from 'react';
import './../App.css';
function Refferal(props: any) {

const {noOfAppointment:nr}: {noOfAppointment:number} = props;

  return (
    <div >

         <p> Refferal from appointment number {nr}.</p> 
 
       
       
   
    </div>
  );
}

export default Refferal;
