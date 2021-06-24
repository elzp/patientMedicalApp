"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
// npm install bcrypt
// npm install --save @types/bcrypt
var bcrypt = require('bcrypt');
var functions = require('./functions');
var fs = require('fs');
var path = "../../src/usersdata.json";
var saltRounds = 10;
function checkIfUserIsInDataBase(data) {
}
//
function hashAndSavePassword(data) {
    return __awaiter(this, void 0, void 0, function () {
        var u;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt
                        .hash(data.password, saltRounds) //hashed password
                        .then(function (hash) {
                        console.log("Hash: " + hash);
                        return hash;
                    })
                        .then(function (hash) {
                        var data00 = fs.readFile("" + __dirname + path, 'utf8', function (err, dataa) {
                            if (err) {
                                console.error('read err', err);
                                return;
                            }
                            console.log('was read');
                            //modify text
                            //console.log(typeof dataa, typeof JSON.parse(dataa))
                            var data0 = JSON.parse(dataa) || {};
                            var data1 = Object.entries(data0).map(function (it) { return it[1]; });
                            //console.log(data1, data.username)
                            var data2 = data1.filter(function (it) { return data.username === it["username"]; });
                            // console.log('d2',data2)
                            var indexOfuser = data1.indexOf(data2[0]);
                            //console.log(indexOfuser)
                            var data3 = data0;
                            if (data1 !== []) {
                                // console.log(data3,data2)
                                data3[indexOfuser].password = hash; //save new hased password
                                // console.log(data3[indexOfuser].password)
                                // write all data to file
                                //console.log("d3",data3)
                                fs.writeFile(__dirname + ("" + path), JSON.stringify(data3), function (err) {
                                    if (err) {
                                        console.error('write err', err);
                                        return;
                                    }
                                });
                            }
                        });
                    })["catch"](function (err) { return console.error(err.message); })];
                case 1:
                    u = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var newuserData0 = {
    "username": "q1",
    "password": "q2",
    "islogin": "false"
};
var newuserData1 = {
    "username": "u2",
    "password": "2",
    "islogin": "false"
};
//console.log(' password before ',newuserData0.password )
//hashPassword(newuserData0)
console.log(' password before ', newuserData1.password);
var uu = hashAndSavePassword(newuserData1);
// const u = hashPassword(newuserData0)
console.log(' password after', uu, newuserData1.password);
function validatepassword(passFromLoging, passFromServer, text) {
    var u = bcrypt
        .compare(passFromLoging, passFromServer)
        .then(function (res) {
        console.log("1", res);
        return console.log(text, res);
    })["catch"](function (err) { return console.error(err.message); });
    return u;
}
//read user data from file
var data0 = JSON.parse(fs.readFileSync(__dirname + ("" + path), 'utf8')) || {};
//console.log("data0", data0)
// new user data:
var newuserData = {
    "username": "q1",
    "password": "q2",
    "islogin": "false"
};
//https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
//  preparing data to search for user
// testing data:
var addedByuser1 = "wrong";
var addedByuser2 = "p1";
var userLogin = 'u1';
var datadefault = [
    ['id', '-5'],
    ['username', ''],
    ['password', ''],
    ['islogin', 'false']
];
// console.log("data1", data1)
var data2 = Object.entries(data0).map(function (it) {
    var cos = Object.entries(it[1]).map(function (it2) { return [it2[0], it2[1]]; });
    return __spreadArray([["id", it[0]]], cos);
});
//console.log("data2" ,data2)
var c0 = data2.find(function (it) { return it[1][1] === userLogin; }) || datadefault;
// console.log("this data coresponds to login is in DB",c0) 
// //check if finding works - OK
//  const c1 = data2.find(it=>it[1][1]==="u") || datadefault;
//  console.log("login is in DB",c1) 
////validatepassword(addedByuser1,c0[2][1], "should be false")//works
// validatepassword(addedByuser2,c0[2][1], "should be true")//works
// validatepassword(plainTextPassword1,saved, "should be true")//works
// validatepassword(plainTextPassword2,saved, "should be true")//works
