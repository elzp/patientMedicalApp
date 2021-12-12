import React, {useState, useMemo} from 'react';
import Appointment from './Appointment';
import Select from 'react-select';//npm install --save @types/react-select
import DatePicker from "react-datepicker";// npm i react-datepicker  ;  npm i @types/react-datepicker
import './../App.css';
import "react-datepicker/dist/react-datepicker.css";
import data from './../somedata.json';
import { getdataFromFile, onSubmitAppointmentForm } from './srcfunctions';


function Appointments(props: any ) {
 const {value}: {value: number} = props;

const [selectedOption, setSelectedOption] = useState(["none"]);
const [selectedOption2, setSelectedOption2] = useState(["none"]);
const [startDate, setStartDate] = useState(new Date());
const [selectNameofDocVis, setVisNameOfDoc] = useState(false);
const { currentuser } = props.userdata;
const pacientId  = props.userdata.currentuser.pacientId === "-5"? localStorage.getItem('id'): props.userdata.currentuser.pacientId;
//prepare data for forms to choose from
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
const visitApiAdress ="http://localhost:3001";
const idUserAPI = `${visitApiAdress}/${pacientId}`
const postFormUrl = `${visitApiAdress}/newVisit`
const postDataFromForm = {id:pacientId, type: selectedOption[0],name: selectedOption2[0], time:startDate}
// function onSubmitAppointmentForm  was moved to srcfunctions.ts.

//set default value of variable pacientVisitsData
const [pacientVisitsData, setpacientVisitsData] =useState({ "id": pacientId, "visits": []});

// set current data in pacientVisitsData from json file send from server
// function getdataFromFile was moved to srcfunctions.ts.


// refresh list of visits
const [ifRefresh, setStatusIfRefresh] = useState(false)
useMemo(()=> {getdataFromFile(idUserAPI, setpacientVisitsData,pacientVisitsData ); }, [ifRefresh])

function handleRefreshingVisits(){
  setStatusIfRefresh(!ifRefresh);
}

//  visibility list's of visits
const [visOfVisitsList, setVisOfVisitsList] = useState(false) 
function handleVisOfVisitsList() { setVisOfVisitsList(!visOfVisitsList)}

const listOfSavedAppointments = pacientVisitsData.visits === []? 
    "Missing some options. Please refill form above.":
           pacientVisitsData.visits.map( (it: visit) => (
            <div key = {it.vizId} ><Appointment 
                key = {it.vizId} 
                dataAboutAppointment = {it} 
                lengthofAllData ={pacientVisitsData.visits.length}
                />
            </div>)
           )
        

  return (
    <div className="appointment">
    <div id="welcome-section">
        <div><h1 id="title">Add new Visit to your account (id:{pacientId}).</h1></div>
        <h4 id="description">
          {data.desc.visits.instruction}       
        </h4>
    </div>
      <form id="survey-form" onSubmit={(event)=>{
      onSubmitAppointmentForm(event, postFormUrl, postDataFromForm, 'data from form was send'); 
      handleRefreshingVisits()//submitStatus()
    }}>   
    {/* wybrana opcja w 1: {JSON.stringify(selectedOption)} ------  <br /> 
         grupa lekarzy: {JSON.stringify(namesOfDoctorsInGroup)} -----<br /> 
          wybrana opcja w 2: {JSON.stringify(selectedOption2)} */}
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
      <button data-testid="buttonToShowAppointment" onClick={()=>handleVisOfVisitsList()}>Show My Appointments</button>
      <div 
          data-testid="list of saved apponntments">
            {visOfVisitsList && listOfSavedAppointments}
            </div>
        <div data-testid="error">
        {/* Missing some options. Please refill form above. */}
        </div>
    </div>
  );
}

export default Appointments;
