import React, {useState} from 'react';
import './App.css';
import Leftboard from './comp/Leftboard';
import Rightboard from './comp/Rightboard';
import Header from './comp/Header';
import Footer from './comp/Footer';
import {userContext} from './context/userContext';
import data from './somedata.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; /* zainstaluj: npm i --save-dev @types/react-router-dom */
import useEffect from 'react';





function App(props: any) {
  

  const [userdata, setuserdata] = useState({
    currentuser: {pacientId: -5,
                  pacientUsername: "",
                  isLogin: false}
  })


  

function handleChangeOfUser(newlogin: string, newid: number, status: boolean){
  const newuser = {
    currentuser: {pacientId: newid,
                pacientUsername: newlogin,
                isLogin: true}
}
  setuserdata(userdata=>newuser)
  console.log(`handleChangeOfUser was used and updated ${newlogin} `)
}
  
  const {menu}:{menu: Array<Array<string>>} = data;
  return (
    <div className= "App">
      <userContext.Provider value={userdata}>
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
                    
                    <Rightboard propsPath={item[0]} changeuser={handleChangeOfUser} /> 
                    
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
