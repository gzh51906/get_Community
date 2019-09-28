const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
} = require('../common/mongo');


Router.get('/evaluating', async (req, res, next) => {

    let data = await find("pingcequ");
    res.send(formatData({
        data: data
    }));
    next();
})
module.exports = Router;