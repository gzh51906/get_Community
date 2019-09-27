const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
} = require('../common/mongo');

Router.get('/hcart', async (req, res, next) => {
    let {usename} = req.query;
    let data = await find("Cart",{
        'username':usename
    });
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;