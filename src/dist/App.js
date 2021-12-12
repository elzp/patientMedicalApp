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
// localStorage.setItem('nameOfLogin', `${defaultUser.currentuser.pacientUsername}`);
// localStorage.setItem('isLogin', `${defaultUser.currentuser.isLogin}`);
// localStorage.setItem('id', `${defaultUser.currentuser.pacientId}`);
// if(localStorage.getItem('isLogin')=="true"){//to much rerenders!!!
//   const actualUser = {
//       currentuser: {pacientId: localStorage.getItem('id')||  "-5",
//                     pacientUsername: localStorage.getItem('nameOfLogin') ||"",
//                     isLogin: localStorage.getItem('isLogin')=="true" ? true : false
//                    }
//   }
// }
function App(props) {
    var _a = react_1.useState(defaultUser), userdata = _a[0], setuserdata = _a[1];
    function handleChangeOfUser(newlogin, newid, status) {
        var newuser = {
            currentuser: { pacientId: newid,
                pacientUsername: newlogin,
                isLogin: true }
        };
        localStorage.setItem('nameOfLogin', "" + newuser.currentuser.pacientUsername);
        localStorage.setItem('isLogin', "" + newuser.currentuser.isLogin);
        localStorage.setItem('id', "" + newuser.currentuser.pacientId);
        setuserdata(function (userdata) { return newuser; });
        console.log("handleChangeOfUser was used and updated " + newlogin + " ");
    }
    function handleLogout() {
        setuserdata(function (userdata) { return defaultUser; });
        localStorage.setItem('nameOfLogin', "" + defaultUser.currentuser.pacientUsername);
        localStorage.setItem('isLogin', "" + defaultUser.currentuser.isLogin);
        localStorage.setItem('id', "" + defaultUser.currentuser.pacientId);
        console.log("User was log out.");
    }
    var menu = somedata_json_1["default"].menu;
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(userContext_1.userContext.Provider, { value: userdata },
            react_1["default"].createElement("header", null,
                react_1["default"].createElement(Header_1["default"], null)),
            react_1["default"].createElement("main", null,
                react_1["default"].createElement(Leftboard_1["default"], { handleLogout: handleLogout, defaultuserdata: defaultUser.currentuser }),
                react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
                    react_1["default"].createElement(react_router_dom_1.Switch, null, menu.map(function (item) { return (react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/" + item[1], key: item[0] },
                        react_1["default"].createElement(Rightboard_1["default"], { propsPath: item[0], changeuser: handleChangeOfUser, defaultuser: defaultUser }))); }))),
                react_1["default"].createElement(Footer_1["default"], null)))));
}
exports["default"] = App;
