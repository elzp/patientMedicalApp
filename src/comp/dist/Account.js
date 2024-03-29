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
exports.Account = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var srcfunctions_1 = require("./srcfunctions");
var srcfunctions_2 = require("./srcfunctions");
var Appointment_1 = require("./Appointment");
var AppointmentsViewer_1 = require("./AppointmentsViewer");
require("./../App.css");
var axios_1 = require("axios");
function Account(props) {
    var _this = this;
    var value = props.value;
    var currentuser = props.userdata.currentuser;
    var pacientId = localStorage.getItem('id');
    //  //const {appointment} : {appointment: object} = props.styles;
    // server API code
    var visitApiAdress = "http://localhost:3001";
    var _a = react_1.useState(false), redirect = _a[0], setRedirect = _a[1];
    var handleClick = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    url = (visitApiAdress + "/user/logout/" + pacientId).replace(/\"/g, '');
                    return [4 /*yield*/, axios_1["default"]
                            .post(url, {})
                            .then(function (res) {
                            srcfunctions_1.handleLogout(props.defaultuser, props.changeuser, props.userdata);
                            setRedirect(JSON.parse(res.data));
                        })["catch"](function (err) {
                            console.error(err);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var _b = react_1.useState({ "id": pacientId, "visits": [] }), pacientVisitsData = _b[0], setpacientVisitsData = _b[1];
    var listOfSavedAppointments = pacientVisitsData.visits.length === 0 ?
        "Missing some options. Please refill form above." :
        pacientVisitsData.visits.map(function (it) { return (react_1["default"].createElement("div", { key: it.vizId },
            react_1["default"].createElement(Appointment_1["default"], { key: it.vizId, dataAboutAppointment: it, lengthofAllData: pacientVisitsData.visits.length }))); });
    var idUserAPI = visitApiAdress + "/" + Number(JSON.parse(("" + pacientId).replace(/\"/g, '')));
    react_1["default"].useEffect(function () {
        srcfunctions_2.getdataFromFile(idUserAPI, setpacientVisitsData, pacientVisitsData);
    }, []);
    if (redirect) {
        return react_1["default"].createElement(react_router_dom_1.Navigate, { replace: true, to: "/" });
    }
    else {
        return (react_1["default"].createElement("div", { className: "account" },
            react_1["default"].createElement("h3", null,
                "Welcome ",
                localStorage.getItem('nameOfLogin'),
                "."),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(react_router_dom_1.Link, { reloadDocument: true, to: '/' },
                    react_1["default"].createElement("button", { onClick: function (e) { return handleClick(e); } }, "LOGOUT"))),
            react_1["default"].createElement(AppointmentsViewer_1["default"], { pacientVisitsData: pacientVisitsData, listOfSavedAppointments: listOfSavedAppointments })));
    }
}
exports.Account = Account;
