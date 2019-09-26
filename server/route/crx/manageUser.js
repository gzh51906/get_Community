const express = require("express");
let Router = express.Router();
const {formatData} = require("../common/formatData");
const {find,insert,remove,update} = require("../common/mongo");

Router.get("/manageUser_get",async (req,res,next)=>{
	let result = await find("manageUser",{});
	res.send(formatData({data:result}));
	next();
})

// 根据id值获取对应的管理员信息
Router.get("/manageUser_byId",async (req,res,next)=>{
	let {_id} = req.query;
	let result = await find("manageUser",{_id});
	res.send(formatData({data:result}));
	next();
})

// 修改管理人员数据
Router.patch("/manageUser_update",async (req,res,next)=>{
	let {_id,data} = req.body;
	await update("manageUser",{_id},{$set:data});
	res.send(formatData());
	next();
})





module.exports = Router;