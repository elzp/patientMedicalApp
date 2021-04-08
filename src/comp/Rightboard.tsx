import React from 'react';
import Appointment from './Appointment';
import './../App.css';

function Rightboard(styles: Styletype) {
   const stylediv:object = styles.rightdiv;
   const numberOfApp: Array<number> = [1,2,3,4,5,6];
  return (
    <div className='rightdiv'>
      
      This is box on the right.

      <div>Appointments
        {numberOfApp.map((item, id)=>
          (<Appointment key = {item} value={item} /> )
        
        )
       }
       


      </div>
       
    </div>
  );
}

export default Rightboard;
