import React, {useState} from 'react';
import Appointment from './Appointment';
import Select from 'react-select';//npm install --save @types/react-select
import './../App.css';
import data from './../somedata.json';

function Appointments(props: any ) {
 const {value}: {value: number} = props;
 //const {appointment} : {appointment: object} = props.styles;
 const [selectedOption, setSelectedOption] = useState("none");
 const handleTypeSelect = (el: React.ChangeEvent<HTMLInputElement>) => {
  //setSelectedOption(el.value);
};

  return (
    <div className="appointment">

         <p> This is new appointment {JSON.stringify( value)}.</p> 
        
         <Appointment noOfAppointment = {value}/>
       
           
    <div id="welcome-section">
        
        <div><h1 id="title">Help us inprove!</h1></div>
 
        <div><p id="description">Thank you for your supprot and choosing us to learn new skills. Please take a quick qiuestionnaire. And help us improve ourself.</p>
        </div>
    </div>
    
       
    <form id="survey-form" action="/submit-data">      
     <label id="name-label"> Your name:</label><br/>
        <input  id="name" type="text" placeholder="your name" required />
        <br/>
     <label id="email-label"> Your email adress: </label> 
        <br/>
        <input id="email" type="email" placeholder="your email adress" required /><br/>
     <label id="number-label"> Your age (optional):</label>
        <br/>
        <input  id="number" type="number"  min="10" max="99" placeholder="your age" />
        <br/>

        
     <div className="div">Choose your educational status:<br/></div>
       <div>
       <Select
        options={data.doctors}
        //onChange={handleTypeSelect}
      //   value={data.doctors.filter(function(option) {
      //     return option.value === selectedOption;})
      // }
        //label="Single select"
        />
         
         {/* <select  id="dropdown" name="mostLike" className="form-control" required>
        <option disabled selected value>Select an option</option>
        
        <option value="collage">Collage student</option>
        <option value="university">Univesity student</option>
        <option value="openSworkource">Working</option>
        <option value="nowork">Unemployed</option>
      </select> */}
    </div>
     
     <div className="div"> Choose, which course you would like to take part:<br/>
          <label
        ><input
          name="prefer"
          value="Chineese"
          type="checkbox"
          className="input-checkbox"
        />Chineese</label
      >
      <br/>
     <label
        ><input
          name="prefer"
          value="Russian"
          type="checkbox"
          className="input-checkbox"
        />Russian</label
      ><br/>
          <label
        ><input
          name="prefer"
          value="Swedish"
          type="checkbox"
          className="input-checkbox"
        />Swedish</label
      ><br/>
         
         
         <label
        ><input
          name="prefer"
          value="Polish"
          type="checkbox"
          className="input-checkbox"
        />Polish</label
      > 
     </div><br/>
         
     <div className="div">Please, write down your suggestion of laguages, which you want to learn. </div>  
      <div>  
              <textarea
                  id="comments"
                  className="input-textarea"
                  placeholder="Write down your opinions here...">
          </textarea>
      </div>  
         
          
          
      <div className="form-group">
        <div className="div">Would you recommend our courses to a friend?</div>
        <label>
          <input
            name="user-recommend"
            value="definitely"
            type="radio"
            className="input-radio"
            checked
          />Definitely</label
        ><br/>
        <label>
          <input
            name="user-recommend"
            value="maybe"
            type="radio"
            className="input-radio"
          />Maybe</label
        ><br/>

        <label
          ><input
            name="user-recommend"
            value="not-sure"
            type="radio"
            className="input-radio"
          />Not sure</label
        >
      </div>

        <br/>
          
         <div id="button"> <button  id="submit" type="submit">Submit</button></div>
      </form>
     
    
   
    </div>
  );
}

export default Appointments;
