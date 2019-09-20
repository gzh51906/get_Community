const http = require("http");
const https = require("https");
const cheerio = require("cheerio");
const express = require("express");
const request = require('request');
const path = require('path');
const fs = require("fs");
const iconv = require('iconv-lite');

let Router = express.Router();

const {
    insert
} = require("../common/mongo");

// let baseUrl = "http://www.dunkhome.com";
// let url = "http://www.dunkhome.com/products/search?c_id=6";

let goods6 = require("../../json/goods6.json");

// 爬取数据
Router.post("/loadingData2", async (req, res, next) => {
    let arr = [];
    for(let i=0;i<goods6.length;i++){
        let obj = {};
        // 类型1
        obj.type1 = "裤装";
        let html = await getHtml(goods6[i]);
        let $ = cheerio.load(html);
        // 类型2
        obj.type2 = [];
        $(".product_labels>a").each((i,e)=>{
            obj.type2.push($(e).text().trim());
        })
        // 标题
        obj.title = $(".column_mn h1.product_title").text().trim();
        //价格
        obj.newPrice = Number($(".cart_header .cart_price .price_current").text().trim().slice(1));
        obj.oldPrice = Number($(".cart_header .cart_price .price_origin").text().trim().slice(1));
        // 颜色尺寸
        obj.select = {};
        obj.select.title = $(".cart_tb #s-size-box>dl").eq(0).find("ul").attr("data-property").trim();
        obj.select.data = JSON.parse($(".cart_tb #s-size-box>dl").eq(0).find("ul").attr("data-ships").trim());
        //库存
        obj.stock = 999;
        // 是否上架
        obj.online = true;
        // 详细信息
        obj.details = {};
        obj.details.imgUrl = [];
        obj.details.text = [];
        $(".panel_content>p").each((j,e)=>{
            obj.details.text.push($(e).text().trim());
        })
        $(".panel_content>p img").each((j,e)=>{
            let url = $(e).attr("src").trim();
            let filename = "./img/" + "goods" + path.basename(url);
            obj.details.imgUrl.push(filename);
            request(url).pipe(fs.createWriteStream(filename));
        })
        // 商品图片
        obj.picture = [];
        $(".c_pikachoose input").each((j, e) => {
            let url = $(e).val().trim();
            let filename = "./img/" + "goods" + j + Date.now() + path.basename(url);
            obj.picture.push(filename);
            request(url).pipe(fs.createWriteStream(filename));
        })
        arr.push(obj);
        console.log(i);
    }
    await insert("goods",arr,true);
})

function getHtml(url) {
    return new Promise((resolve, reject) => {
        http.get(url, function (res) {
            var html = '';

            res.on('data', function (data) {
                html += data.toString('utf-8');
            })
            res.on('end', function () {
                resolve(html); //把当前的获取到页面的html返回回去（传递下去）
            })

        }).on('error', function (e) {
            reject(e);
            console.log("获取课程数据出错！");
        })
    })
}





module.exports = Router;