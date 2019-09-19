//引入token，状态保留
const jwt = require("jsonwebtoken");

//定义加密的密钥
const secret = "ririxinglong";

//生成token的方法
function create(data, expiresIn = 60 * 60 * 24 * 7) {
    /** 
     * data是传进来加密的数据
     * expiresIn是令牌的有效时间(单位为：s)
     */
    let token = jwt.sign({
        data
    }, secret, {
        expiresIn
    });
    return token;
}

//校验token是否过期以及是否被修改
function verify(token) {
    let res = false;
    try {
        res = jwt.verify(token, secret);
    } catch (err) {
        res = false;
    }
    return res;
}

// 格式化时间
function formatDate(time, format, two = true, hour = false, week = false) {
    /** 
     * time： 传进来的时间
     * format：连接时间的符号，比如"/"、"-"等
     * two：当月份等为一位数的时候，是否需要自动补0，默认为自动补0
     * hour：是否需要返回时间00:00:00，默认不需要
     * week：是否需要返回星期，默认不需要
     */
    // 创建一个时间
    let date = new Date(time);
    // 获取年份
    let years = date.getFullYear();
    // 获取月份
    let months = date.getMonth() + 1;
    // 获取时间的号数
    let days = date.getDate();
    // 获取时间的星期数
    let weekNum = date.getDay();
    let weeks;
    // 获取小时
    let hours = date.getHours();
    // 获取分钟
    let minutes = date.getMinutes();
    // 获取秒数
    let seconds = date.getSeconds();
    // 定义时间
    let date1, date2, result;
    switch (weekNum) {
        case 0:
            weeks = "Sunday";
            break;
        case 1:
            weeks = "Monday";
            break;
        case 2:
            weeks = "Tuesday";
            break;
        case 3:
            weeks = "Wednesday";
            break;
        case 4:
            weeks = "Thursday";
            break;
        case 5:
            weeks = "Friday";
            break;
        case 6:
            weeks = "Saturday";
            break;
    }
    if (two) {
        date1 = `${years}${format}${months<10?"0"+months:months}${format}${days<10?"0"+days:days}`;
        date2 = `${hours<10?"0"+hours:hours}:${minutes<10?"0"+minutes:minutes}:${seconds<10?"0"+seconds:seconds}`;
    } else {
        date1 = `${years}${format}${months}${format}${days}`;
        date2 = `${hours}:${minutes}:${seconds}`;
    }
    if (hour) {
        result = date1 + " " + date2;
    } else {
        result = date1;
    }
    if (week) {
        result = result + " " + weeks;
    }
    return result;
}

module.exports = {
    create,
    verify,
    formatDate
}