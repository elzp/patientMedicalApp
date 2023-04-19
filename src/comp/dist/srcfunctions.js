"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DSTshiftedHour = exports.onSubmitAppointmentForm = exports.chooseChildComponent = exports.handleLogout = exports.handleChangeOfUser = exports.getdataFromFile = void 0;
var axios_1 = require("axios");
function getdataFromFile(urlAPI, reactsetcallback, parameter) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"]
                        .get("" + urlAPI)
                        .then(function (res) {
                        //log in browser
                        console.log('data was received', JSON.parse(res.data));
                        var data = JSON.parse(res.data);
                        reactsetcallback(function (parameter) { return data; });
                        //setpacientVisitsData(pacientVisitsData => data)
                    })["catch"](function (err) {
                        console.error(err);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getdataFromFile = getdataFromFile;
//MAKE REDIRECTING only to start, login and sing up when user is not login. <- VI.2021 - works.   
function handleChangeOfUser(newlogin, newid, status, callbackdispatchingFnc) {
    var newuser = {
        currentuser: { pacientId: newid,
            pacientUsername: newlogin,
            isLogin: true }
    };
    localStorage.setItem('nameOfLogin', "" + newuser.currentuser.pacientUsername);
    localStorage.setItem('isLogin', "" + newuser.currentuser.isLogin);
    localStorage.setItem('id', "" + newuser.currentuser.pacientId);
    console.log("handleChangeOfUser was used and updated " + newlogin + " ");
}
exports.handleChangeOfUser = handleChangeOfUser;
function handleLogout(defaultUser, callbackdispatchingFnc, userdata) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            callbackdispatchingFnc(function (userdata) { return defaultUser; });
            localStorage.setItem('nameOfLogin', "" + defaultUser.currentuser.pacientUsername);
            localStorage.setItem('isLogin', "" + defaultUser.currentuser.isLogin);
            localStorage.setItem('id', "" + defaultUser.currentuser.pacientId);
            return [2 /*return*/];
        });
    });
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
function onSubmitAppointmentForm(urlPath, dataToPost, consoleLogInfoIferroNotAccured) {
    // checking if data isn't empty   
    if (dataToPost.type === "" || dataToPost.name === "" || dataToPost.name === "none") {
        return "data about doctor not complite";
    }
    else {
        // saving data from form to .json file
        axios_1["default"]
            .post("" + urlPath, dataToPost)
            .then(function (res) { return console.log("" + consoleLogInfoIferroNotAccured, res); })["catch"](function (err) {
            console.error(err);
        });
        return "complete data was send";
    }
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
// console.log("date", date3
// , "hours", date3.getHours()
// , "offset", date3.getTimezoneOffset(), stdTimezoneOffset(date3)
// // , "actual hour", date3.getHours() //- date.getTimezoneOffset()/60)
// // , "isDstObserved", date3.isDstObserved()
// // ,"utc time", date3.getUTCHours()
// // , date3.toUTCString()
// , DSTshiftedHour(date3)
// )
