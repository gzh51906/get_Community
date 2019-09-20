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



module.exports = Router;