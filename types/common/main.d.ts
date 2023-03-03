export type Styletype = {
    [name: string]: object, //https://stackoverflow.com/questions/39207048/how-to-define-object-of-objects-type-in-typescript
 };

 export interface Person {
    firstName: string;
    lastName: string;
    age: number;
}


export interface adressObj {
    'street-type': string,
    street: string,
    buildingNr: number,
    localNr?: string | number,
    postCode: string | number,
    city: string,

}
export interface footObj  {
    adress: adressObj,
    phone: string,
    email: string,
}
 

export interface doctorsValue  {
    value: string,
    label: string,
}

export interface doctorsNameValue{
    id: number;
    option: string;
    value: string;
    allDoctors: {
        "0"?: string;
        "1"?: string;
    }
}


export interface visit {
    "vizId": number,
    "type": string,
    "name": string,
    "time": Date | string
  }
  export  interface pacient {
    "id": number,
      "visits": Array<visit> | []
  }
  
  export  interface typeuserdata {
      currentuser: {pacientId:  string,
        pacientUsername:string ,
        isLogin: boolean | string
    }
    }