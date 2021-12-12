import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './../App.css';
import { handleLogout } from './srcfunctions';
function Leftboard(props: any
  ) {

  return (
    <div className='leftdiv'>
     

        <Router forceRefresh={true} > {/* forces refresh of page and loading nee type of content in rightboard */} 
         {localStorage.getItem('isLogin')==="true" ? <Link to="/login" 
          ><button onClick={()=>handleLogout(props.defaultuserdata, props.changeuser, props.currentuserdata)}>logout</button></Link> :
          <Link to="/login" 
          ><button>login</button></Link>}
         
         {localStorage.getItem('isLogin')==="false" && <Link to="/signin" 
          ><button>Sign In</button></Link>}
       </Router> 
  {/* https://medium.com/@towfiqu/nodejs-password-encryption-with-bcrypt-8f78d78dc3e8 */}
    </div>
  );
}

export default Leftboard;
