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

let baseUrl = "http://www.dunkhome.com";
let url = "http://www.dunkhome.com/news?c=hot&page=7";

let data6 = require("../../json/data6.json");

// 爬取数据
Router.post("/loadingData", async (req, res, next) => {
    let dataArr = [];
    for(let i=0;i<data6.length;i++){
        let obj = {};
        // 类型
        obj.type1 = "热门";
        let html = await getHtml(data6[i]);
        let $ = cheerio.load(html);
        // 标题
        let title1 = $(".column-left .ns-main>h3").text().trim();
        obj.title1 = title1;
        // 时间
        obj.addTime = Date.now();
        // 观看的次数
        obj.seeNum = 0;
        // 评论次数
        obj.commentNum = 0;
        // 作者
        obj.author = "";
        // 描述
        obj.desc = [];
        $(".column-left .ns-main .content>p").each((i,item)=>{
            let desc = $(item).text().trim();
            obj.desc.push(desc);
        })
        // 图片路径
        obj.imgUrl = [];
        $(".column-left .ns-main .content>p img").each((i,item)=>{
            let imgUrl = $(item).attr($(item).attr("data-src") ? "data-src" : "src").trim();
            let filename = "./img/" + "ziXun" + path.basename(imgUrl);
            request(imgUrl).pipe(fs.createWriteStream(filename));
            obj.imgUrl.push(filename);
        })
        dataArr.push(obj);
        console.log(i);
    }
    await insert("news",dataArr,true);
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