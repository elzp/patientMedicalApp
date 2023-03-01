"use strict";
exports.__esModule = true;
exports.Receipts = void 0;
var react_1 = require("react");
require("./../App.css");
function Receipts(props) {
    var value = props.value;
    return (react_1["default"].createElement("div", { className: "appointment" },
        react_1["default"].createElement("p", null,
            " This is new Receipts ",
            JSON.stringify(value),
            ".")));
}
exports.Receipts = Receipts;
// export default Receipts;
