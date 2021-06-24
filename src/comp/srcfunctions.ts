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

