"use strict";
exports.__esModule = true;
// tslint:disable-next-line: no-var-requires
var express = require('express');
// tslint:disable-next-line: no-var-requires
var cors = require('cors');
var app = express();
var port = 3001;
app.use(cors());
// tslint:disable-next-line: only-arrow-functions
app.get('/products/:id', function (req, res, next) {
    // res.json({msg: 'This is CORS-enabled for all origins!'})
    res.send('Hello World!');
});
// tslint:disable-next-line: only-arrow-functions
// tslint:disable-next-line: no-console
app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
