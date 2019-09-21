import React from "react";
import {connect} from "react-redux";
import withAjax from "../heightRouter/withAjax.js";


class ZiXunTypeAdd extends React.Component{
    async componentDidMount(){
        let {get} = this.props;
        let authorName = localStorage.getItem("author");
        if (authorName){
            let result = await get("http://127.0.0.1:1902/crx/userMore",{username:authorName});
            let {manage,insert,update,remove} = result.data[0];
            this.props.changeType({type:"changeType",author:authorName,manage,insert,update,remove});
        }else{
            localStorage.removeItem("listTitle");
            this.props.removeUser();
        }
    }
    render(){
        return <div>
            资讯分类添加
        </div>
    }
}

let mapStateToProps = function(state){
    return {
        
    }
}
let mapDispatchToProps = function(dispatch){
    return {
        removeUser(){
            dispatch({type:"removeUser"})
        },
        changeType(action){
            dispatch(action);
        }
    }
}

ZiXunTypeAdd = connect(mapStateToProps, mapDispatchToProps)(ZiXunTypeAdd);
ZiXunTypeAdd = withAjax(ZiXunTypeAdd);
export default ZiXunTypeAdd;