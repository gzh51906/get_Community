const express = require("express");

let Router = express.Router();

Router.use(express.json(), express.urlencoded({
    extended: false
}));
Router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
});

//陈日兴引入的
const loadingData = require("./crx/loadingData");
Router.use("/crx",loadingData);
//苏沛龙引入的

//黄日隆引入的

// 崔宇灏引入的

module.exports = Router;