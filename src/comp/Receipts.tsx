import React from 'react';
import './../App.css';

export function Receipts(props: any ) {
 const {value}: {value: number} = props;

  return (
    <div className="appointment">

         <p> This is new Receipts {JSON.stringify( value)}.</p> 
        
       
       
   
    </div>
  );
}

// export default Receipts;
