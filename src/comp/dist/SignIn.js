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
exports.SignIn = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var LogForm_1 = require("./LogForm");
require("./../App.css");
var axios_1 = require("axios");
function SignIn(props) {
    var _a = react_1.useState(""), login2 = _a[0], setlogin = _a[1];
    var _b = react_1.useState(false), isLoginUnique = _b[0], setisLoginUnique = _b[1];
    var _c = react_1.useState(""), password = _c[0], setpass = _c[1];
    var _d = react_1.useState(false), isPasswordOk = _d[0], setisPasswordOk = _d[1];
    var _e = react_1.useState(false), showAccountPage = _e[0], setshowAccountPage = _e[1];
    var _f = react_1.useState(""), error = _f[0], setError = _f[1];
    var _g = react_1.useState(''), response = _g[0], setResponse = _g[1];
    var _h = react_1.useState(false), refresh = _h[0], setRefresh = _h[1];
    var currentuser = props.defaultuser.currentuser;
    var newdefaultuser = [currentuser.pacientId, currentuser.pacientUsername, currentuser.isLogin, ""];
    function validateinput(e, type, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = type;
                        switch (_a) {
                            case "log": return [3 /*break*/, 1];
                            case "pass": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        //send to server new username to check if is unique
                        setlogin(function (login) { return e.target.value; });
                        return [4 /*yield*/, axios_1["default"]
                                .post("http://localhost:3001/isusernameunique", { login2: value })
                                .then(function (res) {
                                //save in react getted response about if username was used in database is unique(=true)
                                if (login2 !== "") {
                                    if (JSON.parse(res.data) === false) {
                                        setError(function (error) { return "Another user is using this name. Choose another username."; });
                                        setisLoginUnique(function (isLoginUnique) { return JSON.parse(res.data); });
                                    }
                                    else {
                                        setError(function (error) { return ""; });
                                    }
                                    ;
                                }
                                ;
                                setisLoginUnique(function (isLoginUnique) { return JSON.parse(res.data); });
                            })["catch"](function (err) {
                                console.error(err);
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        // validate prenounciation of password
                        // if(/@|#|$|%|\^|&|\*|(|)|!|~/ig.test(password)){
                        //   setError(error=>"Your password shouldn't have sighs like: @,#.")
                        //   setisPasswordOk(isPasswordOk=>false)
                        // }else{
                        setisPasswordOk(function (isPasswordOk) { return true; });
                        setpass(function (password) { return e.target.value; });
                        // }
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    }
    function onChange(e, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!(type === "log")) return [3 /*break*/, 2];
                        console.log('validateinput', 'log');
                        return [4 /*yield*/, validateinput(e, "log", e.target.value)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, validateinput(e, "pass", e.target.value)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function postNewUser(urlPath, dataToPost, fnToSaveResponse) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        response = '';
                        return [4 /*yield*/, axios_1["default"]
                                .post("" + urlPath, dataToPost)
                                .then(function (res) {
                                response = JSON.stringify(res.data);
                                fnToSaveResponse(res.data);
                                console.log('JSON.stringify(res.data)', JSON.stringify(res.data));
                            })["catch"](function (err) {
                                console.error(err);
                                response = JSON.stringify(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    }
    function onSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var postUrl, NewUserData, goodError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, validateinput(e, "log", login2)];
                    case 1:
                        _a.sent();
                        postUrl = "http://localhost:3001/newUser";
                        NewUserData = { login: login2, password: password };
                        goodError = 'New user added.';
                        if (!(NewUserData.login !== "" && NewUserData.password !== "" && isLoginUnique && isPasswordOk)) return [3 /*break*/, 3];
                        return [4 /*yield*/, postNewUser(postUrl, NewUserData, setResponse)];
                    case 2:
                        _a.sent();
                        console.log(response);
                        setlogin("");
                        setpass("");
                        setisLoginUnique(false);
                        setisPasswordOk(false);
                        setRefresh(true);
                        return [3 /*break*/, 4];
                    case 3:
                        setResponse('undefined');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    if (refresh) {
        return react_1["default"].createElement(react_router_dom_1.Navigate, { replace: true, to: "/" });
    }
    else {
        return (react_1["default"].createElement("div", { className: 'log-sign-in' },
            react_1["default"].createElement(LogForm_1.LogForm, { name: "Singin as a new user", onSubmit: onSubmit, login: login2, password: password, onChange: onChange, error: error })));
    }
}
exports.SignIn = SignIn;
