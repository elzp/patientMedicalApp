import React, {useState} from 'react';
import './../App.css';
import menuLogo from './../ic-menu.png';
import data from './../somedata.json';
function Header(styles: Styletype) {
 //const logo : string = './../public/ic-menu.png';
const [menuVisible, setVisibility] = useState(false);

const {menu}:{menu: string[]} = data;
function changeMenuVisibility () {
  setVisibility(menuVisible=>!menuVisible)
}

  return (
    <div className="App-header">
      <header >
      {menuVisible ? (
        <div className="navbar-wrapper">
          <div className="navbar-button">
            <button  onClick={changeMenuVisibility}><img src={menuLogo} alt="menu" className="button-img" /></button>
          </div>
          <div className="menu-elements-wrapper">
            <div  className="menu-elements">
              {menu.map(item=>(
              <div className="menu-link">
                <a className= "menu-a" href="/"  onClick={changeMenuVisibility}>{item}</a>
              </div>))
              }
            </div>
          </div>
        </div>) :

        (<div className="navbar-button">
          <button  onClick={changeMenuVisibility}><img src={menuLogo} alt="menu" className="button-img"/></button>
          </div >)
      }
      </header>
    </div>
  );
}

export default Header;
