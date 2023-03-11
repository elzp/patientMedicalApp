"use strict";
exports.__esModule = true;
exports.Appointments = void 0;
var react_1 = require("react");
var Appointment_1 = require("./Appointment");
var react_select_1 = require("react-select"); //npm install --save @types/react-select
var react_datepicker_1 = require("react-datepicker"); // npm i react-datepicker  ;  npm i @types/react-datepicker
require("./../App.css");
require("react-datepicker/dist/react-datepicker.css");
var somedata_json_1 = require("./../somedata.json");
var srcfunctions_1 = require("./srcfunctions");
function Appointments(props) {
    var value = props.value;
    var _a = react_1.useState(["none"]), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = react_1.useState(["none"]), selectedOption2 = _b[0], setSelectedOption2 = _b[1];
    var _c = react_1.useState(new Date()), startDate = _c[0], setStartDate = _c[1];
    var _d = react_1.useState(false), selectNameofDocVis = _d[0], setVisNameOfDoc = _d[1];
    var placeholder = "choose option";
    var currentuser = props.userdata.currentuser;
    var pacientId = props.userdata.currentuser.pacientId === "-5" ? localStorage.getItem('id') : props.userdata.currentuser.pacientId;
    //prepare data for forms to choose from
    var newDoctors = somedata_json_1["default"].doctors.map(function (item) {
        var value = item.option, label = item.value;
        return { value: value, label: label };
    });
    var typesOfDoctors = newDoctors.map(function (it) { return it.label; });
    var DataAboutDoctors = somedata_json_1["default"].doctors.map(function (item) {
        var value = item.option, label = item.value, allDoctors = item.allDoctors;
        var optionsToSecondSelect = Object.entries(allDoctors).map(function (it, ind) {
            return { "value": "" + ind, "label": "" + it[1] };
        });
        return optionsToSecondSelect; //{"type": label, "docs": optionsToSecondSelect}// {"label":label, "docs": optionsToSecondSelect};
    });
    var NamesOfDoctors = //prepare data in format {value label}.
     somedata_json_1["default"].doctors.map(function (item) {
        var value = item.option, label = item.value;
        return { value: value, label: label };
    });
    var defaultValueDoctorsGroup = [{ value: "choose Type of doctor", label: "choose Type of doctor2" }];
    var _e = react_1.useState(defaultValueDoctorsGroup), namesOfDoctorsInGroup = _e[0], setNamesOfDoctorsInGroup = _e[1];
    function handleTypeDoctorSelect(e) {
        var idOfChoosenDoctorType = typesOfDoctors.indexOf(e === null || e === void 0 ? void 0 : e.label);
        var NamesOfDocsInTypeOf = DataAboutDoctors[idOfChoosenDoctorType];
        setNamesOfDoctorsInGroup(function (namesOfDoctorsInGroup) { return NamesOfDocsInTypeOf; });
    }
    function handleVisOfDocSel() {
        setVisNameOfDoc(function (selectNameofDocVis) {
            var newselectNameofDocVis = selectNameofDocVis === false ? true : true;
            return newselectNameofDocVis;
        });
    }
    // server API code
    var visitApiAdress = "http://localhost:3001";
    var idUserAPI = visitApiAdress + "/" + pacientId;
    var postFormUrl = visitApiAdress + "/newVisit";
    var postDataFromForm = { id: pacientId, type: selectedOption[0], name: selectedOption2[0], time: startDate };
    // function onSubmitAppointmentForm  was moved to srcfunctions.ts.
    //set default value of variable pacientVisitsData
    var _f = react_1.useState({ "id": pacientId, "visits": [] }), pacientVisitsData = _f[0], setpacientVisitsData = _f[1];
    // set current data in pacientVisitsData from json file send from server
    // function getdataFromFile was moved to srcfunctions.ts.
    // refresh list of visits
    var _g = react_1.useState(false), ifRefresh = _g[0], setStatusIfRefresh = _g[1];
    react_1.useMemo(function () { srcfunctions_1.getdataFromFile(idUserAPI, setpacientVisitsData, pacientVisitsData); }, [ifRefresh]);
    function handleRefreshingVisits() {
        setStatusIfRefresh(!ifRefresh);
    }
    //  visibility list's of visits
    var _h = react_1.useState(false), visOfVisitsList = _h[0], setVisOfVisitsList = _h[1];
    function handleVisOfVisitsList() { setVisOfVisitsList(!visOfVisitsList); }
    var listOfSavedAppointments = pacientVisitsData.visits.length === 0 ?
        "Missing some options. Please refill form above." :
        pacientVisitsData.visits.map(function (it) { return (react_1["default"].createElement("div", { key: it.vizId },
            react_1["default"].createElement(Appointment_1["default"], { key: it.vizId, dataAboutAppointment: it, lengthofAllData: pacientVisitsData.visits.length }))); });
    return (react_1["default"].createElement("div", { className: "appointment" },
        react_1["default"].createElement("div", { id: 'welcome-section-title' },
            react_1["default"].createElement("h1", { id: "title" },
                "Add new Visit to your account (id:",
                pacientId,
                ").")),
        react_1["default"].createElement("div", { className: "form-section" },
            react_1["default"].createElement("form", { id: "survey-form", onSubmit: function (event) {
                    (function () {
                        srcfunctions_1.onSubmitAppointmentForm(event, postFormUrl, postDataFromForm, 'data from form was send');
                        handleRefreshingVisits(); //submitStatus()
                        setSelectedOption([""]);
                        setSelectedOption2([""]);
                    });
                } },
                react_1["default"].createElement("div", { className: "div" }, "Choose type of doctor:"),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(react_select_1["default"] /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/, { options: newDoctors, onChange: function (e) {
                            handleTypeDoctorSelect(e); //set array of doctors
                            setSelectedOption([e === null || e === void 0 ? void 0 : e.label]); //sets selected value of doctors' type
                        }, onMenuClose: handleVisOfDocSel, value: newDoctors.find(function (option) {
                            return option.value === selectedOption[0];
                        }), 
                        // label="Single select"
                        placeholder: placeholder })),
                selectNameofDocVis && (react_1["default"].createElement("div", { className: "div" },
                    " Choose your doctor/s:",
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement(react_select_1["default"] /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/, { options: namesOfDoctorsInGroup, onChange: function (e) { return setSelectedOption2([e === null || e === void 0 ? void 0 : e.label]); }, value: namesOfDoctorsInGroup.find(function (option) {
                            return option.value === selectedOption2[0];
                        }), 
                        // label="Single select"
                        placeholder: placeholder }))),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement(react_datepicker_1["default"], { selected: startDate, onChange: function (date) { setStartDate(date); }, showTimeSelect: true, timeFormat: "HH:mm", timeIntervals: 15, timeCaption: "time", dateFormat: "MMMM d, yyyy h:mm aa" }),
                react_1["default"].createElement("div", { id: "button" },
                    " ",
                    react_1["default"].createElement("button", { id: "submit", type: "submit" }, "Submit"))),
            react_1["default"].createElement("div", { id: "description" }, somedata_json_1["default"].desc.visits.instruction.map(function (item, index) { return (react_1["default"].createElement("div", null,
                index + 1,
                ". ",
                item)); }))),
        react_1["default"].createElement("button", { "data-testid": "buttonToShowAppointment", onClick: function () { return handleVisOfVisitsList(); } }, "Show My Appointments"),
        react_1["default"].createElement("div", { "data-testid": "list of saved apponntments" }, visOfVisitsList && listOfSavedAppointments),
        react_1["default"].createElement("div", { "data-testid": "error" })));
}
exports.Appointments = Appointments;
// export default Appointments;
