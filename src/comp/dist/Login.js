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
exports.Login = void 0;
var react_1 = require("react");
var LogForm_1 = require("./LogForm");
require("./../App.css");
var srcfunctions_1 = require("./srcfunctions");
var react_router_dom_1 = require("react-router-dom");
var usersdata_json_1 = require("../usersdata.json");
function Login(props) {
    var _a = react_1.useState(""), login = _a[0], setlogin = _a[1];
    var _b = react_1.useState(""), password = _b[0], setpass = _b[1];
    var _c = react_1.useState(false), showAccountPage = _c[0], setshowAccountPage = _c[1];
    var _d = react_1.useState(""), error = _d[0], setError = _d[1];
    var changeuser = props.changeuser;
    var currentuser = props.defaultuser.currentuser;
    var newdefaultuser = [currentuser.pacientId, currentuser.pacientUsername, currentuser.isLogin, ""];
    // preparing users data from json file to use for authorification
    var sth3 = Object.entries(usersdata_json_1["default"]).map(function (it) {
        var neww = [it[0],
            Object.entries(it[1])[0][1],
            Object.entries(it[1])[2][1],
            Object.entries(it[1])[1][1] //password
        ];
        return neww;
    });
    function validateWithDataFromServer(log, pass) {
        // fn's which returns password for given login
        var sth4 = sth3.find(function (it) { return it[1] === log; });
        if (sth4 === undefined || sth4 === null) {
            return newdefaultuser;
        }
        else {
            if (sth4[3] === pass) {
                return sth4;
            }
            else {
                setError(function (error) { return "bad password"; });
                console.log(error);
                return newdefaultuser;
            }
        }
        // if(goodlogin===login && goodpassword === pass){
        //   return true;
        // }else {
        //   return false;
        // } 
    }
    function onChange(e, type) {
        if (type === "log") {
            setlogin(function (login) { return e.target.value; });
        }
        else {
            setpass(function (password) { return e.target.value; });
        }
    }
    function onSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var validation, newuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!(login.length > 0 && password.length > 0)) return [3 /*break*/, 6];
                        setError(function (error) { return ""; });
                        validation = validateWithDataFromServer(login, password);
                        return [4 /*yield*/, console.log(validation)];
                    case 1:
                        _a.sent();
                        if (!(validation === newdefaultuser)) return [3 /*break*/, 3];
                        setError(function (error) { return "Wrong login or password."; });
                        return [4 /*yield*/, console.log("error", error)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        newuser = { currentuser: { pacientId: validation[1],
                                pacientUsername: validation[0],
                                isLogin: validation[3] } };
                        return [4 /*yield*/, setError(function (error) { return "good login & password."; })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, console.log("error", error)];
                    case 5:
                        _a.sent();
                        srcfunctions_1.handleChangeOfUser(validation[1], validation[0], validation[3], props.changeuser, props.userdata);
                        changeuser(newuser);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    if (localStorage.getItem('isLogin') === "true") {
        react_router_dom_1.redirect("/");
        return (react_1["default"].createElement(react_1["default"].Fragment, null));
    }
    else {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(LogForm_1.LogForm, { name: "Login as user", onSubmit: onSubmit, login: login, password: password, onChange: onChange, error: error })));
    }
}
exports.Login = Login;
// export default Login;
