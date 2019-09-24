import React from "react";
import {connect} from "react-redux";
import withAjax from "../heightRouter/withAjax.js";
import { Table, message } from 'antd';


class ZiXunType extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[]
        }
        this.gotoAdd = this.gotoAdd.bind(this);
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
        let {data} = await get("http://127.0.0.1:1902/crx/ziXunType");
        data = data.map(item => {
            item.key = item._id;
            return item;
        })
        this.setState({data});
    }
    gotoAdd(){
        if(this.props.insert){
            this.props.history.push(this.props.match.path+"/add");
        }else{
            message.warning("权限不足");
        }
    }
    render(){
        const columns = [{
            title: '资讯类型',
            dataIndex: 'type'
        },{
            title: '数量',
            dataIndex: 'num',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.num - b.num,
        },{
            title: '最近修改时间',
            dataIndex: 'date',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.date - b.date,
            render:item=><p style={{marginTop:"10px"}}>{this.props.formatDate(item,"-",true,true)}</p>
        }]
        return <div>
            <h1 style={{height:"50px",background:"yellowgreen",lineHeight:"50px",
                textAlign:"center",fontSize:"22px",color:"blue",marginBottom:"15px",
                cursor:"pointer"
            }} onClick={this.gotoAdd}>添加类型</h1>
            <Table columns={columns} dataSource={this.state.data} />
        </div>
    }
}

let mapStateToProps = function(state){
    return {
        insert:state.common.insert
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

ZiXunType = connect(mapStateToProps, mapDispatchToProps)(ZiXunType);
ZiXunType = withAjax(ZiXunType);
export default ZiXunType;