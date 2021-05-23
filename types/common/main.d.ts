type Styletype = {
    [name: string]: object, //https://stackoverflow.com/questions/39207048/how-to-define-object-of-objects-type-in-typescript
 };

interface Person {
    firstName: string;
    lastName: string;
    age: number;
}


interface adressObj {
    'street-type': string,
    street: string,
    buildingNr: number,
    localNr?: string | number,
    postCode: string | number,
    city: string,

}
interface footObj  {
    adress: adressObj,
    phone: string,
    email: string,
}
 

interface doctorsValue  {
    value: string,
    label: string,
}

interface doctorsNameValue{
    id: number;
    option: string;
    value: string;
    allDoctors: {
        "0"?: string;
        "1"?: string;
    }
}


interface visit {
    "vizId": number,
    "type": string,
    "name": string,
    "time": Date | string
  }
  interface pacient {
    "id": number,
      "visits": Array<visit> | []
  }
  