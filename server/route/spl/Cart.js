const express = require("express");

let Router = express.Router();

let {formatData} = require("../common/formatData")

let {find,update,insert} = require("../common/mongo.js")

Router.get("/cart",async(req,res,next)=>{
    let goods_msg=req.query
    console.log(goods_msg);
    res.send(formatData({data:goods_msg}))
    
})


module.exports=Router