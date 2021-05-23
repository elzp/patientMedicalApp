import React from 'react';
import './../App.css';

function Receipts(props: any ) {
 const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;

  return (
    <div className="appointment">

         <p> This is new Receipts {JSON.stringify( value)}.</p> 
        
       
       
   
    </div>
  );
}

export default Receipts;
