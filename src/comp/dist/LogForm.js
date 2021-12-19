"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
var usersdata_json_1 = require("../usersdata.json");
function LogForm(props) {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h3", null, props.name),
        react_1["default"].createElement("form", { onSubmit: props.onSubmit, className: "right-log-form" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", null, props.label),
                " ",
                react_1["default"].createElement("input", { value: props.login, onChange: function (e) { props.onChange(e, "username"); } })),
            props.additionalJSX,
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", null, " Password: "),
                " ",
                react_1["default"].createElement("input", { value: props.password, onChange: function (e) { props.onChange(e, "password"); }, type: "password" })),
            react_1["default"].createElement("div", { id: "button" },
                " ",
                react_1["default"].createElement("button", { type: "submit" }, "Submit"))),
        Object.values(props.error).map(function (it, id) {
            return (react_1["default"].createElement("div", { key: id, className: "error" }, it));
        }),
        JSON.stringify(usersdata_json_1["default"])));
}
exports["default"] = LogForm;
