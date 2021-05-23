import React, {useState, useEffect} from 'react';
import Appointments from './Appointments';
import Start from './Start';
import Result from './Result';
import Refferals from './Refferals';
import Receipts from './Receipts';
import Account from './Account';
import {userContext} from '../context/userContext';
import './../App.css';
import data from './../somedata.json';
import { useLocation, useParams } from 'react-router-dom'; 

function Rightboard(props: any) {

//useLocation works if in parent component providor is set. 
  const { pathname } = useLocation();
 
  const comps = [<Start />, <Appointments pacientId ={4}/>,<Refferals />,<Result />, <Receipts />, <Account pacientId ={4} />]
  const comps2 = [Start, Account, Refferals, Result, Receipts,Appointments ]
  let ChosenChildcomp =Start;

 // setting child component to be visible depending on path value
 for (let i=0; i < comps2.length; i++)
  {
    if(pathname === "/"+ data.menu[i][1]) {
      ChosenChildcomp=comps2[i];
      break;
    } 
}




  return (
    <div className='rightdiv'>
      
    
      <userContext.Consumer>
        {(value) => {
        return <ChosenChildcomp userdata={value} />
        }}
      </userContext.Consumer>
  
       
    </div>
  );
}

export default Rightboard;
