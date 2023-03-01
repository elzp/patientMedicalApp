"use strict";
exports.__esModule = true;
exports.Refferals = void 0;
var react_1 = require("react");
// import Refferal from './Refferal';
require("./../App.css");
function Refferals(props) {
    var value = props.value;
    //const {appointment} : {appointment: object} = props.styles;
    return (react_1["default"].createElement("div", { className: "appointment" },
        react_1["default"].createElement("p", null,
            " This is new refferal ",
            JSON.stringify(value),
            ".")));
}
exports.Refferals = Refferals;
// export default Refferals;
