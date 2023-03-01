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
var react_1 = require("react");
var Appointment_1 = require("./Appointment");
var react_select_1 = require("react-select"); //npm install --save @types/react-select
var react_datepicker_1 = require("react-datepicker"); // npm i react-datepicker  ;  npm i @types/react-datepicker
var functions_1 = require("../dist/functions");
require("./../App.css");
require("react-datepicker/dist/react-datepicker.css");
var somedata_json_1 = require("./../somedata.json");
function Appointments(props) {
    var value = props.value;
    var _a = react_1.useState(["none"]), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = react_1.useState(["none"]), selectedOption2 = _b[0], setSelectedOption2 = _b[1];
    var _c = react_1.useState(new Date()), startDate = _c[0], setStartDate = _c[1];
    var _d = react_1.useState(false), selectNameofDocVis = _d[0], setVisNameOfDoc = _d[1];
    var newDoctors = somedata_json_1["default"].doctors.map(function (item) {
        var value = item.option, label = item.value;
        return { value: value, label: label };
    });
    var NamesOfDoctors = //prepare data in format {value label}.
     somedata_json_1["default"].doctors.map(function (item) {
        var value = item.option, label = item.value;
        return { value: value, label: label };
    });
    var defaultValueDoctorsGroup = [{ value: "choose Type of doctor", label: "choose Type of doctor2" }];
    var _e = react_1.useState(defaultValueDoctorsGroup), namesOfDoctorsInGroup = _e[0], setNamesOfDoctorsInGroup = _e[1];
    var handleDoctorSelect = function (e) {
        setSelectedOption([e === null || e === void 0 ? void 0 : e.label]);
        //  handleTypeDoctorSelect(JSON.stringify(e));
    };
    var handleExactDoctorSelect = function (e) {
        setSelectedOption2([e === null || e === void 0 ? void 0 : e.label]);
    };
    function first() {
        return new Promise(function () {
            return somedata_json_1["default"].doctors
                //getting object with value = value2
                .filter(function (item) { return item.value === selectedOption[0]; })
                //retreving array allDoctors
                .map(function (item) { return item.allDoctors; });
        });
    }
    function handleTypeDoctorSelect() {
        return __awaiter(this, void 0, void 0, function () {
            var newnamesOfDoctorsInGroup, newnamesOfDoctorsInGroup1, newnamesOfDoctorsInGroup2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, first()];
                    case 1:
                        newnamesOfDoctorsInGroup = _a.sent();
                        newnamesOfDoctorsInGroup1 = newnamesOfDoctorsInGroup[0];
                        newnamesOfDoctorsInGroup2 = Object.values(newnamesOfDoctorsInGroup1).map(function (it, ind) {
                            var value = "" + ind;
                            var label = "" + it;
                            return { value: value, label: label };
                        }) //create array with values type: {value, label}.
                            || namesOfDoctorsInGroup;
                        setNamesOfDoctorsInGroup(function (namesOfDoctorsInGroup) { return newnamesOfDoctorsInGroup2; });
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleVisOfDocSel() {
        setVisNameOfDoc(function (selectNameofDocVis) { return !selectNameofDocVis; });
    }
    function beforeVisOfsecondSelect() {
        return new Promise(function () {
            return handleTypeDoctorSelect();
        });
    }
    return (react_1["default"].createElement("div", { className: "appointment" },
        react_1["default"].createElement("p", null,
            " This is new appointment ",
            JSON.stringify(value),
            "."),
        react_1["default"].createElement(Appointment_1["default"], { noOfAppointment: value }),
        react_1["default"].createElement(react_datepicker_1["default"], { selected: startDate, onChange: function (date) { setStartDate(date); }, showTimeSelect: true, timeFormat: "HH:mm", timeIntervals: 15, timeCaption: "time", dateFormat: "MMMM d, yyyy h:mm aa" }),
        react_1["default"].createElement("div", { id: "welcome-section" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h1", { id: "title" }, "Help us inprove!")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("p", { id: "description" }, "Thank you for your supprot and choosing us to learn new skills. Please take a quick qiuestionnaire. And help us improve ourself."))),
        react_1["default"].createElement("form", { id: "survey-form" //action="/submit-data"
         },
            "wybrana opcja w 1: ",
            JSON.stringify(selectedOption),
            " ------  ",
            react_1["default"].createElement("br", null),
            "grupa lekarzy: ",
            JSON.stringify(namesOfDoctorsInGroup),
            " -----",
            react_1["default"].createElement("br", null),
            "wybrana opcja w 2: ",
            JSON.stringify(selectedOption2),
            react_1["default"].createElement("div", { className: "div" },
                "Choose type of doctor:",
                react_1["default"].createElement("br", null)),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(react_select_1["default"] /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/, { options: newDoctors, onChange: function (e) {
                        handleDoctorSelect(e);
                        beforeVisOfsecondSelect().then(function () { return console.log("all is set"); }).then(function () { return handleVisOfDocSel(); });
                    }, value: newDoctors.find(function (option) {
                        return option.value === selectedOption[0];
                    }) })),
            selectNameofDocVis && (react_1["default"].createElement("div", { className: "div" },
                " Choose your doctor/s:",
                react_1["default"].createElement("br", null),
                react_1["default"].createElement(react_select_1["default"] /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/, { options: namesOfDoctorsInGroup, onChange: function (e) { return handleExactDoctorSelect(e); }, value: namesOfDoctorsInGroup.find(function (option) {
                        return option.value === selectedOption2[0];
                    }) }))),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("div", { id: "button" },
                " ",
                react_1["default"].createElement("button", { id: "submit" //type="submit" 
                    , onClick: function () { return functions_1.updateAppoinments(selectedOption[0], selectedOption2[0], startDate); } }, "Submit")))));
}
exports["default"] = Appointments;
