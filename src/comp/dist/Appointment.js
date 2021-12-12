"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
function Appointment(props) {
    //const {value}: {value: number} = props;
    //const {appointment} : {appointment: object} = props.styles;
    var data = props.dataAboutAppointment || {
        "vizId": 1,
        "type": "Gynecologist",
        "name": "dr green Gynecologist",
        "time": "2021-05-30T09:30:00.000Z"
    };
    var vizId = data.vizId, type = data.type, name = data.name, time = data.time;
    return (react_1["default"].createElement("div", { className: "appointment" },
        react_1["default"].createElement("p", null,
            vizId + 1,
            " appointment with ",
            type,
            ", dr ",
            react_1["default"].createElement("b", null, name),
            "."),
        react_1["default"].createElement("p", null,
            "Date:  ",
            time.substr(0, 10),
            "."),
        react_1["default"].createElement("p", null,
            "Time:  ",
            time.substr(11, 5),
            ".")));
}
exports["default"] = Appointment;
