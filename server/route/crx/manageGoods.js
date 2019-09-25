const express = require("express");
let Router = express.Router();
const {formatData} = require("../common/formatData");
const {find,insert,remove,update} = require("../common/mongo");
const path = require('path');
const multer = require('multer');

// 获取商品数据
Router.get("/getGoodsMore",async (req,res,next)=>{
    let {checkName} = req.query;
    let result;
    if(checkName){
        let check = `/${checkName}/`;
        result = await find("goods",{$or:[{type1:eval(check)},{type2:eval(check)},{title:eval(check)},
            {"details.text":eval(check)}
        ]});
    }else{
        result = await find("goods",{});
    }
    res.send(formatData({data:result}));
    next();
})

// 删除商品数据
Router.delete("/removeGoods",async (req,res,next)=>{
    let {id} = req.query;
    if(typeof(id) === "string"){
        await remove("goods",{_id:id});
        res.send(formatData());
    }else{
        for(let i=0;i<id.length;i++){
            await remove("goods",{_id:id[i]})
        }
        res.send(formatData());
    }
    next();
})

// 获取商品类型
Router.get("/getGoodsType",async (req,res,next)=>{
    let types = await find("manageGoodsType",{});
    for(let i=0;i<types.length;i++){
        let result = await find("goods",{type1:types[i].type});
        let length = result.length;
        types[i].num = length;
    }
    res.send(formatData({data:types}));
    next();
})

// 添加商品类型
Router.post("/addGoodsType",async (req,res,next)=>{
    let {type,date} = req.body;
    await insert("manageGoodsType",{type,date});
    res.send(formatData());
    next();
})

// 根据id查询
Router.get("/goodsIdGet",async (req,res,next)=>{
    let {_id} = req.query;
    let result = await find("goods",{_id});
    res.send(formatData({data:result}));
    next();
})

// 更新商品数据
Router.post("/goodsUpdate",async (req,res,next)=>{
    let {_id,data} = req.body;
    await update("goods",{_id},{$set:data});
    await update("manageGoodsType",{type:data.type1},{$set:{date:Date.now()}});
    res.send(formatData());
    next();
})

// 商品添加
let storage = multer.diskStorage({
    destination: "./img",
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

var upload = multer({
    storage
})

Router.post("/goodsadd", upload.single("goods_picture"), async (req, res,next) => {
    res.send(formatData({data:req.file.path}));
    next();
})

Router.post("/goodsadd2",async (req,res,next)=>{
    let {data} = req.body;
    await insert("goods",data);
    await update("manageGoodsType",{type:data.type1},{$set:{date:Date.now()}});
    res.send(formatData());
    next();
})


module.exports = Router;