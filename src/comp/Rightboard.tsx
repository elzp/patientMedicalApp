import React, {useState, useEffect} from 'react';
import Appointment from './Appointment';
import './../App.css';
import data from './../somedata.json';

function Rightboard(props: any) {
   
  const [type, setType] =useState("start");

  function changeType(){
    setType(props.type);
  }
   const numberOfApp: Array<number> = [1,2,3,4,5,6];

   useEffect(()=>{
     setType(props.type);
  },[type] )

  
  return (
    <div className='rightdiv'>
      
      {JSON.stringify(props.type)}
      {
      }

      <div>
        {numberOfApp.map((item, id)=>
          (<Appointment key = {item} value={item} /> )
        
        )
       }
       


      </div>
       
    </div>
  );
}

export default Rightboard;
