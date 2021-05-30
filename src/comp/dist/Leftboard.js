"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./../App.css");
function Leftboard(props //styles : Styletype
) {
    //const style: object = styles.leftdiv;
    //  const { pacientId, pacientUsername, isLogin } = props.defaultuserdata.currentuser
    return (react_1["default"].createElement("div", { className: 'leftdiv' },
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, { forceRefresh: true },
            " ",
            localStorage.getItem('isLogin') === "true" ? react_1["default"].createElement(react_router_dom_1.Link, { to: "/login" //className= "menu-a"
             },
                react_1["default"].createElement("button", { onClick: props.handleLogout }, "logout")) :
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/login" //className= "menu-a"
                 },
                    react_1["default"].createElement("button", null, "login")),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/signin" //className= "menu-a"
             },
                react_1["default"].createElement("button", null, "Sign In")))));
}
exports["default"] = Leftboard;
