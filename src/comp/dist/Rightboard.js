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
var srcfunctions_1 = require("./srcfunctions");
var react_router_dom_1 = require("react-router-dom");
function Rightboard(props) {
    //useLocation works if in parent component providor is set. 
    var pathname = react_router_dom_1.useLocation().pathname;
    var changeuser = props.changeuser;
    var arrayofAllJsxMenuComponents = [Start_1["default"], Appointments_1["default"], Refferals_1["default"], Result_1["default"], Receipts_1["default"], Account_1["default"], Login_1["default"], SignIn_1["default"]];
    var compsForNotLogged = [somedata_json_1["default"].menu[0][0], somedata_json_1["default"].menu[6][0], somedata_json_1["default"].menu[7][0]];
    var ChosenChildcomp = Start_1["default"];
    // setting child component to be visible depending on path value
    ChosenChildcomp = srcfunctions_1.chooseChildComponent(arrayofAllJsxMenuComponents, pathname, somedata_json_1["default"].menu, compsForNotLogged) || Start_1["default"];
    return (react_1["default"].createElement("div", { className: 'rightdiv' },
        react_1["default"].createElement(userContext_1.userContext.Consumer, null, function (value) {
            return react_1["default"].createElement(ChosenChildcomp, { userdata: value, changeuser: changeuser, defaultuser: props.defaultuser });
        })));
}
exports["default"] = Rightboard;
