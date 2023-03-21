"use strict";
exports.__esModule = true;
exports.App = void 0;
var react_1 = require("react");
require("./App.css");
var Rightboard_1 = require("./comp/Rightboard");
var Header_1 = require("./comp/Header");
var Footer_1 = require("./comp/Footer");
var userContext_1 = require("./context/userContext");
var ErrorBoundary_1 = require("./comp/ErrorBoundary");
var somedata_json_1 = require("./somedata.json");
var react_router_dom_1 = require("react-router-dom");
var defaultUser = {
    currentuser: { pacientId: "-5",
        pacientUsername: "",
        isLogin: false }
};
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);
var menu = somedata_json_1["default"].menu;
// <Route path="/" element={<Root />}>
//   <Route path="dashboard" element={<Dashboard />} />
//   {/* ... etc. */}
// </Route>
function App(props) {
    var _a = react_1.useState(defaultUser), userdata = _a[0], setuserdata = _a[1];
    // here was function handleChangeOfUser, now it is in srcfunctons.ts.
    // here was function handleLogout, now it is in srcfunctons.ts
    var routes = menu.map(function (item) { return (
    //     <Route path=//"/:pathType"
    //      {`/${item[1]}`}
    //      key={item[0]}
    //     >
    //     element= {
    //      <Rightboard changeuser={setuserdata} 
    //      defaultuser={defaultUser}/> 
    //      }
    //    </Route>
    {
        path: "/" + item[1],
        element: react_1["default"].createElement(Rightboard_1.Rightboard, { changeuser: setuserdata, defaultuser: defaultUser }),
        errorElement: react_1["default"].createElement(ErrorBoundary_1.ErrorBoundary, null)
    }); });
    var router = react_router_dom_1.createBrowserRouter(routes);
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(userContext_1.userContext.Provider, { value: userdata },
            react_1["default"].createElement("header", { "data-testid": "header" },
                react_1["default"].createElement(Header_1["default"], { userdata: userdata, changeuser: setuserdata, defaultuserdata: defaultUser })),
            react_1["default"].createElement("main", null,
                react_1["default"].createElement(react_router_dom_1.RouterProvider, { router: router })),
            react_1["default"].createElement(Footer_1["default"], null))));
}
exports.App = App;
// export default App;
// export function App() {
//   return (<h1>Hello world!</h1>);
// }
