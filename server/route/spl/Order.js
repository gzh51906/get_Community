const express = require("express");

let Router = express.Router();

let {formatData} = require("../common/formatData")

let {find,update,insert,remove} = require("../common/mongo.js")


Router.get("/pay",async(req,res,next)=>{
    let data = await find("order",{refund:false})
    if(data){
        res.send(formatData({data}))
    }
    else{
        res.send(formatData({code:0}))
    }
})
Router.post("/changerefund",async(req,res,next)=>{
    let {id} = req.body
    let result = await find("order",{"allgoods._id":id})
    console.log(id,result);
    result.map(item=>{
        return item.allgoods.map((item,index)=>{
             if(item._id==id){
                 item.refund=true
             }
             return item
        })
    })
    // await update("order",)
    // if(result){
    //     await update("order",{id},{$set:{refund:true}})
    //     res.send(formatData({code:1}))
    // }else{
    //     res.send(formatData({code:0}))
    // }
})

module.exports=Router