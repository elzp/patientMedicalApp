"use strict";
exports.__esModule = true;
exports.Start = void 0;
var react_1 = require("react");
require("./../App.css");
var react_router_dom_1 = require("react-router-dom");
function Start(props) {
    return (react_1["default"].createElement("div", { className: "right-start" }, localStorage.getItem('isLogin') === "true" ?
        (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("h3", null,
                "Welcome ",
                localStorage.getItem('nameOfLogin'),
                "."),
            react_1["default"].createElement("div", null,
                "To add new appointment ",
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/new" },
                    react_1["default"].createElement("span", null, "click here")),
                "."),
            react_1["default"].createElement("div", null,
                "To change data about your account ",
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/account" },
                    react_1["default"].createElement("span", null, "click here")),
                ".")))
        : react_1["default"].createElement("div", null,
            " Welcome ",
            react_1["default"].createElement("span", null, "unknown"),
            ", ",
            react_1["default"].createElement("span", null,
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", reloadDocument: true }, "login")),
            " or ",
            react_1["default"].createElement("span", null,
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/signin", reloadDocument: true }, "sign in")),
            ".")));
}
exports.Start = Start;
// export default Start;
