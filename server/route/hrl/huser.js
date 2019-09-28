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

Router.get('/login', async (req, res, next) => {
    let {
        usename,
    } = req.query;
    let data = await find("customer", {
        'usename':usename,
    });
    res.send(formatData({
        data: data
    }));
    next();
})

Router.patch('/login', async (req, res, next) => {
    let {
        usename,
        loginTime
    } = req.body;
    let data = await update("customer", {
        'usename': usename,
    },{
        $set:{loginTime}
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
        phoneNum,
        date,
        coin,
        loginTime
    } = req.body;
    let data = await insert('customer',{
         usename,
         password,
         phoneNum,
         regTime:date,
         coin,
         loginTime
    });
    res.send(formatData({
        data: data
    }));
    next();
})

module.exports = Router;