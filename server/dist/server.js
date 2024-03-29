// tslint:disable-next-line: no-var-requires
import express from 'express';
import { updateAppoinments, write } from './functions.js';
import fs from 'fs';
import cors from 'cors';
import { __dirname } from './configuration.js';
const app = express();
const port = 3001;
const path = "./../appointByUser.json";
const path2 = "./../../src/usersdata.json";
app.use(cors({
    origin: 'http://localhost:1234',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/', (req, res) => { });
app.post('/user/newVisit/:id', (req, res) => {
    console.log(req.body, 'start to post new visit for ', req.params.id);
    if (typeof req.params.id !== undefined)
        updateAppoinments(path, Number(JSON.parse(req.body.id)), req.body.type, req.body.name, req.body.time); // function not saving data to file
    console.log('updated appointments througt post');
    let data0 = fs.readFileSync(__dirname + `/${path}`, 'utf8');
});
app.post('/user/logout/:id', (req, res) => {
    try {
        /// getting users' data from file json
        let data0 = fs.readFileSync(__dirname + `/${path2}`, 'utf8');
        let data0AsJS = JSON.parse(data0);
        let userId = Number(req.params.id);
        console.log('data from json', data0AsJS[userId]);
        data0AsJS[userId].islogin = 'false';
        write(JSON.stringify(data0AsJS), __dirname + `/${path2}`);
        console.log('\'login\' status of user with id ', userId, ' is ', data0AsJS[userId].islogin);
        res.status(200).json("true");
    }
    catch (error) {
        res.status(500).json("false");
    }
});
//get data from server for signin and send to react response with info if usersname exist
app.post('/isusernameunique', (req, res) => {
    //getting data from file json
    let data0 = fs.readFileSync(__dirname + `/${path2}`, 'utf8');
    const data1 = Object.entries(JSON.parse(data0))
        .map((it) => { return Object.assign(Object.assign({}, it[1]), { id: it[0] }); })
        .filter(it => it.username === req.body.login2);
    console.log('data1 in isusernameunique', data1);
    //sending to react
    if (data1 === undefined || data1.length === 0) {
        res.status(200).json("true");
    }
    else {
        res.status(200).json("false");
    }
});
app.post('/newUser', (req, res) => {
    const { login, password } = req.body;
    try {
        /// getting users' data from file json
        let data0 = fs.readFileSync(__dirname + `/${path2}`, 'utf8');
        //// preparing users' data to save in json file
        const data1 = Object.keys(JSON.parse(data0));
        const newId = Number(data1[data1.length - 1]) + 1;
        const userDataToSave = JSON.parse(data0);
        userDataToSave[`${newId}`] = { username: login, password: password, islogin: 'false' };
        write(JSON.stringify(userDataToSave), __dirname + `/${path2}`);
        let data01 = fs.readFileSync(__dirname + `/${path}`, 'utf8');
        const UsersDataOfVisits = {
            "id": `${newId}`,
            "visits": []
        };
        let visitsDataToSave = JSON.parse(data01);
        visitsDataToSave.push(UsersDataOfVisits);
        write(JSON.stringify(visitsDataToSave), __dirname + `/${path}`);
        res.status(200).json("ok");
    }
    catch (error) {
        res.status(200).json("nok");
    }
});
app.post('/user-validation', (req, res) => {
    const { login, password } = req.body;
    try {
        /// getting users' data from file json
        console.log(['newUser:  ', req.body]);
        let data0 = fs.readFileSync(__dirname + `/${path2}`, 'utf8');
        let data0AsJS = JSON.parse(data0);
        //// preparing users' data to save in json file
        const data1 = Object.values(JSON.parse(data0));
        const data2 = data1.map((item, index) => { return Object.assign(Object.assign({}, item), { userId: index }); });
        const data3 = data2 === null || data2 === void 0 ? void 0 : data2.filter(value => login === value.username && password === value.password);
        if (data3.length === 0) {
            res.status(200).json(JSON.stringify({ "isValid": "false" }));
        }
        else {
            const userId = data3[0].userId;
            // save in json file that user is logged
            data0AsJS[`${userId}`].islogin = 'true';
            write(JSON.stringify(data0AsJS), __dirname + `/${path2}`);
            const response = JSON.stringify({ "isValid": "true", "userId": `"${userId}"` });
            res.status(200).json(response);
        }
    }
    catch (error) {
        res.status(200).json(JSON.stringify({ "isValid": "false" }));
    }
});
app.get('/:id', (req, res) => {
    //getting data from file json
    let data0 = fs.readFileSync(__dirname + `/${path}`, 'utf8');
    const data1 = JSON.parse(data0).filter((it) => it.id == req.params.id)[0];
    console.log('data1 in :id', JSON.stringify(data1));
    //sending to react
    if (data1 === undefined || data1.length === 0) {
        res.status(200).json(
        //sending default data
        { "id": req.params.id, "visits": [] });
    }
    else { //sending real data
        res.status(200).json(JSON.stringify(data1));
    }
});
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
