"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let userList = [];
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.get('/hello', (req, res) => {
    res.json({ msg: "Hello world!" });
});
router.get('/echo/:id', (req, res) => {
    let text = req.params.id;
    res.json({ id: text });
});
//Found help from this to sum an array of numbers for post
//https://coreui.io/answers/how-to-sum-an-array-of-numbers-in-javascript/
router.post('/sum', (req, res) => {
    //console.log(req.body)
    let list = req.body.numbers;
    let sumList = list.reduce((acc, num) => acc + num, 0);
    //console.log(sumList)
    res.json({ sum: sumList });
});
router.post('/users', (req, res) => {
    //console.log(req.body.email)
    let userName = req.body.name;
    let userEmail = req.body.email;
    let newUser = {
        name: userName,
        email: userEmail
    };
    userList.push(newUser);
    //console.log(userList)
    res.send("User successfully added");
});
router.get('/users', (req, res) => {
    res.status(201).json({ users: userList });
});
exports.default = router;
//# sourceMappingURL=index.js.map