import React, {useState, useEffect} from 'react';
import Appointments from './Appointments';
import Start from './Start';
import Result from './Result';
import Refferals from './Refferals';
import Receipts from './Receipts';
import Account from './Account';
import Login from './Login';
import SignIn from './SignIn';
import {userContext} from '../context/userContext';
import './../App.css';
import data from './../somedata.json';
import { useLocation, useParams } from 'react-router-dom'; 

function Rightboard(props: any) {

//useLocation works if in parent component providor is set. 
  const { pathname } = useLocation();
 
  // const comps = [<Start />, <Appointments pacientId ={4}/>,<Refferals />,<Result />, <Receipts />, <Account />]
  const comps2 = [Start, Account, Refferals, Result, Receipts,Appointments, Login, SignIn ]
  const comps21 = data.menu.map(it=> {return it[0];}) 
  const comps3 = [comps21[0], comps21[6], comps21[7]];
  const datamenu2 = [data.menu[0][0], data.menu[6][0], data.menu[7][0]];
  let ChosenChildcomp =Start;
 // setting child component to be visible depending on path value
 //MAKE REDIRECTING only to start, login and sing up when user is not login. //   
 for (let i=0; i < comps2.length; i++)
  {
    if(pathname === "/"+ data.menu[i][1]) {
    if(localStorage.getItem('isLogin')===null || localStorage.getItem('isLogin')!="true"){
      if(datamenu2.some(it=>it===comps21[i])){
      ChosenChildcomp=comps2[i];
      break;
    } 
    }else{
      ChosenChildcomp=comps2[i];
      break;
    } 
  }
}





  return (
    <div className='rightdiv'>
      
    
      <userContext.Consumer>
        {(value) => {
        return <ChosenChildcomp userdata={value} changeuser={props.changeuser} defaultuser={props.defaultuser} />
        }}
      </userContext.Consumer>
  
       
    </div>
  );
}

export default Rightboard;
