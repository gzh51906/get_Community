const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
    insert
} = require('../common/mongo');

Router.get('/goodsprice', async (req, res, next) => {
    let {
        type,
        asc
    } = req.query;
    let typecode = `/${type}/`
    let data = await find("goods", {
        'type2': eval(typecode),
    },{
        sort:'newPrice',
        asc
    });
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;