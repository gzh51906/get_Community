const express = require("express");
let Router = express.Router();
const {formatData} = require("../common/formatData");
const {find,insert,remove,update} = require("../common/mongo");

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



module.exports = Router;