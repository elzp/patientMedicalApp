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
import { chooseChildComponent } from './srcfunctions';

import { useLocation, useParams } from 'react-router-dom'; 

function Rightboard(props: any) {

//useLocation works if in parent component providor is set. 
  const { pathname } = useLocation();
  const changeuser:React.Dispatch<React.SetStateAction<typeuserdata>> = props.changeuser
  const arrayofAllJsxMenuComponents = [Start, Account, Refferals, Result, Receipts,Appointments, Login, SignIn ]
  const compsForNotLogged = [data.menu[0][0], data.menu[6][0], data.menu[7][0]];
  let ChosenChildcomp =Start;
 // setting child component to be visible depending on path value
 ChosenChildcomp = chooseChildComponent(arrayofAllJsxMenuComponents,
 pathname, data.menu, compsForNotLogged) || Start


  return (
    <div className='rightdiv'>
         
      <userContext.Consumer>
        {(value) => {
        return <ChosenChildcomp userdata={value} changeuser={changeuser} defaultuser={props.defaultuser} />
        }}
      </userContext.Consumer>
       
    </div>
  );
}

export default Rightboard;
