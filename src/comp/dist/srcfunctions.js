"use strict";
exports.__esModule = true;
exports.logout = exports.DSTshiftedHour = exports.onSubmitAppointmentForm = exports.chooseChildComponent = exports.handleLogout = exports.handleChangeOfUser = exports.getdataFromFile = void 0;
var axios_1 = require("axios");
function getdataFromFile(urlAPI, reactsetcallback, parameter) {
    axios_1["default"]
        .get("" + urlAPI)
        .then(function (res) {
        //log in browser
        console.log('data was received', JSON.parse(res.data));
        var data = JSON.parse(res.data);
        reactsetcallback(function (parameter) { return data; });
        //setpacientVisitsData(pacientVisitsData => data)
    })["catch"](function (err) {
        console.error(err);
    });
}
exports.getdataFromFile = getdataFromFile;
//MAKE REDIRECTING only to start, login and sing up when user is not login. <- VI.2021 - works.   
function handleChangeOfUser(newlogin, newid, status, callbackdispatchingFnc, stateOfActualVar) {
    var newuser = {
        currentuser: { pacientId: newid,
            pacientUsername: newlogin,
            isLogin: true }
    };
    localStorage.setItem('nameOfLogin', "" + newuser.currentuser.pacientUsername);
    localStorage.setItem('isLogin', "" + newuser.currentuser.isLogin);
    localStorage.setItem('id', "" + newuser.currentuser.pacientId);
    callbackdispatchingFnc(function (stateOfActualVar) { return newuser; });
    console.log("handleChangeOfUser was used and updated " + newlogin + " ");
}
exports.handleChangeOfUser = handleChangeOfUser;
function handleLogout(defaultUser, callbackdispatchingFnc, userdata) {
    callbackdispatchingFnc(function (userdata) { return defaultUser; });
    localStorage.setItem('nameOfLogin', "" + defaultUser.currentuser.pacientUsername);
    localStorage.setItem('isLogin', "" + defaultUser.currentuser.isLogin);
    localStorage.setItem('id', "" + defaultUser.currentuser.pacientId);
    console.log("User was log out.");
}
exports.handleLogout = handleLogout;
function chooseChildComponent(arrayofAllJsxComponents, pathname, data, compsForNotLogged) {
    var arrayofNamesOfAllJsxMenuComponents = data.map(function (it) { return it[0]; });
    if (arrayofAllJsxComponents === undefined) {
        return undefined;
    }
    var _loop_1 = function (i) {
        if (pathname === "/" + data[i][1]) {
            if (localStorage.getItem('isLogin') === null || localStorage.getItem('isLogin') != "true") {
                //if user of application  is not logged in 
                if (compsForNotLogged.some(function (it) { return it === arrayofNamesOfAllJsxMenuComponents[i]; })) {
                    var chosenComponent = arrayofAllJsxComponents[i];
                    return { value: chosenComponent };
                }
            }
            else {
                var chosenComponent = arrayofAllJsxComponents[i];
                return { value: chosenComponent };
            }
        }
    };
    for (var i = 0; i < arrayofAllJsxComponents.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
exports.chooseChildComponent = chooseChildComponent;
function onSubmitAppointmentForm(e, urlPath, dataToPost, consoleLogInfoIferroNotAccured) {
    e.preventDefault();
    // checking if data isn't empty
    //  if()
    // saving data from form to .json file
    axios_1["default"]
        .post("" + urlPath, dataToPost)
        .then(function (res) { return console.log("" + consoleLogInfoIferroNotAccured, res); })["catch"](function (err) {
        console.error(err);
    });
}
exports.onSubmitAppointmentForm = onSubmitAppointmentForm;
////for displaying good hour of appoinments
// code from https://stackoverflow.com/questions/51345691/how-to-know-if-daylight-saving-time-was-on-a-specific-date-in-javascript
function stdTimezoneOffset(date) {
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
//-------------- dst  === daylight saving time
function DSTshiftedHour(date) {
    var actualOfset = date.getTimezoneOffset() - stdTimezoneOffset(date);
    return date.getHours() + (actualOfset) / 60;
}
exports.DSTshiftedHour = DSTshiftedHour;
//-------------- code to check if above functions works
var date = new Date(); //generate actual date
// console.log("date", date
// , "hours", date.getHours()
// , "offset", date.getTimezoneOffset(), stdTimezoneOffset(date)
// // , "actual hour", date.getHours() //- date.getTimezoneOffset()/60)
// // , "isDstObserved", date.isDstObserved()
// // ,"utc time", date.getUTCHours()
// // , date.toUTCString()
// , DSTshiftedHour(date)
// )
var date2 = date;
// date2.setHours
var date3 = new Date("2021-04-12T09:15:04.919Z");
date3.setHours(date.getHours());
// console.log("wiosenna data", date3, date3.getHours(), date3.getTimezoneOffset(), date3.stdTimezoneOffset(), date3.isDstObserved())
console.log("date", date3, "hours", date3.getHours(), "offset", date3.getTimezoneOffset(), stdTimezoneOffset(date3)
// , "actual hour", date3.getHours() //- date.getTimezoneOffset()/60)
// , "isDstObserved", date3.isDstObserved()
// ,"utc time", date3.getUTCHours()
// , date3.toUTCString()
, DSTshiftedHour(date3));
////////////////////////////////  
function logout() {
    localStorage.setItem('isLogin', 'false');
    localStorage.setItem('id', '');
    localStorage.setItem('nameOfLogin', '');
}
exports.logout = logout;
