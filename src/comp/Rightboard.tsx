import React, {useState, useEffect} from 'react';
import Appointments from './Appointments';
import Start from './Start';
import Result from './Result';
import Refferals from './Refferals';
import Receipts from './Receipts';
import Account from './Account';

import './../App.css';
import data from './../somedata.json';
import { useLocation, useParams } from 'react-router-dom'; 

function Rightboard(props: any) {


  //const { pathType } = useParams<Record<string, string | undefined>>();
  //const  type2 = useParams()?.pathType;
  // const { pathType } = useParams<Record<string, string | undefined>>()
 //  save  string from "":type" variable in path string from route in App.tsx.
 //https://stackoverflow.com/questions/59085911/required-url-param-on-react-router-v5-with-typescript-can-be-undefined
 // const { pathname } = useLocation();
  // const [type, setType] =useState("start");
 const { propsPath } = props;

  // function changeType(){
  //   setType(props.type);
  // }
   const numberOfApp: Array<number> = [1,2,3,4,5,6];

  //  useEffect(()=>{
  //    setType(props.type);
  // },[type] )
  const { pathname } = useLocation();
  const match = pathname.match(/[^\/]/g)?.join("");
  //const type = match?.[1];
  const comps = [<Start/>, <Appointments />,<Refferals />,<Result />, <Receipts />, <Account />]

  return (
    <div className='rightdiv'>
      
      {
      JSON.stringify(match)
      }
      {
       //JSON.stringify(pathname) 
      }

      <div>
        
      {match === data.menu[0][1] && <Start/>}
      {match === data.menu[1][1] && comps[0] //<Appointments />
      }
      {match === data.menu[2][1] && comps[1]  }
      {match === data.menu[3][1] && <Result />}
      {match === data.menu[4][1] && <Receipts />}
      {match === data.menu[5][1] && <Account />}

    
       
       


      </div>
       
    </div>
  );
}

export default Rightboard;
