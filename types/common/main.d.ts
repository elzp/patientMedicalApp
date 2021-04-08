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