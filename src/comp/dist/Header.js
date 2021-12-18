"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./../App.css");
var ic_menu_png_1 = require("./../ic-menu.png");
var ic_logo_png_1 = require("./../ic-logo.png");
var somedata_json_1 = require("./../somedata.json");
var react_router_dom_1 = require("react-router-dom");
function Header() {
    var _a = react_1.useState(false), menuVisible = _a[0], setVisibility = _a[1];
    var menu = somedata_json_1["default"].menu;
    var newmenu = menu.slice(0, 6);
    function changeMenuVisibility() {
        setVisibility(function (menuVisible) { return !menuVisible; });
    }
    //https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
    function getWindowWidth() {
        var width = window.innerWidth;
        return width;
    }
    var _b = react_1.useState(getWindowWidth()), windowWidth = _b[0], setWindowWidth = _b[1];
    react_1.useEffect(function () {
        function handleResize() {
            setWindowWidth(getWindowWidth());
        }
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    return (react_1["default"].createElement("div", { className: "App-header" },
        react_1["default"].createElement("div", { className: "navbar-wrapper" },
            react_1["default"].createElement("div", { className: "navbar-button" },
                react_1["default"].createElement("button", { onClick: changeMenuVisibility },
                    react_1["default"].createElement("img", { src: ic_menu_png_1["default"], alt: "menu", className: "button-img" }))),
            react_1["default"].createElement("div", { className: "menu-elements-wrapper" }, ((windowWidth > 800) || ((windowWidth <= 800) && menuVisible)) &&
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
