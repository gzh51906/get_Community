import React from "react";
import withAjax from "../heightRouter/withAjax.js";
import {connect} from "react-redux";
import { Button,Table,Popconfirm, message  } from 'antd';


class ClientUser extends React.Component{
	constructor(){
		super();
		this.state = {
			data:[]
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
		let {data} = await get("http://127.0.0.1:1902/crx/appUser_get");
		data = data.map(item=>{
			item.key = item._id;
			return item
		})
		this.setState({data});
	}
	render(){
		const columns = [{
				title: '用户名',
				align:"center",
				dataIndex: 'usename'
		 },{
				title: '手机号',
				align:"center",
				dataIndex: 'phoneNum'
		 },{
				title: '注册时间',
				align:"center",
				dataIndex: 'regTime',
				render:time=><p style={{margin:"0"}}>{this.props.formatDate(time,"-")}</p>
		 },{
				title: '最近登录时间',
				align:"center",
				dataIndex: 'logTime',
				render:time=><p style={{margin:"0"}}>{this.props.formatDate(time,"-")}</p>
		 },{
				title:"今天是否已签到",
				align:"center",
				dataIndex:"sginTime",
				render:time=><p style={{margin:"0"}}>{this.props.formatDate(time,"-")===this.props.formatDate(Date.now(),"-")?"是":"否"}</p>
		 },{
				title:"操作",
				align:"center",
				dataIndex:"_id"
		 }];
		return <div style={{marginTop:"20px"}}>
			<Table columns={columns} dataSource={this.state.data} size="middle" />
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

ClientUser = connect(mapStateToProps,mapDispatchToProps)(ClientUser);
ClientUser = withAjax(ClientUser);
export default ClientUser;