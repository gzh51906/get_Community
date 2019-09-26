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
        sginTime
    } = req.body;
    console.log(sginTime)
    let data = await update("customer", {
        'usename': usename,
    }, {
        $set: {
            sginTime
        }
    });
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;