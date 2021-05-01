import React, {useState} from 'react';
import './../App.css';
import menuLogo from './../ic-menu.png';
import logo from './../ic-logo.png';
import data from './../somedata.json';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { IndexKind } from 'typescript';

function Header(styles: Styletype) {
 //const logo : string = './../public/ic-menu.png';
const [menuVisible, setVisibility] = useState(false);
const {menu}:{menu: Array<Array<string>>} = data;

const arrOfFalse = new Array(data.menu.length).fill(false);
const arrOfMenuButtonsStyle = new Array(data.menu.length).fill("menu-link");
const [areClicked, setIfareClicked] = useState(arrOfFalse);
const [buttonStyle,setButtonStyle] = useState(arrOfMenuButtonsStyle);

function changeMenuVisibility () {
  setVisibility(menuVisible=>!menuVisible)
}


function changeMenuItemView(indexOfItem: number) {
  let newAreClicked = arrOfFalse;
  newAreClicked[indexOfItem] = true;
  console.log(newAreClicked);
  setIfareClicked(areClicked =>newAreClicked);
  changeMenuVisibility();

  let newArrOfMenuButtonsStyle = arrOfMenuButtonsStyle;
  newArrOfMenuButtonsStyle[indexOfItem] = "menu-link-clicked";
  console.log(newArrOfMenuButtonsStyle);
  setButtonStyle(buttonStyle =>newArrOfMenuButtonsStyle);
  changeMenuVisibility(); 
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
              {menu.map((item,index)=>(
              <div className={buttonStyle[index]}>
              <Router forceRefresh={true} > {/* forces refresh of page and loading nee type of content in rightboard */} 
                <Link to={`/${item[1]}`} className= "menu-a" onClick={()=>changeMenuItemView(index)} >{item[0]}</Link>
              </Router>
                {/* <a className= "menu-a" href="/"  onClick={changeMenuVisibility}>{item[0]}</a> */}
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
              <Router forceRefresh={true} > {/* forces refresh of page and loading nee type of content in rightboard */} 
                <Link to={`/${item[1]}`} className= "menu-a" onClick={changeMenuVisibility} >{item[0]}</Link>
              </Router>
                {/* <a className= "menu-a" href="/"  onClick={changeMenuVisibility}>{item[0]}</a> */}
              </div>))
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
{
       /*: (<div className="navbar-button">
          <button  onClick={changeMenuVisibility}><img src={menuLogo} alt="menu" className="button-img"/></button>
          </div >)*/
      }
      
    </div>
  );
}

export default Header;
