import React from "react";
import withAjax from "../heightRouter/withAjax.js";
import {connect} from "react-redux";
import { Button,Table,Popconfirm, message  } from 'antd';

class ManageUser extends React.Component{
	constructor(){
		super();
		this.state = {
			data:[]
		}
		this.remove = this.remove.bind(this);
		this.gotoEdit = this.gotoEdit.bind(this);
		this.gotoAdd = this.gotoAdd.bind(this);
	}
	async remove(id){
		if(this.props.manage){
			let author = localStorage.getItem("author");
			let {data} = await this.props.get("http://49.232.25.17:1902/crx/manageUser_byId",{_id:id});
			if(author === data[0].username){
				message.error("删除失败");
			}else{
				let data = this.state.data;
				data = data.filter(item=>item._id!==id);
				this.setState({data});
				await this.props.delete("http://49.232.25.17:1902/crx/manageUser_Remove",{_id:id});
				message.success("删除成功");
			}
			
		}else{
			message.warning("只有拥有管理权限的管理员才能做此操作");
		}
	}
	gotoAdd(){
		if(this.props.manage){
			this.props.history.push({
				pathname:this.props.match.path+"/add"
			})
		}else{
			message.warning("只有拥有管理权限的管理员才能做此操作");
		}
	}
	gotoEdit(id){
		if(this.props.manage){
			this.props.history.push({
				pathname:this.props.match.path+"/edit",
				search:"?id="+id
			})
		}else{
			message.warning("只有拥有管理权限的管理员才能做此操作");
		}
	}
	async componentDidMount(){
		let {get} = this.props;
		let authorName = localStorage.getItem("author");
		if (authorName){
		    let result = await get("http://49.232.25.17:1902/crx/userMore",{username:authorName});
		    let {manage,insert,update,remove} = result.data[0];
		    this.props.changeType({type:"changeType",author:authorName,manage,insert,update,remove});
		}else{
		    localStorage.removeItem("listTitle");
		    this.props.removeUser();
		}
		let {data} = await get("http://49.232.25.17:1902/crx/manageUser_get");
		data = data.map(item=>{
			item.key = item._id;
			return item;
		})
		this.setState({data});
	}
	render(){
		const columns = [{
				title: '管理员',
				align:"center",
				dataIndex: 'username'
		 },{
				title: '管理权限',
				dataIndex: 'manage',
				align:"center",
				render:val=><p style={{marginBottom:"0"}}>{val?"是":"否"}</p>
		 },{
				title: '修改权限',
				dataIndex: 'update',
				align:"center",
				render:val=><p style={{marginBottom:"0"}}>{val?"是":"否"}</p>
		 },{
				title: '添加权限',
				dataIndex: 'insert',
				align:"center",
				render:val=><p style={{marginBottom:"0"}}>{val?"是":"否"}</p>
		 },{
				title: '删除权限',
				dataIndex: 'remove',
				align:"center",
				render:val=><p style={{marginBottom:"0"}}>{val?"是":"否"}</p>
		 },{
				title: '操作',
				dataIndex: '_id',
				align:"center",
				render:id=>{
					return <div>
						<Button type="link" onClick={this.gotoEdit.bind(this,id)}>修改</Button>
						<Popconfirm
						    title="确定删除此管理员账号?"
						    onConfirm={this.remove.bind(this,id)}
						    okText="Yes"
						    cancelText="No"
						>
						    <Button style={{color:"red"}} type="link">删除</Button>
						</Popconfirm>
					</div>
				}
		 }];
		return <div>
			<Button onClick={this.gotoAdd} style={{margin:"25px 0 10px 50px"}} type="danger">添加管理人员</Button>,
			<Table columns={columns} dataSource={this.state.data} size="middle" />
		</div>
	}
}


let mapStateToProps = function(state){
    return {
        manage:state.common.manage
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

ManageUser = connect(mapStateToProps,mapDispatchToProps)(ManageUser);
ManageUser = withAjax(ManageUser);
export default ManageUser;