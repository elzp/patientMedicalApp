"use strict";
exports.__esModule = true;
exports.Account = void 0;
var react_1 = require("react");
require("./../App.css");
var axios_1 = require("axios");
function Account(props) {
    var value = props.value;
    var currentuser = props.userdata.currentuser;
    var pacientId = currentuser.pacientId;
    //const {appointment} : {appointment: object} = props.styles;
    // server API code
    var visitApiAdress = "http://localhost:3001";
    //set default value of variable pacientVisitsData
    var _a = react_1.useState({ "id": pacientId, "visits": [] }), pacientVisitsData = _a[0], setpacientVisitsData = _a[1];
    // set current data in pacientVisitsData from json file send from server
    function getdataFromFile() {
        axios_1["default"]
            .get(visitApiAdress + "/" + pacientId)
            .then(function (res) {
            //log in browser
            console.log('data was received', JSON.parse(res.data));
            var data = JSON.parse(res.data);
            setpacientVisitsData(function (pacientVisitsData) { return data; });
        })["catch"](function (err) {
            console.error(err);
        });
    }
    var _b = react_1.useState(false), ifRefresh = _b[0], setStatusIfRefresh = _b[1];
    react_1.useMemo(function () { getdataFromFile(); }, [ifRefresh]);
    function handleRefreshingVisits() {
        setStatusIfRefresh(!ifRefresh);
    }
    return (react_1["default"].createElement("div", { className: "account" },
        react_1["default"].createElement("h3", null,
            "Welcome ",
            localStorage.getItem('nameOfLogin'),
            ".")));
}
exports.Account = Account;
