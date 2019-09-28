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

// 删除已完成的订单
Router.delete("/order_remove",async (req,res,next)=>{
	let {parentId,childId} = req.query;
	let result = await find("order",{_id:parentId});
	let result2 = result[0].allgoods;
	if(result2.length===1){
		await remove("order",{_id:parentId});
	}else{
		result2 = result2.filter(item=>item._id!==childId);
		await update("order",{_id:parentId},{$set:{allgoods:result2}});
	}
	
	res.send(formatData());
	next();
})





module.exports = Router;