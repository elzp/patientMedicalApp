import React, {useState} from 'react';
import './App.css';
import Leftboard from './comp/Leftboard';
import Rightboard from './comp/Rightboard';
import Header from './comp/Header';
import Footer from './comp/Footer';
import {userContext} from './context/userContext';
import data from './somedata.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; /* zainstaluj: npm i --save-dev @types/react-router-dom */


 const defaultUser:typeuserdata = {
    currentuser: {pacientId: "-5",
                  pacientUsername: "",
                  isLogin: false}
  }

function App(props: any) {
  
  const [userdata, setuserdata]= useState(defaultUser)

  // here was function handleChangeOfUser, now it is in srcfunctons.ts.
  // here was function handleLogout, now it is in srcfunctons.ts

  const {menu}:{menu: Array<Array<string>>} = data;
  return (
    <div className= "App">
      <userContext.Provider value={userdata}>
      <header data-testid="header">
          <Header />
      </header>
      <main>
          <Leftboard 
          currentuserdata={userdata} 
          changeuser={setuserdata}
          defaultuserdata = {defaultUser} /> 

          <Router >
            <Switch>
              {  menu.map(item=>( 
                   <Route exact path=//"/:pathType"
                    {`/${item[1]}`}
                    key={item[0]}
                   >
                    
                    <Rightboard changeuser={setuserdata} 
                    defaultuser={defaultUser}/> 
                    
                  </Route>
              ))
              }
            </Switch>
          </Router> 
        
        <Footer />  
      
      </main>
      </userContext.Provider> 
    </div>
  );
}

export default App;
