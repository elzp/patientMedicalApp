"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
function AppointmentsViewer(props) {
    var pacientVisitsData = props.pacientVisitsData.pacientVisitsData;
    //  visibility list's of visits
    var _a = react_1.useState(false), visOfVisitsList = _a[0], setVisOfVisitsList = _a[1];
    var handleVisOfVisitsList = function () { setVisOfVisitsList(!visOfVisitsList); };
    return (react_1["default"].createElement("div", { className: "AppointmentsViewer" },
        react_1["default"].createElement("button", { "data-testid": "buttonToShowAppointment", onClick: handleVisOfVisitsList }, "Show My Appointments"),
        react_1["default"].createElement("div", { "data-testid": "list of saved appointments" }, visOfVisitsList && props.listOfSavedAppointments)));
}
exports["default"] = AppointmentsViewer;
