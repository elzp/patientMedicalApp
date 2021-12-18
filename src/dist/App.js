"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var Leftboard_1 = require("./comp/Leftboard");
var Rightboard_1 = require("./comp/Rightboard");
var Header_1 = require("./comp/Header");
var Footer_1 = require("./comp/Footer");
var userContext_1 = require("./context/userContext");
var somedata_json_1 = require("./somedata.json");
var react_router_dom_1 = require("react-router-dom"); /* zainstaluj: npm i --save-dev @types/react-router-dom */
var defaultUser = {
    currentuser: { pacientId: "-5",
        pacientUsername: "",
        isLogin: false }
};
function App(props) {
    var _a = react_1.useState(defaultUser), userdata = _a[0], setuserdata = _a[1];
    // here was function handleChangeOfUser, now it is in srcfunctons.ts.
    // here was function handleLogout, now it is in srcfunctons.ts
    var menu = somedata_json_1["default"].menu;
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(userContext_1.userContext.Provider, { value: userdata },
            react_1["default"].createElement("header", { "data-testid": "header" },
                react_1["default"].createElement(Header_1["default"], null)),
            react_1["default"].createElement("main", null,
                react_1["default"].createElement(Leftboard_1["default"], { currentuserdata: userdata, changeuser: setuserdata, defaultuserdata: defaultUser }),
                react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
                    react_1["default"].createElement(react_router_dom_1.Switch, null, menu.map(function (item) { return (react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/" + item[1], key: item[0] },
                        react_1["default"].createElement(Rightboard_1["default"], { changeuser: setuserdata, defaultuser: defaultUser }))); })))),
            react_1["default"].createElement(Footer_1["default"], null))));
}
exports["default"] = App;
