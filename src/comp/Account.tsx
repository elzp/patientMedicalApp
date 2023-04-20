import React, { useState, useMemo } from 'react';
import { Link, Navigate} from 'react-router-dom';
import {handleLogout} from './srcfunctions';
import { getdataFromFile } from './srcfunctions';
import {visit} from './../../types/common/main.d'
import Appointment from './Appointment';
import AppointmentsViewer from './AppointmentsViewer';
import './../App.css';
import axios from 'axios';
import { registerLocale } from 'react-datepicker';

export function Account(props: any ) {
 const {value}: {value: number} = props;
 const { currentuser } = props.userdata;
 const pacientId = localStorage.getItem('id');
//  //const {appointment} : {appointment: object} = props.styles;
 // server API code
 const visitApiAdress ="http://localhost:3001";
 const [redirect, setRedirect] = useState(false)

 const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  e.preventDefault(); 
const url = `${visitApiAdress}/user/logout/${pacientId}`.replace(/\"/g,'')
await axios
  .post(url, {})
  .then((res:any) => {    
    handleLogout(props.defaultuser, 
    props.changeuser, 
    props.userdata);

    setRedirect(JSON.parse(res.data))
  })
  .catch((err: any) => {
    console.error(err);
});
}

const [pacientVisitsData, setpacientVisitsData] =useState({ "id": pacientId, "visits": []});

const listOfSavedAppointments = pacientVisitsData.visits.length === 0 ? 
    "Missing some options. Please refill form above.":
           pacientVisitsData.visits.map( (it: visit) => (
            <div key = {it.vizId} ><Appointment 
                key = {it.vizId} 
                dataAboutAppointment = {it} 
                lengthofAllData ={pacientVisitsData.visits.length}
                />
            </div>)
           )

  const idUserAPI = `${visitApiAdress}/${Number(JSON.parse(`${pacientId}`.replace(/\"/g,'')))}`
           

React.useEffect(()=> {
  getdataFromFile(idUserAPI, setpacientVisitsData,pacientVisitsData ); 
}, [])

if (redirect) {
  return <Navigate replace to="/" />;
} else {
  return (
    <div className="account">
      <h3>Welcome {localStorage.getItem('nameOfLogin')}.</h3>
      <div>
        <Link reloadDocument to={'/'}>
          <button onClick={(e)=>handleClick(e)}>LOGOUT</button>
        </Link>
      </div>
      <AppointmentsViewer 
        pacientVisitsData={pacientVisitsData} 
        listOfSavedAppointments={listOfSavedAppointments}
      />
    </div>
  );
}}

