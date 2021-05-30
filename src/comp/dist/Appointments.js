"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Appointment_1 = require("./Appointment");
var react_select_1 = require("react-select"); //npm install --save @types/react-select
var react_datepicker_1 = require("react-datepicker"); // npm i react-datepicker  ;  npm i @types/react-datepicker
var axios_1 = require("axios");
require("./../App.css");
require("react-datepicker/dist/react-datepicker.css");
var somedata_json_1 = require("./../somedata.json");
function Appointments(props) {
    var value = props.value;
    var _a = react_1.useState(["none"]), selectedOption = _a[0], setSelectedOption = _a[1];
    var _b = react_1.useState(["none"]), selectedOption2 = _b[0], setSelectedOption2 = _b[1];
    var _c = react_1.useState(new Date()), startDate = _c[0], setStartDate = _c[1];
    var _d = react_1.useState(false), selectNameofDocVis = _d[0], setVisNameOfDoc = _d[1];
    var currentuser = props.userdata.currentuser;
    var pacientId = localStorage.getItem('id');
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
    function handleTypeDoctorSelect(e) {
        //sets array of doctor's names depending on chosen type of doctor
        var newnamesOfDoctorsInGroup = somedata_json_1["default"].doctors
            //getting object with value = value2
            .filter(function (item) { return item.value === (e === null || e === void 0 ? void 0 : e.label) || item.value === selectedOption[0]; })
            //retreving array allDoctors
            .map(function (item) { return item.allDoctors; });
        var newnamesOfDoctorsInGroup1 = newnamesOfDoctorsInGroup[0];
        var newnamesOfDoctorsInGroup2 = Object.values(newnamesOfDoctorsInGroup1).map(function (it, ind) {
            var value = "" + ind;
            var label = "" + it;
            return { value: value, label: label };
        }) //create array with values type: {value, label}.
            || namesOfDoctorsInGroup; //fix bug: not handling undefined or null
        setNamesOfDoctorsInGroup(function (namesOfDoctorsInGroup) { return newnamesOfDoctorsInGroup2; });
    }
    function handleVisOfDocSel() {
        setVisNameOfDoc(function (selectNameofDocVis) {
            var newselectNameofDocVis = selectNameofDocVis === false ? true : true;
            return newselectNameofDocVis;
        });
    }
    // server API code
    var visitApiAdress = "http://localhost:3001";
    function onSubmit(e) {
        e.preventDefault();
        // saving data from form to .json file
        axios_1["default"]
            .post(visitApiAdress + "/newVisit", { id: pacientId, type: selectedOption[0], name: selectedOption2[0], time: startDate })
            .then(function (res) { return console.log('data was send', res); })["catch"](function (err) {
            console.error(err);
        });
    }
    //set default value of variable pacientVisitsData
    var _f = react_1.useState({ "id": pacientId, "visits": [] }), pacientVisitsData = _f[0], setpacientVisitsData = _f[1];
    // set current data in pacientVisitsData from json file send from server
    function getdataFromFile() {
        axios_1["default"]
            .get(visitApiAdress + "/" + pacientId)
            .then(function (res) {
            //log in browser
            console.log('data was received', JSON.parse(res.data));
            var data = JSON.parse(res.data);
            setpacientVisitsData(function (pacientVisitsData) { return data; });
        })["catch"](function (err) {
            console.error(err);
        });
    }
    // refresh list of visits
    var _g = react_1.useState(false), ifRefresh = _g[0], setStatusIfRefresh = _g[1];
    react_1.useMemo(function () { getdataFromFile(); }, [ifRefresh]);
    function handleRefreshingVisits() {
        setStatusIfRefresh(!ifRefresh);
    }
    //  visibility list's of visits
    var _h = react_1.useState(false), visOfVisitsList = _h[0], setVisOfVisitsList = _h[1];
    function handleVisOfVisitsList() { setVisOfVisitsList(!visOfVisitsList); }
    return (react_1["default"].createElement("div", { className: "appointment" },
        react_1["default"].createElement("div", { id: "welcome-section" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h1", { id: "title" },
                    "Add new Visit to your account (id:",
                    pacientId,
                    ").")),
            react_1["default"].createElement("h4", { id: "description" }, somedata_json_1["default"].desc.visits.instruction)),
        react_1["default"].createElement("form", { id: "survey-form", onSubmit: function (event) {
                onSubmit(event);
                handleRefreshingVisits(); //submitStatus()
            } },
            react_1["default"].createElement("div", { className: "div" },
                "Choose type of doctor:",
                react_1["default"].createElement("br", null)),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(react_select_1["default"] /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/, { options: newDoctors, onChange: function (e) {
                        handleTypeDoctorSelect(e); //set array of doctors
                        handleDoctorSelect(e); //set value of first select
                    }, onMenuClose: handleVisOfDocSel, value: newDoctors.find(function (option) {
                        return option.value === selectedOption[0];
                    }), label: "Single select" })),
            selectNameofDocVis && (react_1["default"].createElement("div", { className: "div" },
                " Choose your doctor/s:",
                react_1["default"].createElement("br", null),
                react_1["default"].createElement(react_select_1["default"] /*https://stackoverflow.com/questions/43250854/react-select-does-not-show-the-selected-value-in-the-field*/, { options: namesOfDoctorsInGroup, onChange: function (e) { return handleExactDoctorSelect(e); }, value: namesOfDoctorsInGroup.find(function (option) {
                        return option.value === selectedOption2[0];
                    }), label: "Single select" }))),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(react_datepicker_1["default"], { selected: startDate, onChange: function (date) { setStartDate(date); }, showTimeSelect: true, timeFormat: "HH:mm", timeIntervals: 15, timeCaption: "time", dateFormat: "MMMM d, yyyy h:mm aa" }),
            react_1["default"].createElement("div", { id: "button" },
                " ",
                react_1["default"].createElement("button", { id: "submit", type: "submit" }, "Submit"))),
        react_1["default"].createElement("button", { onClick: function () { return handleVisOfVisitsList(); } }, "Show My Appointments"),
        visOfVisitsList && (react_1["default"].createElement("div", null, pacientVisitsData.visits.map(function (it) { return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(Appointment_1["default"], { key: it.vizId, dataAboutAppointment: it, lengthofAllData: pacientVisitsData.visits.length }))); })))));
}
exports["default"] = Appointments;
