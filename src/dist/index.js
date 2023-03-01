"use strict";
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
exports.__esModule = true;
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var container = document.getElementById("app");
var root = client_1.createRoot(container);
root.render(React.createElement(App_1.App, null));
