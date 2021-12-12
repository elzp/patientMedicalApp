"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
var ic_menu_png_1 = require("./../ic-menu.png");
var ic_logo_png_1 = require("./../ic-logo.png");
var somedata_json_1 = require("./../somedata.json");
var react_router_dom_1 = require("react-router-dom");
function Header(styles) {
    //const logo : string = './../public/ic-menu.png';
    var _a = react_1.useState(false), menuVisible = _a[0], setVisibility = _a[1];
    var menu = somedata_json_1["default"].menu;
    var newmenu = menu.slice(0, 6);
    var arrOfFalse = new Array(somedata_json_1["default"].menu.length).fill(false);
    var arrOfMenuButtonsStyle = new Array(somedata_json_1["default"].menu.length).fill("menu-link");
    var _b = react_1.useState(arrOfFalse), areClicked = _b[0], setIfareClicked = _b[1];
    var _c = react_1.useState(arrOfMenuButtonsStyle), buttonStyle = _c[0], setButtonStyle = _c[1];
    function changeMenuVisibility() {
        setVisibility(function (menuVisible) { return !menuVisible; });
    }
    function changeMenuItemView(indexOfItem) {
        var newAreClicked = arrOfFalse;
        newAreClicked[indexOfItem] = true;
        console.log(newAreClicked);
        setIfareClicked(function (areClicked) { return newAreClicked; });
        changeMenuVisibility();
        var newArrOfMenuButtonsStyle = arrOfMenuButtonsStyle;
        newArrOfMenuButtonsStyle[indexOfItem] = "menu-link-clicked";
        console.log(newArrOfMenuButtonsStyle);
        setButtonStyle(function (buttonStyle) { return newArrOfMenuButtonsStyle; });
        changeMenuVisibility();
    }
    return (react_1["default"].createElement("div", { className: "App-header" },
        react_1["default"].createElement("div", { className: "navbar-wrapper-1" },
            react_1["default"].createElement("div", { className: "brand-nav" },
                react_1["default"].createElement("div", { className: "App-logo" },
                    react_1["default"].createElement("img", { src: ic_logo_png_1["default"], alt: "logoOfApp", className: "img-logo" })),
                react_1["default"].createElement("div", { className: "title" },
                    react_1["default"].createElement("h3", null, "Patient-doctor App"))),
            react_1["default"].createElement("div", { className: "navbar-button-1" },
                react_1["default"].createElement("button", { onClick: changeMenuVisibility },
                    react_1["default"].createElement("img", { src: ic_menu_png_1["default"], alt: "menu", className: "button-img" }))),
            react_1["default"].createElement("div", { className: "menu-elements-wrapper-1" },
                react_1["default"].createElement("div", { className: "menu-elements-1" }, newmenu.map(function (item, index) { return (react_1["default"].createElement("div", { key: item[0], className: buttonStyle[index] },
                    react_1["default"].createElement(react_router_dom_1.BrowserRouter, { forceRefresh: true },
                        " ",
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/" + item[1], className: "menu-a", key: item[0], onClick: function () { return changeMenuItemView(index); } }, item[0])))); })))),
        react_1["default"].createElement("div", { className: "navbar-wrapper" },
            react_1["default"].createElement("div", { className: "navbar-button" },
                react_1["default"].createElement("button", { onClick: changeMenuVisibility },
                    react_1["default"].createElement("img", { src: ic_menu_png_1["default"], alt: "menu", className: "button-img" }))),
            react_1["default"].createElement("div", { className: "menu-elements-wrapper" }, menuVisible &&
                (react_1["default"].createElement("div", { className: "menu-elements" }, newmenu.map(function (item) { return (react_1["default"].createElement("div", { key: item[0], className: "menu-link" },
                    react_1["default"].createElement(react_router_dom_1.BrowserRouter, { forceRefresh: true },
                        " ",
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/" + item[1], className: "menu-a", key: item[0], onClick: changeMenuVisibility }, item[0])))); })))),
            react_1["default"].createElement("div", { className: "brand-nav" },
                react_1["default"].createElement("div", { className: "App-logo" },
                    react_1["default"].createElement("img", { src: ic_logo_png_1["default"], alt: "logoOfApp", className: "img-logo" })),
                react_1["default"].createElement("div", { className: "title" },
                    react_1["default"].createElement("h3", null, "Patient-doctor App"))))));
}
exports["default"] = Header;
