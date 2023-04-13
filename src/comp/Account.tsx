import React, { useState, useMemo } from 'react';
import { Link, Navigate} from 'react-router-dom';
import {handleLogout} from './srcfunctions';
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


 const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  e.preventDefault(); 
const url = `${visitApiAdress}/user/logout/${pacientId}`.replace(/\"/g,'')
await axios
  .post(url, JSON.stringify({id: pacientId}))
  .then((res:any) => {
    console.log(JSON.parse(res.data))

    handleLogout(props.defaultuser, 
    props.changeuser, 
    props.userdata);
  })
  .catch((err: any) => {
    console.error(err);
});
}
if (localStorage.getItem('isLogin')==="false") {
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
    </div>
  );
}}

