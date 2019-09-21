const express = require("express");

let Router = express.Router();

let {formatData} = require("../common/formatData")

let {find} = require("../common/mongo.js")

Router.get("/news",async(req,res,next)=>{

    let result = await find("news",{})
   
    if(result){
        let data=result.slice(0,5)
        res.send(formatData({data}))
    }
    else{
        res.send(formatData({code:0}))
    }

})
Router.get("/goods",async(req,res,next)=>{
    let result = await find("goods",{})
   
    if(result){
        let data=result.slice(0,4)
        res.send(formatData({data}))
    }
    else{
        res.send(formatData({code:0}))
    }

})
Router.get("/check",async(req,res,next)=>{
    let result=await find("pingcequ",{})
    if(result){
        let data=result.slice(16,20)
        res.send(formatData({data}))
    }
    else{
        res.send(formatData({code:0}))
    }
})
Router.get("/newpage",async(req,res,next)=>{
    let {_id}=req.query
    let result = await find("news",{_id})
    
    if(result){
        res.send(formatData({data:result}))
    }
    else{
        res.send(formatData({code:0}))
    }
    
})

module.exports = Router;