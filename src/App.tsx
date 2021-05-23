import React, {useState} from 'react';
import './App.css';
import Leftboard from './comp/Leftboard';
import Rightboard from './comp/Rightboard';
import Header from './comp/Header';
import Footer from './comp/Footer';
import data from './somedata.json';
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'; /* zainstaluj: npm i --save-dev @types/react-router-dom */





function App(props: any) {
  
  const [TypeOfRightboard, setTypeOfRightboard ] = useState('new');
  function changeTypeOfRightboard (props: any){
    const temporaryType = props ;//| 'Account';
    setTypeOfRightboard( temporaryType);
  }

  const {menu}:{menu: Array<Array<string>>} = data;
  return (
    <div className= "App">
      {//JSON.stringify({TypeOfRightboard})
      }
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
                    <Rightboard propsPath={item[0]} /> 
                  </Route>
              ))
              }
              { //<Link  className= "menu-a" to={`/${item}`}  onClick={changeMenuVisibility}>{item}</Link>
              }
            </Switch>
          </Router> 
        
        {/* <Rightboard type={""} />  */}
        <Footer />  
      
      </main>
      
    </div>
  );
}

export default App;
