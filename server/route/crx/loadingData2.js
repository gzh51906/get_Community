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