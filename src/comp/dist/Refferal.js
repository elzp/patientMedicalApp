"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
function Refferal(props) {
    var nr = props.noOfAppointment;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("p", null,
            " Refferal from appointment number ",
            nr,
            ".")));
}
exports["default"] = Refferal;
