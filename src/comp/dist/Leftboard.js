"use strict";
exports.__esModule = true;
exports.Leftboard = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./../App.css");
var srcfunctions_1 = require("./srcfunctions");
function Leftboard(props) {
    return (react_1["default"].createElement("div", { className: 'leftdiv' },
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            localStorage.getItem('isLogin') === "true" ? react_1["default"].createElement(react_router_dom_1.Link, { to: "/login" },
                react_1["default"].createElement("button", { onClick: function () { return srcfunctions_1.handleLogout(props.defaultuserdata, props.changeuser, props.currentuserdata); } }, "logout")) :
                react_1["default"].createElement(react_router_dom_1.Link, { reloadDocument: true, to: "/login" },
                    react_1["default"].createElement("button", null, "login")),
            localStorage.getItem('isLogin') === "false" && react_1["default"].createElement(react_router_dom_1.Link, { to: "/signin" },
                react_1["default"].createElement("button", null, "Sign In")))));
}
exports.Leftboard = Leftboard;
// export default Leftboard;
