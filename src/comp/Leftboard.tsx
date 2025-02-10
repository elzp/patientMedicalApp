import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router';
import './../App.css';
import { handleLogout } from './srcfunctions';
export  function Leftboard(props: any
  ) {

  return (
    <div className='leftdiv'>
     

        <Router> 
         {localStorage.getItem('isLogin')==="true" ? <Link to="/login" 
          ><button onClick={()=>handleLogout(props.defaultuserdata, props.changeuser, props.currentuserdata)}>logout</button></Link> :
          <Link reloadDocument to="/login" 
          ><button>login</button></Link>}
         {/*reloadDocument forces refresh of page and loading nee type of content in rightboard */} 
         {localStorage.getItem('isLogin')==="false" && <Link to="/signin" 
          ><button>Sign In</button></Link>}
       </Router> 
  {/* https://medium.com/@towfiqu/nodejs-password-encryption-with-bcrypt-8f78d78dc3e8 */}
    </div>
  );
}

// export default Leftboard;
