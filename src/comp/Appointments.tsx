import React, {useState, useMemo} from 'react';
import Appointment from './Appointment';
import AppointmentsViewer from './AppointmentsViewer';
import Select from 'react-select';//npm install --save @types/react-select
import DatePicker from "react-datepicker";// npm i react-datepicker  ;  npm i @types/react-datepicker
import './../App.css';
import "react-datepicker/dist/react-datepicker.css";
import data from './../somedata.json';
import { getdataFromFile, onSubmitAppointmentForm } from './srcfunctions';
import {visit} from './../../types/common/main.d'

export  function Appointments(props: any ) {
 const {value}: {value: number} = props;
const [selectedOption, setSelectedOption] = useState(["none"]);
const [selectedOption2, setSelectedOption2]:[undefined|string[], any ] = useState(["none"]);
const [startDate, setStartDate] = useState(new Date());
const [selectNameofDocVis, setVisNameOfDoc] = useState(false);
const [submitError, setSubmitError] = useState('');
const placeholder = "choose option";
const { currentuser } = props.userdata;
const pacientId  = props.userdata.currentuser.pacientId === "-5"? localStorage.getItem('id'): props.userdata.currentuser.pacientId;
//prepare data for forms to choose from
const newDoctors =
  data.doctors.map((item:any )=> { 
    let {option: value, value:label} = item;
    return {value, label};
});
const typesOfDoctors =  newDoctors.map(it => it.label)

const DataAboutDoctors = 
data.doctors.map((item:any )=> { 
  let {option: value, value:label, allDoctors: allDoctors} = item;
  const optionsToSecondSelect = Object.entries(allDoctors).map((it:any, ind:any) =>{ 
 
    return { "value": `${ind}`, "label":`${it[1]}` };})

  return optionsToSecondSelect//{"type": label, "docs": optionsToSecondSelect}// {"label":label, "docs": optionsToSecondSelect};
});
const NamesOfDoctors = //prepare data in format {value label}.
  data.doctors.map((item:any )=> { 
    let {option: value, value:label} = item;
    return {value, label};
});
const defaultValueDoctorsGroup = [{value:"choose Type of doctor", label:"choose Type of doctor2"}];
const [namesOfDoctorsInGroup, setNamesOfDoctorsInGroup] = useState(defaultValueDoctorsGroup);


function  handleTypeDoctorSelect(e:any| null | void){ //asynchronous function

  const idOfChoosenDoctorType = typesOfDoctors.indexOf(e?.label);
  const NamesOfDocsInTypeOf = DataAboutDoctors[idOfChoosenDoctorType]
  setNamesOfDoctorsInGroup(namesOfDoctorsInGroup => NamesOfDocsInTypeOf);
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
const idUserAPI = `${visitApiAdress}/${Number(JSON.parse(pacientId))}`
const postFormUrl = `${visitApiAdress}/user/newVisit/${Number(JSON.parse(pacientId))}`
const postDataFromForm = {id:pacientId, type: selectedOption[0],name: selectedOption2[0], time:startDate}
// function onSubmitAppointmentForm  was moved to srcfunctions.ts.

//set default value of variable pacientVisitsData
const [pacientVisitsData, setpacientVisitsData] =useState({ "id": pacientId, "visits": []});

// set current data in pacientVisitsData from json file send from server
// function getdataFromFile was moved to srcfunctions.ts.


// refresh list of visits
const [ifRefresh, setStatusIfRefresh] = useState(false)
React.useEffect(()=> {
  getdataFromFile(idUserAPI, setpacientVisitsData,pacientVisitsData ); 
}, [ifRefresh])


function handleRefreshingVisits(){
  setStatusIfRefresh(!ifRefresh);
}


const listOfSavedAppointments = pacientVisitsData.visits.length === 0 ? 
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
    <div id='welcome-section-title'><h1 id="title">Add new Visit to your account (id:{pacientId}).</h1></div>
    <div className="form-section">
    <form id="survey-form" onSubmit={(event)=>{
        event.preventDefault();
      (()=>{
        const cos = onSubmitAppointmentForm(postFormUrl, postDataFromForm, 'data from form was send'); 
        setSubmitError(cos)
      handleRefreshingVisits()//submitStatus()
      setSelectedOption([""]);
      setSelectedOption2([""]);})();
    }}>   
    {/* wybrana opcja w 1: {JSON.stringify(selectedOption)} ------  <br /> 
         grupa lekarzy: {JSON.stringify(namesOfDoctorsInGroup)} -----<br /> 
          wybrana opcja w 2: {JSON.stringify(selectedOption2)} */}
     <div className="div">Choose type of doctor:</div>
       <div>       
         <Select /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/
        options={newDoctors}
        onChange={(e)=>{//https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs (multiple action functions)
          handleTypeDoctorSelect(e);//set array of doctors
          setSelectedOption([ e?.label]);//sets selected value of doctors' type
          } 
        }
        onMenuClose ={handleVisOfDocSel}
        value={newDoctors.find(function(option:any) {
          return option.value === selectedOption[0];
        })}
        // label="Single select"
        placeholder={placeholder}
      />
    </div>
     
   { selectNameofDocVis && (
   <div className="div"> Choose your doctor/s:<br/>
     <Select /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/
        options={namesOfDoctorsInGroup}
        onChange={e=>setSelectedOption2([e?.label])} //sets selected value of doctor's name and surname
        value={namesOfDoctorsInGroup.find(function(option) {
          return option.value === selectedOption2[0];
        })}
        // label="Single select"
        placeholder={placeholder}
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
      <div id="description">
        {data.desc.visits.instruction.map((item, index)=>(<div key={item}>{index + 1}. {item}</div>))}       
      </div>
      </div>
      <div id="error">{submitError}</div>
      <AppointmentsViewer 
        pacientVisitsData={pacientVisitsData} 
        listOfSavedAppointments={listOfSavedAppointments}
      />
    </div>
  );
}

// export default Appointments;
