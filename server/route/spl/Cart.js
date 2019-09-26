const express = require("express");

let Router = express.Router();

let {formatData} = require("../common/formatData")

let {find,update,insert} = require("../common/mongo.js")

Router.get("/cart",async(req,res,next)=>{
    let goods_msg=req.query
    
    let {size_id,qty,username}=goods_msg

    
    let search = await find("Cart",{username,size_id});
    
    let result =search[0]
    if(result){
        result.qty=result.qty*1+qty*1
        await update("Cart",{username,size_id},{$set:{qty:result.qty}})
        res.send(formatData({data:result.qty}))
    }
    else{
        await insert("Cart",goods_msg)
        res.send(formatData({code:1}))
    }
    
   
})
Router.get("/cartlength",async(req,res,next)=>{
    let {username}=req.query
    let result=await find("Cart",{username})
   
    res.send(formatData({data:result}))
})
Router.get("/allnew",async(req,res,next)=>{
    let result = await find("manageType",{})
    
    if(result){
        res.send(formatData({data:result}))
    }
})
Router.get("/new",async(req,res,next)=>{
    let result =await find("news")
    let data=result.slice(150,165)
    res.send(formatData({data}))
})
Router.get("/type",async(req,res,next)=>{
    let{type} = req.query
    
    let result = await find("news",{type1:type})
    let data=result.slice(0,15)
    
    
    res.send(formatData({data}))
})

module.exports=Router