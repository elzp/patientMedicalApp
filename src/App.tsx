import React, {useState} from 'react';
import './App.css';
import logo from './images/ic-logo.png';
import {Leftboard} from './comp/Leftboard';
import {Rightboard} from './comp/Rightboard';
import Header from './comp/Header';
import Footer from './comp/Footer';
import {userContext} from './context/userContext';
import {ErrorBoundary} from './comp/ErrorBoundary';
import data from './somedata.json';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; /* zainstaluj: npm i --save-dev @types/react-router-dom */
import {typeuserdata} from './../types/common/main.d'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  RouteObject
} from "react-router-dom";
 const defaultUser:typeuserdata = {
    currentuser: {pacientId: "-5",
                  pacientUsername: "",
                  isLogin: false}
  }
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <div>Hello world!</div>,
  //   },
  // ]);
  const {menu}:{menu: Array<Array<string>>} = data;
  
   
      // <Route path="/" element={<Root />}>
      //   <Route path="dashboard" element={<Dashboard />} />
      //   {/* ... etc. */}
      // </Route>


  export function App(props: any) {
  
  const [userdata, setuserdata]= useState(defaultUser)

  // here was function handleChangeOfUser, now it is in srcfunctons.ts.
  // here was function handleLogout, now it is in srcfunctons.ts

  const routes: RouteObject[]= menu.map(item=>( 
//     <Route path=//"/:pathType"
//      {`/${item[1]}`}
//      key={item[0]}
//     >
//     element= {
//      <Rightboard changeuser={setuserdata} 
//      defaultuser={defaultUser}/> 
//      }
//    </Route>
{
  path:     `/${item[1]}`,
  element:  <Rightboard changeuser={setuserdata} 
            defaultuser={defaultUser}/>,   
  errorElement: <ErrorBoundary />
}

)
)
  const router = createBrowserRouter(
    routes)
  return (
    <div className= "App">
      <userContext.Provider value={userdata}>
      <header data-testid="header">
          <div className="brand-nav">
            <div className="App-logo">        
              <img src={logo} alt="logoOfApp"  className="img-logo"/>
            </div>
            <div className="title"> 
              <h3>Patient-doctor App</h3>
            </div>
          </div>
          <Header 
          userdata={userdata} 
          changeuser={setuserdata}
          defaultuserdata = {defaultUser} /> 
      </header> 
      <main>
        <RouterProvider router={router} />
      </main> 
       <Footer />
      </userContext.Provider> 
    </div>
  );
}

// export default App;

// export function App() {
//   return (<h1>Hello world!</h1>);
// }
