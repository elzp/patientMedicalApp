"use strict";
exports.__esModule = true;
exports.getdataFromFile = void 0;
var axios_1 = require("axios");
function getdataFromFile(urlAPI, reactsetcallback, parameter) {
    axios_1["default"]
        .get("" + urlAPI)
        .then(function (res) {
        //log in browser
        console.log('data was received', JSON.parse(res.data));
        var data = JSON.parse(res.data);
        reactsetcallback(function (parameter) { return data; });
        //setpacientVisitsData(pacientVisitsData => data)
    })["catch"](function (err) {
        console.error(err);
    });
}
exports.getdataFromFile = getdataFromFile;
