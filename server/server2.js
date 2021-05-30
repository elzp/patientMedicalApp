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
exports.__esModule = true;
// npm install bcrypt
// npm install --save @types/bcrypt
var bcrypt = require('bcrypt');
var functions = require('./functions');
var fs = require('fs');
var path = "../../src/usersdata.json";
// async function hashPasswordd(password, password2) { // updated
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)
// ​
//     const isSame = await bcrypt.compare(password2, hash) // updated
//     console.log(isSame) // updated
// }
// ​
// hashPasswordd('1234', '12345') // output: false
// hashPasswordd('1234', '1234') // output: true
var saltRounds = 10;
var plainTextPassword1 = "DFGh5546*%^__90";
var plainTextPassword2 = "alamakota";
var saved = "$2b$10$69SrwAoAUNC5F.gtLEvrNON6VQ5EX89vNqLEqU655Oy9PeT/HRM/a";
//hashPassword(plainTextPassword1)
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function () {
        var u;
        return __generator(this, function (_a) {
            u = bcrypt
                .hash(password, saltRounds)
                .then(function (hash) {
                console.log("Hash: " + hash);
                return "sth"; // Store hash in your password DB.
            })["catch"](function (err) { return console.error(err.message); });
            return [2 /*return*/, u];
        });
    });
}
function validatepassword(passFromLoging, passFromServer, text) {
    var u = bcrypt
        .compare(passFromLoging, passFromServer)
        .then(function (res) {
        console.log("1", res);
        return console.log(text, res);
    })["catch"](function (err) { return console.error(err.message); });
    return u;
}
var data0 = JSON.parse(fs.readFileSync(__dirname + ("" + path), 'utf8')) || {};
console.log(data0);
var data1 = Object.entries(data0).map(function (it) {
    it;
});
console.log(data1);
//const c0 = data1.map(it=>it[1].username;//==="u1")
//console.log(c0)
validatepassword(plainTextPassword1, saved, "should be true"); //works
validatepassword(plainTextPassword2, saved, "should be true"); //works
