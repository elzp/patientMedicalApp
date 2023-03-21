"use strict";
exports.__esModule = true;
exports.ErrorBoundary = void 0;
var react_router_1 = require("react-router");
function ErrorBoundary() {
    var error = react_router_1.useRouteError();
    console.error(error);
    return React.createElement("div", null, "There is some problem, check console.");
}
exports.ErrorBoundary = ErrorBoundary;
