import React, { useState, useMemo } from 'react';
import {logout} from './srcfunctions';
import './../App.css';
import axios from 'axios';

export function Account(props: any ) {
 const {value}: {value: number} = props;
 const { currentuser } = props.userdata;
 const { pacientId } = currentuser;

 //const {appointment} : {appointment: object} = props.styles;
 // server API code
 const visitApiAdress ="http://localhost:3001";

 //set default value of variable pacientVisitsData
 const [pacientVisitsData, setpacientVisitsData] =useState({ "id": pacientId, "visits": []});
 
 // set current data in pacientVisitsData from json file send from server
 function getdataFromFile(){
   axios
   .get(`${visitApiAdress}/${pacientId}`)
   .then((res:any) => {
   //log in browser
   console.log('data was received', JSON.parse(res.data))
   const data = JSON.parse(res.data);
   setpacientVisitsData(pacientVisitsData => data)
   }
 )
 .catch((err: any) => {
   console.error(err);
 });
 }
 const [ifRefresh, setStatusIfRefresh] = useState(false)
 useMemo(()=> {getdataFromFile(); }, [ifRefresh])
 
 function handleRefreshingVisits(){
   setStatusIfRefresh(!ifRefresh);
 }
  return (
    <div className="account">
      <h3>Welcome {localStorage.getItem('nameOfLogin')}.</h3>
      <div>
        <button onClick={()=>{logout()}}>LOGOUT</button>
      </div>
    </div>
  );
}

