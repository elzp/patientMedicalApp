import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './../App.css';

function Leftboard(//styles : Styletype
  ) {
//const style: object = styles.leftdiv;

  return (
    <div className='leftdiv'>
     
    {//<img src={logo} className="App-logo" alt="logo" />
}

        <Router forceRefresh={true} > {/* forces refresh of page and loading nee type of content in rightboard */} 
         <Link to="/login" //className= "menu-a"
          ><button>login</button></Link>
       </Router>
       <Router forceRefresh={true} > {/* forces refresh of page and loading nee type of content in rightboard */} 
         <Link to="/signin" //className= "menu-a"
          ><button>Sign In</button></Link>
       </Router> 
  {/* https://medium.com/@towfiqu/nodejs-password-encryption-with-bcrypt-8f78d78dc3e8 */}
    </div>
  );
}

export default Leftboard;
