const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
    insert
} = require('../common/mongo');

Router.get('/allgoods', async (req, res, next) => {
    let {
        type
    } = req.query;
    let typecode = `/${type}/`
    let data = await find("goods", {
        'type2': eval(typecode),
    });
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;