import React, {useState} from 'react';
import Appointment from './Appointment';
import Select from 'react-select';//npm install --save @types/react-select
import DatePicker from "react-datepicker";// npm i react-datepicker  ;  npm i @types/react-datepicker
import axios from 'axios';
import './../App.css';
import "react-datepicker/dist/react-datepicker.css";
import data from './../somedata.json';

function Appointments(props: any ) {
 const {value}: {value: number} = props;

const [selectedOption, setSelectedOption] = useState(["none"]);
const [selectedOption2, setSelectedOption2] = useState(["none"]);
const [startDate, setStartDate] = useState(new Date());
const [selectNameofDocVis, setVisNameOfDoc] = useState(false);
const pacientid = 4;
const newDoctors =
  data.doctors.map((item:any )=> { 
    let {option: value, value:label} = item;
    return {value, label};
});

const NamesOfDoctors = //prepare data in format {value label}.
  data.doctors.map((item:any )=> { 
    let {option: value, value:label} = item;
    return {value, label};
});
const defaultValueDoctorsGroup = [{value:"choose Type of doctor", label:"choose Type of doctor2"}];
const [namesOfDoctorsInGroup, setNamesOfDoctorsInGroup] = useState(defaultValueDoctorsGroup);

const handleDoctorSelect = (e:  any | null | void ) => {//sets selected value of doctors' type
    setSelectedOption([ e?.label]);
  //  handleTypeDoctorSelect(JSON.stringify(e));
  };

  
const handleExactDoctorSelect = (e: any| null | void) => {//sets selected value of doctor's name and surname
  setSelectedOption2([e?.label]);
};

function  handleTypeDoctorSelect(e:any| null | void){ //asynchronous function
  //sets array of doctor's names depending on chosen type of doctor
  let newnamesOfDoctorsInGroup = 
  data.doctors
  //getting object with value = value2
    .filter((item:any) => item.value === e?.label || item.value === selectedOption[0])
    //retreving array allDoctors
    .map((item:any)=>item.allDoctors);
 let newnamesOfDoctorsInGroup1= newnamesOfDoctorsInGroup[0];  
 let newnamesOfDoctorsInGroup2=
    Object.values(newnamesOfDoctorsInGroup1).map((it, ind) =>{ 
      let value = `${ind}`; 
      let label =`${it}`;
      return { value, label };}) //create array with values type: {value, label}.
      ||namesOfDoctorsInGroup;//fix bug: not handling undefined or null
  setNamesOfDoctorsInGroup(namesOfDoctorsInGroup => newnamesOfDoctorsInGroup2);
}

function handleVisOfDocSel (){
  setVisNameOfDoc(selectNameofDocVis=> 
    { 
      let newselectNameofDocVis = selectNameofDocVis===false ? true:  true;
      return newselectNameofDocVis
    })
}

// server API code
const visitApiAdress ="http://localhost:3001/";

function onSubmit(e: any| null | void) {
  e.preventDefault();
   // saving data from form to .json file
      axios
      .post(`${visitApiAdress}/newVisit`, {id:pacientid, type: selectedOption[0],name: selectedOption2[0], time:startDate})
      .then((res:any) => console.log('data was send', res))
      .catch((err: any) => {
        console.error(err);
      });

}

//set default value of variable savedAppList
const [pacientVisitsData, setpacientVisitsData] =useState({ "id": pacientid, "visits": []});

// set current data in pacientVisitsData from json file send from server
function getdataFromFile(){
  axios
  .get(`${visitApiAdress}/${pacientid}`)
  .then((res:any) => {
  //log in browser
  console.log('data was received', JSON.parse(res.data))
  const data = JSON.parse(res.data);
  setpacientVisitsData(pacientVisitsData => data)
  }
)
.catch((err: any) => {
  console.error(err);
});
}




  return (
    <div className="appointment">

    <div id="welcome-section">
        <div><h1 id="title">Help us inprove!</h1></div>
        <div><p id="description">Thank you for your supprot and choosing us to learn new skills. Please take a quick qiuestionnaire. And help us improve ourself.</p>
        </div>
    </div>
    
       
    <form id="survey-form" onSubmit={onSubmit}
    >   
    wybrana opcja w 1: {JSON.stringify(selectedOption)} ------  <br /> 
         grupa lekarzy: {JSON.stringify(namesOfDoctorsInGroup)} -----<br /> 
          wybrana opcja w 2: {JSON.stringify(selectedOption2)}
     <div className="div">Choose type of doctor:<br/></div>
       <div>       
         <Select /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/
        options={newDoctors}
        onChange={(e)=>{//https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs (multiple action functions)
          handleTypeDoctorSelect(e);//set array of doctors
          handleDoctorSelect(e);//set value of first select
          } 
        }
        onMenuClose ={handleVisOfDocSel}
        value={newDoctors.find(function(option:any) {
          return option.value === selectedOption[0];
        })}
        label="Single select"
      />
    </div>
     
   { selectNameofDocVis && (
   <div className="div"> Choose your doctor/s:<br/>
     <Select /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/
        options={namesOfDoctorsInGroup}
        onChange={e=>handleExactDoctorSelect(e)}
        value={namesOfDoctorsInGroup.find(function(option) {
          return option.value === selectedOption2[0];
        })}
        label="Single select"
      />
     </div>
     )} 


     <br/>
     <DatePicker selected={startDate} onChange={(date: Date) => {setStartDate(date);}
    }  showTimeSelect   
    timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
          
          <div id="button"> <button  id="submit" type="submit">Submit</button></div> 
      </form>
     
      
   
    </div>
  );
}

export default Appointments;
