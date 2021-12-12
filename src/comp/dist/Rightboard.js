"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Appointments_1 = require("./Appointments");
var Start_1 = require("./Start");
var Result_1 = require("./Result");
var Refferals_1 = require("./Refferals");
var Receipts_1 = require("./Receipts");
var Account_1 = require("./Account");
var Login_1 = require("./Login");
var SignIn_1 = require("./SignIn");
var userContext_1 = require("../context/userContext");
require("./../App.css");
var somedata_json_1 = require("./../somedata.json");
var react_router_dom_1 = require("react-router-dom");
function Rightboard(props) {
    //useLocation works if in parent component providor is set. 
    var pathname = react_router_dom_1.useLocation().pathname;
    // const comps = [<Start />, <Appointments pacientId ={4}/>,<Refferals />,<Result />, <Receipts />, <Account />]
    var comps2 = [Start_1["default"], Account_1["default"], Refferals_1["default"], Result_1["default"], Receipts_1["default"], Appointments_1["default"], Login_1["default"], SignIn_1["default"]];
    var comps21 = somedata_json_1["default"].menu.map(function (it) { return it[0]; });
    var comps3 = [comps21[0], comps21[6], comps21[7]];
    var datamenu2 = [somedata_json_1["default"].menu[0][0], somedata_json_1["default"].menu[6][0], somedata_json_1["default"].menu[7][0]];
    var ChosenChildcomp = Start_1["default"];
    var _loop_1 = function (i) {
        if (pathname === "/" + somedata_json_1["default"].menu[i][1]) {
            if (localStorage.getItem('isLogin') === null || localStorage.getItem('isLogin') != "true") {
                if (datamenu2.some(function (it) { return it === comps21[i]; })) {
                    ChosenChildcomp = comps2[i];
                    return "break";
                }
            }
            else {
                ChosenChildcomp = comps2[i];
                return "break";
            }
        }
    };
    // setting child component to be visible depending on path value
    //MAKE REDIRECTING only to start, login and sing up when user is not login. //   
    for (var i = 0; i < comps2.length; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break")
            break;
    }
    return (react_1["default"].createElement("div", { className: 'rightdiv' },
        react_1["default"].createElement(userContext_1.userContext.Consumer, null, function (value) {
            return react_1["default"].createElement(ChosenChildcomp, { userdata: value, changeuser: props.changeuser, defaultuser: props.defaultuser });
        })));
}
exports["default"] = Rightboard;
