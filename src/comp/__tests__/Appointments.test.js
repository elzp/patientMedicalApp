import Appointments from './../Appointments';
import react from "react";
import { render, cleanup, fireEvent, findByTestId} from '@testing-library/react';
import {handleChangeOfUser} from './../srcfunctions'

afterEach(cleanup)
const defuser  = {
    currentuser: {pacientId: "-5",
                  pacientUsername: "",
                  isLogin: false}
};
const loggedUser  = {
    currentuser: {pacientId: "3", //currently logged user with > no saved appointments.
                  pacientUsername: "sht",
                  isLogin: true}
};
afterEach(cleanup)
test("Appointments renders", async () =>{
         
    const {queryByTestId} = await render(<Appointments userdata ={loggedUser} changeuser={''} defaultuser={defuser} />);
    await expect(queryByTestId("error")).toHaveTextContent("Missing some options. Please refill form above.")
})

 test("onSubmitAppointmentForm should not posting empty data", async () =>{

     
     const {queryByTestId, getByTestId} = await render(<Appointments userdata ={loggedUser} changeuser={''} defaultuser={defuser} />);

// // fireEvent(
// //     queryByTestId("buttonToShowAppointment"),
// //     new MouseEvent('click'), { 
// //     bubbles: true,
// //     cancelable: true,
// //   }
// //   )
 const cos =  await queryByTestId("list of saved apponntments")
  expect(cos).toBeInTheDocument()
//    // await queryByTestId("buttonToShowAppointment").simulate('click');
//     //const divWithError = await queryByTestId("list of saved apponntments");
//     //expect(divWithError).toHaveTextContent("You did't make any appointments.")
 })



// Your component
// const MyButton = ({ label, onClick }) => (
//     <button type='button' onClick={onClick}>{label}</button>
//   )
  
//   // Your test
//   describe('<MyButton/>', () => {
//     test('should call onClick callback', () => {
//       const onClick = jest.fn();
//       const wrapper = shallow(<MyButton onClick={onClick}/>);
//       wrapper.simulate('click');
//       expect(onClick).toHaveBeenCalled();
//     });
//   });

