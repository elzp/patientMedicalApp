"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
var react_router_dom_1 = require("react-router-dom");
function Start(props) {
    //const {value}: {value: number} = props;
    //const {appointment} : {appointment: object} = props.styles;
    return (react_1["default"].createElement("div", null, localStorage.getItem('isLogin') === "true" ?
        react_1["default"].createElement("h3", null,
            "Welcome ",
            props.userdata.currentuser.pacientUsername,
            ", you're id:",
            props.userdata.currentuser.pacientId,
            ".")
        : react_1["default"].createElement("div", null,
            " Welcome UNKNOWN, ",
            react_1["default"].createElement(react_router_dom_1.BrowserRouter, { forceRefresh: true },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/login" }, "login"),
                " or ",
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/signin" }, "Sign In")),
            ".")));
}
exports["default"] = Start;
