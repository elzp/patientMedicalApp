import React, {useState} from 'react';
import './../App.css';
import data from './../somedata.json';



function Footer() {

const {foot}:{foot: footObj} = data;

  return (
    <div className="App-footer">
      <footer>

        <p>Nasz adres:<br/>
         {foot.adress['street-type']} {foot.adress.street} 
         {foot.adress.buildingNr} lok. {foot.adress.localNr},<br/>
         {foot.adress.postCode} lok. {foot.adress.city},</p>
        <p>Telefon: {foot.phone}.</p>
        <p>E-mail: {foot.email}.</p>

      </footer>
    </div>
  );
}

export default Footer;
