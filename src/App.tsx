import React, {useState} from 'react';
import './App.css';
import Leftboard from './comp/Leftboard';
import Rightboard from './comp/Rightboard';
import Header from './comp/Header';
import Footer from './comp/Footer';
import {userContext} from './context/userContext';
import data from './somedata.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; /* zainstaluj: npm i --save-dev @types/react-router-dom */





function App(props: any) {
  


  const userdata:userdata = {
    currentuser: {pacientId: 1,
                  pacientUsername: "Greenbean"}
  }

  const {menu}:{menu: Array<Array<string>>} = data;
  return (
    <div className= "App">
      <header>
          <Header />
      </header>
      <main>
          <Leftboard /> 

          <Router >
            <Switch>
              {  menu.map(item=>( 
                   <Route exact path=//"/:pathType"
                    {`/${item[1]}`}
                   >
                    <userContext.Provider value={userdata}>
                    <Rightboard propsPath={item[0]} /> 
                    </userContext.Provider>
                  </Route>
              ))
              }
            </Switch>
          </Router> 
        
        <Footer />  
      
      </main>
      
    </div>
  );
}

export default App;
