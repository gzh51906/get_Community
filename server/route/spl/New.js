const express = require("express");

let Router = express.Router();

let {formatData} = require("../common/formatData")

let {find} = require("../common/mongo.js")

Router.get("/news",async(req,res,next)=>{
    let result = await find("news",{})

    if(result){
        let data=result
        res.send(formatData({data}))
    }
    else{
        res.send(formatData({code:0}))
    }

})