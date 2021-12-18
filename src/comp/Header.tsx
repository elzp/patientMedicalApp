import React, {useState, useEffect} from 'react';
import './../App.css';
import menuLogo from './../ic-menu.png';
import logo from './../ic-logo.png';
import data from './../somedata.json';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Header() {
const [menuVisible, setVisibility] = useState(false);
const {menu}:{menu: Array<Array<string>>} = data;
const newmenu = menu.slice(0,6);

function changeMenuVisibility () {
  setVisibility(menuVisible=>!menuVisible)
}
//https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}
const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  
useEffect(() => {
  function handleResize() {
    setWindowWidth(getWindowWidth());  
  }
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  return (
    <div className="App-header">
      <div className="navbar-wrapper">
        {/* in css this class has property to be hidden when screen is smaller than 1024px */}
          <div className="navbar-button">
            <button  onClick={changeMenuVisibility}><img src={menuLogo} alt="menu" className="button-img" /></button>
          </div>
          
          
          <div className="menu-elements-wrapper">
          {((windowWidth>800) || ((windowWidth<=800) && menuVisible)) && 
          (
          
            <div  className="menu-elements">
              {newmenu.map(item=>(
              <Router forceRefresh={true} > {/* forces refresh of page and loading nee type of content in rightboard */} 
                <Link to={`/${item[1]}`} className= "menu-a" key = {item[0]} onClick={changeMenuVisibility} >
                <div  key={item[0]} className="menu-link">
                  {item[0]}
                </div>
                  </Link>
              </Router>
              ))
              }
              
            </div>
          )}
          </div>

          <div className="brand-nav">
            <div className="App-logo">        
              <img src={logo} alt="logoOfApp"  className="img-logo"/>
            </div>
            <div className="title"> 
              <h3>Patient-doctor App</h3>
            </div>
          </div>
      </div>
      
    </div>
  );
}

export default Header;
