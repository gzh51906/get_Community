const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
} = require('../common/mongo');

Router.get('/hcart', async (req, res, next) => {
    let data = await find("Cart");
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;