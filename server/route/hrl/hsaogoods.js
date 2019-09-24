const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
    insert
} = require('../common/mongo');

Router.get('/saogoods', async (req, res, next) => {
    let {
        type
    } = req.query;
    let data = await find("goods", {
        'type1': type
    });
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;