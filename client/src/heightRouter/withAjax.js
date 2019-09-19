import React from "react";
import axios from "axios";

// 封装请求方法、时间格式化

function withAjax(Component){
    let ajax = {
        async get(url,data){
            if(data){
                let result = await axios.get(url,{params:data});
                return result.data;
            }else{
                let result = await axios.get(url);
                return result.data;
            }
        },
        async post(url,data){
            let result = await axios.post(url, data);
            return result.data;
        },
        async delete(url,data){
            let result = await axios.delete(url,{params:data});
            return result.data;
        },
        async patch(url,data){
            let result = await axios.patch(url, data);
            return result.data;
        },
        formatDate(time, format, two = true, hour = false, week = false){
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
    }
    return class WrapComponent extends React.Component{
        render(){
            return <Component {...this.props} {...ajax} />
        }
    }
}

export default withAjax;