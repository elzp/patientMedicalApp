"use strict";
exports.__esModule = true;
exports.Result = void 0;
var react_1 = require("react");
require("./../App.css");
function Result(props) {
    var value = props.value;
    //const {appointment} : {appointment: object} = props.styles;
    return (react_1["default"].createElement("div", { className: "appointment" },
        react_1["default"].createElement("p", null,
            " This is new Result ",
            JSON.stringify(value),
            ".")));
}
exports.Result = Result;
// export default Result;
