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
// const loadingData = require("./crx/loadingData");
// Router.use("/crx",loadingData);
// const loadingData2 = require("./crx/loadingData2");
// Router.use("/crx",loadingData2);
const manage_login = require("./crx/login");
Router.use("/crx",manage_login);
const manage_zixun = require("./crx/manageZiXun");
Router.use("/crx", manage_zixun);
const manage_goods = require("./crx/manageGoods");
Router.use("/crx",manage_goods);
const manage_user = require("./crx/manageUser");
Router.use("/crx",manage_user);

//苏沛龙引入的

const New =require("./spl/New.js")
Router.use("/spl",New)
const Cart = require("./spl/Cart.js")
Router.use("/spl",Cart)


//黄日隆引入的
const Login = require('./hrl/huser.js');
const Reg = require('./hrl/hRes.js');
const Saogoods = require('./hrl/hsaogoods.js');
const Allgoods = require('./hrl/hallgoods.js');
const Goodsprice = require('./hrl/hgoodsprice.js');
const Sgin = require('./hrl/sign.js');
Router.use('/hrl',Sgin);
Router.use('/hrl',Goodsprice);
Router.use('/hrl',Allgoods);
Router.use('/hrl',Saogoods);
Router.use('/hrl',Reg);
Router.use('/hrl',Login);

// 崔宇灏引入的

module.exports = Router;