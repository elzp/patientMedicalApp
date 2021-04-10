import React, {useState} from 'react';
import './../App.css';
import menuLogo from './../ic-menu.png';
import logo from './../ic-logo.png';
import data from './../somedata.json';
function Header(styles: Styletype) {
 //const logo : string = './../public/ic-menu.png';
const [menuVisible, setVisibility] = useState(true);

const {menu}:{menu: Array<Array<string>>} = data;
function changeMenuVisibility () {
  setVisibility(menuVisible=>!menuVisible)
}

  return (
    <div className="App-header">
      
      <div className="navbar-wrapper-1"> 
          {/* in css this class has property to be hidden when screen is bigger than 1024px */}
          <div className="brand-nav">
            <div className="App-logo">        
              <img src={logo} alt="logoOfApp"  className="img-logo"/>
            </div>
            <div className="title"> 
              <h3>Patient-doctor App</h3>
            </div>
          </div>
          
          <div className="navbar-button-1">
            <button  onClick={changeMenuVisibility}><img src={menuLogo} alt="menu" className="button-img" /></button>
          </div>
          
          <div className="menu-elements-wrapper-1">
            <div  className="menu-elements-1">
              {menu.map(item=>(
              <div className="menu-link">
                <a className= "menu-a" href="/"  onClick={changeMenuVisibility}>{item[0]}</a>
              </div>))
              }
            </div>
          </div>
      </div>
      <div className="navbar-wrapper">
        {/* in css this class has property to be hidden when screen is smaller than 1024px */}
          <div className="navbar-button">
            <button  onClick={changeMenuVisibility}><img src={menuLogo} alt="menu" className="button-img" /></button>
          </div>
          
          
          <div className="menu-elements-wrapper">
          {menuVisible && 
          (
          
            <div  className="menu-elements">
              {menu.map(item=>(
              <div className="menu-link">
                <a className= "menu-a" href="/"  onClick={changeMenuVisibility}>{item[0]}</a>
              </div>))}
              
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
{
       /*: (<div className="navbar-button">
          <button  onClick={changeMenuVisibility}><img src={menuLogo} alt="menu" className="button-img"/></button>
          </div >)*/
      }
      
    </div>
  );
}

export default Header;
