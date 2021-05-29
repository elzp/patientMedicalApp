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


 const defaultUser:typeuserdata = {
    currentuser: {pacientId: "-5",
                  pacientUsername: "",
                  isLogin: false}
  }
  localStorage.setItem('nameOfLogin', `${defaultUser.currentuser.pacientUsername}`);
  localStorage.setItem('isLogin', `${defaultUser.currentuser.isLogin}`);
  localStorage.setItem('id', `${defaultUser.currentuser.pacientId}`);
// if(localStorage.getItem('isLogin')=="true"){//to much rerenders!!!
//   const actualUser = {
//       currentuser: {pacientId: localStorage.getItem('id')||  "-5",
//                     pacientUsername: localStorage.getItem('nameOfLogin') ||"",
//                     isLogin: localStorage.getItem('isLogin')=="true" ? true : false
//                    }
//   }
// }
function App(props: any) {
  
 
 
    
   

  const [userdata, setuserdata]= useState(defaultUser)


  

function handleChangeOfUser(newlogin: string, newid: string, status: boolean){
  const newuser = {
    currentuser: {pacientId: newid,
                pacientUsername: newlogin,
                isLogin: true}
}
  localStorage.setItem('nameOfLogin', `${newuser.currentuser.pacientUsername}`);
  localStorage.setItem('isLogin', `${newuser.currentuser.isLogin}`);
  localStorage.setItem('id', `${newuser.currentuser.pacientId}`);
  setuserdata(userdata=>newuser)
  
  console.log(`handleChangeOfUser was used and updated ${newlogin} `)
}
 

function handleLogout(){

  setuserdata(userdata=>defaultUser)
  localStorage.setItem('nameOfLogin', `${defaultUser.currentuser.pacientUsername}`);
  localStorage.setItem('isLogin', `${defaultUser.currentuser.isLogin}`);
  localStorage.setItem('id', `${defaultUser.currentuser.pacientId}`);
  console.log("User was log out.")
}
  const {menu}:{menu: Array<Array<string>>} = data;
  return (
    <div className= "App">
      <userContext.Provider value={userdata}>
      <header>
          <Header />
      </header>
      <main>
          <Leftboard {...handleLogout}/> 

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
