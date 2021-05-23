import React, {useState} from 'react';
import Appointment from './Appointment';
import Select from 'react-select';//npm install --save @types/react-select
import './../App.css';
import data from './../somedata.json';

function Appointments(props: any ) {
 const {value}: {value: number} = props;

const [selectedOption, setSelectedOption] = useState(["none"]);
const [selectedOption2, setSelectedOption2] = useState(["none"]);

const newDoctors =
data.doctors.map(item => { 
  let {option: value, value:label} = item;
  return {value, label};


});



const NamesOfDoctors =
data.doctors.map(item => { 
  let {option: value, value:label} = item;
  return {value, label};
});

const [namesOfDoctorsInGroup , setNamesOfDoctorsInGroup] = useState([{value:"choose Type of doctor", label:"choose Type of doctor2"}]);

  
  function handleTypeDoctorSelect(value2: string){
    let newnamesOfDoctorsInGroup =
    data.doctors
    //getting object with value = value2
      .filter(item => item.value === value2)
      //retreving array allDoctors
      .map(item=>item.allDoctors);
   let newnamesOfDoctorsInGroup2=
      Object.values(newnamesOfDoctorsInGroup).map((it, ind) =>{ 
        let value = `${ind}`; 
        let label =`${it}`;
        return { value, label };}); //create array with values type: {value, label}.
  
    setNamesOfDoctorsInGroup(namesOfDoctorsInGroup=> newnamesOfDoctorsInGroup2);
  }

  const handleDoctorSelect = (e: doctorsValue| null | void) => {
    setSelectedOption([JSON.stringify(e)]);
  //  handleTypeDoctorSelect(JSON.stringify(e));
  };

  
const handleExactDoctorSelect = (e: doctorsValue| null | void) => {
  setSelectedOption2([JSON.stringify(e)]);
};
  return (
    <div className="appointment">

         <p> This is new appointment {JSON.stringify( value)}.</p> 
        
         <Appointment noOfAppointment = {value}/>
       
         {/* {selectedOption}  

         {JSON.stringify(newDoctors)}    */}
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

        
     <div className="div">Choose type of doctor:<br/></div>
       <div>
       {/* <Select
        options={data.doctors}
        //onChange={handleTypeSelect}
      //   value={data.doctors.filter(function(option) {
      //     return option.value === selectedOption;})
      // }
        //label="Single select"
        /> */}
         
         <Select /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/
        options={newDoctors}
        onChange={(e)=>{//https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs (multiple action functions)
          handleDoctorSelect();
          handleTypeDoctorSelect(JSON.stringify(e));}
        }
        value={newDoctors.filter(function(option) {
          return option.value === selectedOption[0];
        })}
        label="Single select"
      />
    </div>
     
     <div className="div"> Choose your doctor/s:<br/>
     <Select /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/
        options={namesOfDoctorsInGroup}
        onChange={handleExactDoctorSelect}
        value={namesOfDoctorsInGroup.filter(function(option) {
          return option.value === selectedOption2[0];
        })}
        label="Single select"
      />
     </div><br/>
         
     {/* <div className="div">Please, write down your suggestion of laguages, which you want to learn. </div>  
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

        <br/> */}
          
         <div id="button"> <button  id="submit" type="submit">Submit</button></div>
      </form>
     
    
   
    </div>
  );
}

export default Appointments;
