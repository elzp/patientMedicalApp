import React, { useState, useMemo } from 'react';
import Appointment from './Appointment';
import './../App.css';


export default function AppointmentsViewer(props: any ) {
    const {pacientVisitsData} = props.pacientVisitsData;
    //  visibility list's of visits
    const [visOfVisitsList, setVisOfVisitsList] = useState(false) 

    const handleVisOfVisitsList = () => { setVisOfVisitsList(!visOfVisitsList)}

  return (
    <div className="AppointmentsViewer">
        <button data-testid="buttonToShowAppointment" onClick={handleVisOfVisitsList}>Show My Appointments</button>
        <div data-testid="list of saved appointments">
            {visOfVisitsList && props.listOfSavedAppointments}
        </div>
    </div>
  );
}


