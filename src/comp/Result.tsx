import React from 'react';
import './../App.css';

export function Result(props: any ) {
 const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;

  return (
    <div className="appointment">

         <p> This is new Result {JSON.stringify( value)}.</p> 
           
       
   
    </div>
  );
}

// export default Result;
