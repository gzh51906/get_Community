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


module.exports=Router