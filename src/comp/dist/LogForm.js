"use strict";
exports.__esModule = true;
exports.LogForm = void 0;
var react_1 = require("react");
require("./../App.css");
var react_router_dom_1 = require("react-router-dom");
function LogForm(props) {
    if (localStorage.getItem('isLogin') === "true") {
        react_router_dom_1.redirect("/start");
        return (react_1["default"].createElement(react_1["default"].Fragment, null));
    }
    else {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement("h3", null, props.name),
            react_1["default"].createElement("form", { onSubmit: props.onSubmit, className: "right-log-form" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", null, "login:"),
                    " ",
                    react_1["default"].createElement("input", { value: props.login, onChange: function (e) { props.onChange(e, "log"); } })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", null, " Password: "),
                    " ",
                    react_1["default"].createElement("input", { value: props.password, onChange: function (e) { props.onChange(e, "pass"); }, type: "password" })),
                react_1["default"].createElement("div", { id: "button" },
                    " ",
                    react_1["default"].createElement("button", { type: "submit" }, "Submit"))),
            props.error));
    }
}
exports.LogForm = LogForm;
// export default LogForm;
