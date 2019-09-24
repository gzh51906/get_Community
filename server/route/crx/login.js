const express = require("express");
let Router = express.Router();
const {formatData} = require("../common/formatData");
const {find} = require("../common/mongo");

Router.get("/login",async (req,res,next)=>{
    let {username,password} = req.query;
    let result = await find("manageUser",{username,password});
    if(result.length === 0){
        res.send(formatData({code:0}));
    }else{
        res.send(formatData({data:result}));
    }
    next();
})

Router.get("/userMore",async (req,res,next)=>{
    let {username} = req.query;
    let result = await find("manageUser",{username});
    res.send(formatData({data:result}));
})



module.exports = Router;