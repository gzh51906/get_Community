import React from "react";
import {connect} from "react-redux";
import withAjax from "../heightRouter/withAjax.js";
import { Input,message,Button  } from 'antd';


class ZiXunTypeAdd extends React.Component{
    constructor(){
        super();
        this.requestOK = this.requestOK.bind(this);
    }
    async requestOK(){
        let val = this.refs.typeContent.state.value;
        if(val){
            await this.props.post("http://127.0.0.1:1902/crx/ziXunTypeAdd",{value:val});
            message.success("添加成功");
            this.props.history.push("/zixuntype");
        }else{
            message.warning("内容不能为空");
        }
    }
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
        return <div style={{marginTop:"20px",padding:"140px 100px 0 200px"}}>
            <label htmlFor="typeName" style={{fontSize:"18px",fontWeight:"700",marginRight:"20px"}}>资讯类型:</label>
            <Input ref="typeContent" style={{width:"400px"}} size="large" id="typeName" placeholder="请输入添加的类型" />
            <Button onClick={this.requestOK} type="primary" style={{display:"block",margin:"30px 0 0 97px"}}>确定</Button>
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