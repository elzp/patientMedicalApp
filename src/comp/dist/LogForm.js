"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
var react_router_dom_1 = require("react-router-dom");
var usersdata_json_1 = require("../usersdata.json");
function LogForm(props) {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h3", null, props.name),
        react_1["default"].createElement("form", { onSubmit: props.onSubmit, className: "right-log-form" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", null, "login:"),
                " ",
                react_1["default"].createElement("input", { value: props.login, onChange: function (e) { props.onChange(e, "log"); } })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", null, " Password: "),
                " ",
                react_1["default"].createElement("input", { value: props.password, onChange: function (e) { props.onChange(e, "pass"); }, type: "password" })),
            react_1["default"].createElement("div", { id: "button" },
                " ",
                react_1["default"].createElement("button", { type: "submit" }, "Submit"))),
        props.error,
        react_1["default"].createElement(react_router_dom_1.Route, { render: function (props) { return localStorage.getItem('isLogin') === "true" &&
                react_1["default"].createElement(react_router_dom_1.Redirect, { to: { pathname: '/' } }); } }),
        JSON.stringify(usersdata_json_1["default"])));
}
exports["default"] = LogForm;
