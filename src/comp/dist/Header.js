"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
var ic_menu_png_1 = require("./../ic-menu.png");
var ic_logo_png_1 = require("./../ic-logo.png");
var somedata_json_1 = require("./../somedata.json");
var react_router_dom_1 = require("react-router-dom");
function Header() {
    var _a = react_1.useState(true), menuVisible = _a[0], setVisibility = _a[1];
    var menu = somedata_json_1["default"].menu;
    var newmenu = menu.slice(0, 6);
    // const arrOfMenuButtonsStyle = new Array(data.menu.length).fill("menu-link");
    // const [buttonStyle,setButtonStyle] = useState(arrOfMenuButtonsStyle);
    function changeMenuVisibility() {
        setVisibility(function (menuVisible) { return !menuVisible; });
    }
    return (react_1["default"].createElement("div", { className: "App-header" },
        react_1["default"].createElement("div", { className: "navbar-wrapper" },
            react_1["default"].createElement("div", { className: "navbar-button" },
                react_1["default"].createElement("button", { onClick: changeMenuVisibility },
                    react_1["default"].createElement("img", { src: ic_menu_png_1["default"], alt: "menu", className: "button-img" }))),
            react_1["default"].createElement("div", { className: "menu-elements-wrapper" }, menuVisible &&
                (react_1["default"].createElement("div", { className: "menu-elements" }, newmenu.map(function (item) { return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, { forceRefresh: true },
                    " ",
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/" + item[1], className: "menu-a", key: item[0], onClick: changeMenuVisibility },
                        react_1["default"].createElement("div", { key: item[0], className: "menu-link" }, item[0])))); })))),
            react_1["default"].createElement("div", { className: "brand-nav" },
                react_1["default"].createElement("div", { className: "App-logo" },
                    react_1["default"].createElement("img", { src: ic_logo_png_1["default"], alt: "logoOfApp", className: "img-logo" })),
                react_1["default"].createElement("div", { className: "title" },
                    react_1["default"].createElement("h3", null, "Patient-doctor App"))))));
}
exports["default"] = Header;
