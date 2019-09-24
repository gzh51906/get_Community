const express = require("express");
let Router = express.Router();
const {formatData} = require("../common/formatData");
const {find,insert,remove,update} = require("../common/mongo");
const path = require('path');
const multer = require('multer');

// 查询资讯信息
Router.get("/getZiXunMore",async (req,res,next)=>{
    let {checkName} = req.query;
    let result;
    if(checkName){
        let check = `/${checkName}/`;
        result = await find("news",{$or:[{type1:eval(check)},{title1:eval(check)},{desc:eval(check)}]},{sort:"addTime",asc:false});
    }else{
        result = await find("news",{},{sort:"addTime",asc:false});
    }
    res.send(formatData({data:result}));
    next();
})

// 删除资讯信息
Router.delete("/removeZiXun",async (req,res,next)=>{
    let {id} = req.query;
    if(typeof(id) === "string"){
        await remove("news",{_id:id});
        res.send(formatData());
    }else{
        for(let i=0;i<id.length;i++){
            await remove("news",{_id:id[i]})
        }
        res.send(formatData());
    }
    next();
})

// 查询资讯分类
Router.get("/ziXunType",async (req,res,next)=>{
    let types = await find("manageType",{});
    for(let i=0;i<types.length;i++){
        let result = await find("news",{type1:types[i].type});
        let num = result.length;
        types[i].num = num;
    }
    res.send(formatData({data:types}));
    next();
})

// 添加类型
Router.post("/ziXunTypeAdd",async (req,res,next)=>{
    let {value} = req.body;
    let data = {type:value,date:Date.now()};
    await insert("manageType",data);
    res.send(formatData());
    next();
})

// 修改资讯信息
Router.get("/zixunupdate",async (req,res,next)=>{
    let {_id} = req.query;
    let result = await find("news",{_id});
    res.send(formatData({data:result}));
    next();
})

Router.post("/zixunupdate2",async (req,res,next)=>{
    let {_id,data} = req.body;
    await update("news",{_id},{$set:data});
    await update("manageType",{type:data.type1},{$set:{date:Date.now()}});
    res.send(formatData());
    next();
})


// 资讯添加
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

Router.post("/zixunadd", upload.single("desc_picture"), async (req, res,next) => {
    res.send(formatData({data:req.file.path}));
    next();
})

Router.post("/zixunadd2",async (req,res,next)=>{
    let {data} = req.body;
    await insert("news",data);
    await update("manageType",{type:data.type1},{$set:{date:Date.now()}});
    res.send(formatData());
    next();
})


module.exports = Router;