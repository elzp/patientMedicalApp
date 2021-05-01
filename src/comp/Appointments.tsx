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

const NamesOfDoctors = //prepare data in format {value label}.
  data.doctors.map(item => { 
    let {option: value, value:label} = item;
    return {value, label};
});

const [namesOfDoctorsInGroup, setNamesOfDoctorsInGroup] = useState([{value:"choose Type of doctor", label:"choose Type of doctor2"}]);

const handleDoctorSelect = (e:  any | null | void ) => {//sets selected value of doctors' type
    setSelectedOption([ e?.label]);
  //  handleTypeDoctorSelect(JSON.stringify(e));
  };

  
const handleExactDoctorSelect = (e: any| null | void) => {//sets selected value of doctor's name and surname
  setSelectedOption2([e?.label]);
};

function handleTypeDoctorSelect(){ //sets array of doctor's names depending on chosen type of doctor
  let newnamesOfDoctorsInGroup =
  data.doctors
  //getting object with value = value2
    .filter(item => item.value === selectedOption[0])
    //retreving array allDoctors
    .map(item=>item.allDoctors);
 let newnamesOfDoctorsInGroup1= newnamesOfDoctorsInGroup[0];  
 let newnamesOfDoctorsInGroup2=
    Object.values(newnamesOfDoctorsInGroup1).map((it, ind) =>{ 
      let value = `${ind}`; 
      let label =`${it}`;
      return { value, label };}) //create array with values type: {value, label}.
      ||namesOfDoctorsInGroup;//fix bug: not handling undefined or null
  setNamesOfDoctorsInGroup(namesOfDoctorsInGroup=> newnamesOfDoctorsInGroup2);
}
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
    wybrana opcja w 1: {JSON.stringify(selectedOption)} ------  <br /> 
         grupa lekarzy: {JSON.stringify(namesOfDoctorsInGroup)} -----<br /> 
          wybrana opcja w 2: {JSON.stringify(selectedOption2)}
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
          handleDoctorSelect(e);
          handleTypeDoctorSelect();}
        }
        value={newDoctors.find(function(option) {
          return option.value === selectedOption[0];
        })}
        label="Single select"
      />
    </div>
     
     <div className="div"> Choose your doctor/s:<br/>
     <Select /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/
        options={namesOfDoctorsInGroup}
        onChange={e=>handleExactDoctorSelect(e)}
        value={namesOfDoctorsInGroup.find(function(option) {
          return option.value === selectedOption2[0];
        })}
        label="Single select"
      />
     </div><br/>
      
          
         <div id="button"> <button  id="submit" type="submit">Submit</button></div>
      </form>
     
    
   
    </div>
  );
}

export default Appointments;
