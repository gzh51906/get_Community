const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
    insert,
    update
} = require('../common/mongo');

Router.patch('/sgin', async (req, res, next) => {
    let {
        usename,
        sginTime,
        coin,
    } = req.body;
    let data = await update("customer", {
        'usename': usename,
    }, {
        $set: {
            sginTime,
            coin
        }
    });
    res.send(formatData({
        data: data
    }));
    next();
})

Router.get('/sgin', async (req, res, next) => {
    let {
        usename,
    } = req.query;
    let data = await find("customer", {
        'usename': usename,
    });
    res.send(formatData({
        data: data
    }));
    next();
})
module.exports = Router;