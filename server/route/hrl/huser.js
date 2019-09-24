const express = require('express');

let Router = express.Router();
let {
    formatData
} = require('../common/formatData');
let {
    find,
    insert
} = require('../common/mongo');

Router.get('/login', async (req, res, next) => {
    let {
        usename
    } = req.query;
    let data = await find("customer", {
        'usename':usename
    });
    res.send(formatData({
        data: data
    }));
    next();
})


Router.post('/login',async(req,res,next)=>{
    let{
        usename,
        password,
        phoneNum
    } = req.body;
    let data = await insert('customer',{
         usename,
         password,
         phoneNum
    });
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;