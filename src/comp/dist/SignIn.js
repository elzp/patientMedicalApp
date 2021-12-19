"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = require("react");
var LogForm_1 = require("./LogForm");
require("./../App.css");
var axios_1 = require("axios");
var usersdata_json_1 = require("../usersdata.json");
function SignIn(props) {
    var _a = react_1.useState(""), login2 = _a[0], setlogin = _a[1];
    var _b = react_1.useState(false), isLoginUnique = _b[0], setisLoginUnique = _b[1];
    var _c = react_1.useState(""), password = _c[0], setpass = _c[1];
    var _d = react_1.useState(false), isPasswordOk = _d[0], setisPasswordOk = _d[1];
    var _e = react_1.useState(""), email = _e[0], setEmail = _e[1];
    var _f = react_1.useState(false), isEmailUnique = _f[0], setisEmailUnique = _f[1];
    var _g = react_1.useState(false), showAccountPage = _g[0], setshowAccountPage = _g[1];
    var _h = react_1.useState({ "login": "", "email": "" }), error = _h[0], setError = _h[1];
    // defaultuser={currentuser: {
    //     pacientId: "-5",
    //     pacientUsername: "",
    //     isLogin: false
    //   }
    // }
    // const { currentuser } = props.defaultuser;
    // const newdefaultuser = [currentuser.pacientId, currentuser.pacientUsername, currentuser.isLogin, ""];
    // preparing users data from json file to use for authorification
    var sth3 = Object.entries(usersdata_json_1["default"]).map(function (it) {
        var neww = [it[0],
            Object.entries(it[1])[0][1],
            Object.entries(it[1])[2][1],
            Object.entries(it[1])[1][1] //password
        ];
        return neww;
    });
    function changeofError(errorStatus, indexOfMessage, errorType) {
        var _a, _b;
        var textOfMessages = [
            "Another user is using this name. Choose another username.",
            "This e-mail adress was used before. ",
        ];
        if (errorStatus === true) {
            var newBadError_1 = __assign(__assign({}, error), (_a = {}, _a[errorType] = textOfMessages[indexOfMessage], _a));
            setError(function (error) { return newBadError_1; });
        }
        else {
            var newGoodError_1 = __assign(__assign({}, error), (_b = {}, _b[errorType] = "", _b));
            setError(function (error) { return newGoodError_1; });
        }
    }
    function handleChangeofError(errorStatus, errorType) {
        switch (errorType) {
            case "username":
                changeofError(errorStatus, 0, errorType);
                break;
            case "email":
                changeofError(errorStatus, 1, errorType);
                break;
        }
    }
    function validateUniqueness(valueFromInputToValidate, previousValue, APIstring, 
    // previousIsValueUnique: boolean,
    typeOfValue, isUniqueSetter) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(valueFromInputToValidate !== "" && valueFromInputToValidate !== previousValue)) return [3 /*break*/, 2];
                        //send to server new username to check if is unique
                        return [4 /*yield*/, axios_1["default"]
                                .post("http://localhost:3001/" + APIstring, (_a = {}, _a[typeOfValue] = valueFromInputToValidate, _a))
                                .then(function (res) {
                                //save in react getted response about if username was used in database is unique(=true)
                                isUniqueSetter(function () { return JSON.parse(res.data); });
                                handleChangeofError(JSON.parse(res.data), typeOfValue);
                            })["catch"](function (err) {
                                console.error(err);
                            })];
                    case 1:
                        //send to server new username to check if is unique
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function validateinput(e, type, setterOfIfIsUnique) {
        if (setterOfIfIsUnique === void 0) { setterOfIfIsUnique = function () { }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                e.preventDefault();
                switch (type) {
                    case "username":
                        validateUniqueness(e.target.value, login2, "is" + type + "unique", "" + type, setterOfIfIsUnique);
                        // if(e.target.value !== "" && e.target.value !== login2) {//if something in login input has changed then...
                        // //send to server new username to check if is unique
                        // await axios
                        //   .post(`http://localhost:3001/isusernameunique`, {login2:e.target.value})
                        //     .then((res:any) => {
                        //       //save in react getted response about if username was used in database is unique(=true)
                        //       setisLoginUnique(isLoginUnique=>JSON.parse(res.data))
                        //       handleChangeofError(JSON.parse(res.data));
                        //     })
                        //     .catch((err: any) => {
                        //       console.error(err);
                        //     }); 
                        // }
                        break;
                    case "email":
                        validateUniqueness(e.target.value, email, "is" + type + "unique", "" + type, setterOfIfIsUnique);
                        break;
                    case "password":
                        // validate prenounciation of password
                        // if(/@|#|$|%|\^|&|\*|(|)|!|~/ig.test(password)){
                        //   setError(error=>"Your password shouldn't have sighs like: @,#.")
                        //   setisPasswordOk(isPasswordOk=>false)
                        // }else{
                        setisPasswordOk(function (isPasswordOk) { return true; });
                        // }
                        break;
                    default:
                }
                ;
                return [2 /*return*/];
            });
        });
    }
    function onChange(e, type) {
        switch (type) {
            case "username":
                // console.log('targetvaue: ',e.target.value, " ." )
                validateinput(e, type, setisLoginUnique);
                setlogin(function (login) { return e.target.value; });
                break;
            case "password":
                setpass(function (password) { return e.target.value; });
                validateinput(e, type);
                break;
            case "email":
                setEmail(function (email) { return e.target.value; });
                validateinput(e, type, setisEmailUnique);
                break;
        }
    }
    function onSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                e.preventDefault();
                return [2 /*return*/];
            });
        });
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(LogForm_1["default"], { name: "Singin as a new user", onSubmit: onSubmit, login: login2, password: password, onChange: onChange, error: error, label: "your username", additionalJSX: (react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", null, " e-mail: "),
                " ",
                react_1["default"].createElement("input", { value: email, onChange: function (e) { onChange(e, "email"); }, type: "text" }))) }),
        JSON.stringify(usersdata_json_1["default"]), login2 + "; password " + password,
        JSON.stringify([isLoginUnique, isPasswordOk]),
        JSON.stringify(/@|#|$|%|\^|&|\*|(|)|!|~/.test("%65"))
    ///[@#$%^&*()!~]
    ));
}
exports["default"] = SignIn;
