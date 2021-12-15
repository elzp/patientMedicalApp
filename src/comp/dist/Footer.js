"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
var somedata_json_1 = require("./../somedata.json");
function Footer() {
    var foot = somedata_json_1["default"].foot;
    return (react_1["default"].createElement("div", { className: "App-footer" },
        react_1["default"].createElement("footer", null,
            react_1["default"].createElement("p", null,
                "Nasz adres:",
                react_1["default"].createElement("br", null),
                foot.adress['street-type'],
                " ",
                foot.adress.street,
                foot.adress.buildingNr,
                " lok. ",
                foot.adress.localNr,
                ",",
                react_1["default"].createElement("br", null),
                foot.adress.postCode,
                " lok. ",
                foot.adress.city,
                ","),
            react_1["default"].createElement("p", null,
                "Telefon: ",
                foot.phone,
                "."),
            react_1["default"].createElement("p", null,
                "E-mail: ",
                foot.email,
                "."))));
}
exports["default"] = Footer;
