import axios from 'axios';
import {typeuserdata} from './../../types/common/main.d'


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
): ((props: any) => JSX.Element) | ((props: any) => JSX.Element) | undefined {
  const arrayofNamesOfAllJsxMenuComponents = data.map(it=> {return it[0];}) 

  if(arrayofAllJsxComponents === undefined){return undefined}

  for (let i=0; i < arrayofAllJsxComponents.length; i++)
    {
      if(pathname === "/"+ data[i][1]) {
      if(localStorage.getItem('isLogin')===null || localStorage.getItem('isLogin')!="true"){
        //if user of application  is not logged in 
        
        if(compsForNotLogged.some(it=>it===arrayofNamesOfAllJsxMenuComponents[i])){
          const chosenComponent = arrayofAllJsxComponents[i]
        return chosenComponent;
      } 
      }else{
        const chosenComponent = arrayofAllJsxComponents[i]
        return chosenComponent;
      } 
    }
  }
}


export  function onSubmitAppointmentForm( 
  urlPath: string, 
  dataToPost:any, 
  consoleLogInfoIferroNotAccured:string
  ) {
   // checking if data isn't empty   
   if(dataToPost.type === "" ||  dataToPost.name === "" || dataToPost.name === "none"){
    return "data about doctor not complite";
  } else {
   // saving data from form to .json file
      axios
      .post(`${urlPath}`, dataToPost)
      .then((res:any) => console.log(`${consoleLogInfoIferroNotAccured}`, res))
      .catch((err: any) => {
        console.error(err);
      });
      return "complete data was send"
  }
}


////for displaying good hour of appoinments

// code from https://stackoverflow.com/questions/51345691/how-to-know-if-daylight-saving-time-was-on-a-specific-date-in-javascript
function stdTimezoneOffset(date: Date) {
  var jan = new Date(date.getFullYear(), 0, 1);
  var jul = new Date(date.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }  
  
  //-------------- dst  === daylight saving time
  
  export function DSTshiftedHour(date: Date) {
      const actualOfset = date.getTimezoneOffset()-stdTimezoneOffset(date);
      return date.getHours()+(actualOfset)/60 ;
  }
      
  //-------------- code to check if above functions works
  const date = new Date() //generate actual date
  // console.log("date", date
  // , "hours", date.getHours()
  // , "offset", date.getTimezoneOffset(), stdTimezoneOffset(date)
  // // , "actual hour", date.getHours() //- date.getTimezoneOffset()/60)
  // // , "isDstObserved", date.isDstObserved()
  // // ,"utc time", date.getUTCHours()
  // // , date.toUTCString()
  // , DSTshiftedHour(date)
  // )
  const date2 = date;
  // date2.setHours
  const date3 = new Date("2021-04-12T09:15:04.919Z")
  date3.setHours(date.getHours())
  // console.log("wiosenna data", date3, date3.getHours(), date3.getTimezoneOffset(), date3.stdTimezoneOffset(), date3.isDstObserved())
  // console.log("date", date3
  // , "hours", date3.getHours()
  // , "offset", date3.getTimezoneOffset(), stdTimezoneOffset(date3)
  // // , "actual hour", date3.getHours() //- date.getTimezoneOffset()/60)
  // // , "isDstObserved", date3.isDstObserved()
  // // ,"utc time", date3.getUTCHours()
  // // , date3.toUTCString()
  // , DSTshiftedHour(date3)
  // )
  
////////////////////////////////  

export function logout(): void {
  localStorage.setItem('isLogin', 'false')
  localStorage.setItem('id', '')
  localStorage.setItem('nameOfLogin', '')
}