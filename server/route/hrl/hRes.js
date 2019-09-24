const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
    insert
} = require('../common/mongo');

Router.get('/reg', async (req, res, next) => {
    let {
        phoneNum
    } = req.query;
    console.log(phoneNum)
    let data = await find("customer", {
        'phoneNum': phoneNum
    });
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;