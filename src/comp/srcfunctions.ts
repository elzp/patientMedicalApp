import axios from 'axios';


export function getdataFromFile(urlAPI:string, reactsetcallback:React.Dispatch<any>, parameter: any){
    axios
    .get(`${urlAPI}`)
    .then((res:any) => {
    //log in browser
    console.log('data was received', JSON.parse(res.data))
    const data = JSON.parse(res.data);
    reactsetcallback((parameter: any)=>data)
    //setpacientVisitsData(pacientVisitsData => data)
    }
  )
  .catch((err: any) => {
    console.error(err);
  });
  }


  //MAKE REDIRECTING only to start, login and sing up when user is not login. <- VI.2021 - works.   
export function handleChangeOfUser(newlogin: string, newid: string, status: boolean,
  callbackdispatchingFnc: React.Dispatch<React.SetStateAction<typeuserdata>>, stateOfActualVar: any){
  const newuser = {
    currentuser: {pacientId: newid,
                pacientUsername: newlogin,
                isLogin: true}
}
  localStorage.setItem('nameOfLogin', `${newuser.currentuser.pacientUsername}`);
  localStorage.setItem('isLogin', `${newuser.currentuser.isLogin}`);
  localStorage.setItem('id', `${newuser.currentuser.pacientId}`);
  callbackdispatchingFnc(stateOfActualVar=>newuser)
  
  console.log(`handleChangeOfUser was used and updated ${newlogin} `)
}

export function handleLogout(defaultUser:typeuserdata,callbackdispatchingFnc: React.Dispatch<React.SetStateAction<typeuserdata>>,userdata:any){//NOT WORKING <- 26-06-2021 it's working now.

  callbackdispatchingFnc(userdata=>defaultUser)
  localStorage.setItem('nameOfLogin', `${defaultUser.currentuser.pacientUsername}`);
  localStorage.setItem('isLogin', `${defaultUser.currentuser.isLogin}`);
  localStorage.setItem('id', `${defaultUser.currentuser.pacientId}`);
  console.log("User was log out.")
}

export function chooseChildComponent(
  arrayofAllJsxComponents: ((props: any) => JSX.Element)[] | undefined,
  pathname:string,
  data: Array<Array<string>>,
  compsForNotLogged: Array<string>,
){
  const arrayofNamesOfAllJsxMenuComponents = data.map(it=> {return it[0];}) 

  if(arrayofAllJsxComponents === undefined){return undefined}

  for (let i=0; i < arrayofAllJsxComponents.length; i++)
    {
      if(pathname === "/"+ data[i][1]) {
      if(localStorage.getItem('isLogin')===null || localStorage.getItem('isLogin')!="true"){
        //if user of application  is not logged in 
        if(compsForNotLogged.some(it=>it===arrayofNamesOfAllJsxMenuComponents[i])){
        return arrayofAllJsxComponents[i];
      } 
      }else{
        return arrayofAllJsxComponents[i];
      } 
    }
  }
}


export  function onSubmitAppointmentForm(e: any| null | void, 
  urlPath: string, 
  dataToPost:any, 
  consoleLogInfoIferroNotAccured:string
  ) {
  e.preventDefault();
   // checking if data isn't empty

   
  //  if()
   // saving data from form to .json file
      axios
      .post(`${urlPath}`, dataToPost)
      .then((res:any) => console.log(`${consoleLogInfoIferroNotAccured}`, res))
      .catch((err: any) => {
        console.error(err);
      });

}