import React from 'react';
import './../App.css';

function Start(props: any ) {
 const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;

  return (
    <div className="appointment">

         <p> This is new Start {JSON.stringify( value)}.</p> 

    </div>
  );
}

export default Start;
