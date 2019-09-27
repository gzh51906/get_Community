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
		this.delete = this.delete.bind(this);
	}
	async delete(id){
		if(this.props.remove){
			let data = this.state.data.filter(item=>item._id===id)[0];
			let time = Math.floor((Date.now() - data.logTime)/(1000*60*60*24));
			if(time>300){
				let data = this.state.data.filter(item=>item._id!==id);
				this.setState({data});
				message.success("删除成功");
				await this.props.delete("http://127.0.0.1:1902/crx/appUser_remove",{_id:id});
			}else{
				message.error("删除失败，用户最近登录时间还未超过300天");
			}
		}else{
			message.warning("权限不足");
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
				dataIndex: 'loginTime',
				render:time=><p style={{margin:"0"}}>{this.props.formatDate(time,"-")}</p>
		 },{
				title:"今天是否已签到",
				align:"center",
				dataIndex:"sginTime",
				render:time=><p style={{margin:"0"}}>{this.props.formatDate(time,"-")===this.props.formatDate(Date.now(),"-")?"是":"否"}</p>
		 },{
				title:"已有金币",
				align:"center",
				dataIndex:"coin"
		 },{
				title:"操作",
				align:"center",
				dataIndex:"_id",
				render:id=> <Popconfirm
								title="确定要删除此用户吗?"
								onConfirm={this.delete.bind(this,id)}
								okText="Yes"
								cancelText="No"
							>
								<Button style={{color:"red"}} type="link">删除</Button>
							</Popconfirm>
		 }];
		return <div style={{marginTop:"20px"}}>
			<Table columns={columns} dataSource={this.state.data} size="middle" />
		</div>
	}
}


let mapStateToProps = function(state){
    return {
        remove:state.common.remove
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