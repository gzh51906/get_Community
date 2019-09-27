const express = require("express");
let Router = express.Router();
const {formatData} = require("../common/formatData");
const {find,insert,remove,update} = require("../common/mongo");

// 获取订单信息
Router.get("/order_get",async (req,res,next)=>{
	let {username} = req.query;
	let result;
	if(username){
		result = await find("order",{"allgoods.username":eval("/"+username+"/")});
	}else{
		result = await find("order",{});
	}
	res.send(formatData({data:result}));
	next();
})





module.exports = Router;