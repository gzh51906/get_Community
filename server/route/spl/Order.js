const express = require("express");

let Router = express.Router();

let {formatData} = require("../common/formatData")

let {find,update,insert,remove} = require("../common/mongo.js")


Router.get("/pay",async(req,res,next)=>{
    let {username} = req.query
    let data = await find("order",{"allgoods.username":username})

    let list = data.map((item)=>{
        return item.allgoods.filter((e)=>{
             return e.refund !=true
        })
    })
    
        res.send(formatData({data:list}))
   
})
Router.get("/refund",async(req,res,next)=>{
    
    let {username} = req.query
    let data = await find("order",{"allgoods.username":username})

    let list = data.map((item)=>{
        return item.allgoods.filter((e)=>{
             return e.refund==true
        })
    })
    
        res.send(formatData({data:list}))
})
Router.post("/changerefund",async(req,res,next)=>{
    let {id,_id} = req.body
    
    let result = await find("order",{"allgoods._id":id})
    let goodslist=result
    let list = []
    goodslist.forEach(e=>{
           list= e.allgoods.map(item=>{
                if(item._id==id){
                    item.refund=true
                }
                return item
            })
        })
        

    await update("order",{_id},{$set:{allgoods:list}})
    res.send(formatData({data:list}))
})

module.exports=Router