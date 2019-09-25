import React from "react";
import withAjax from "../heightRouter/withAjax.js";
import {connect} from "react-redux";
import { Input,Select,Button   } from 'antd';
const { Option } = Select;

class ManageUserEdit extends React.Component{
	constructor(){
		super();
		this.state = {
			data:{},
			_id:""
		}
		this.update = this.update.bind(this);
	}
	async update(){
		await this.props.patch("http://127.0.0.1:1902/crx/manageUser_update",this.state);
		this.props.history.replace("/manageuser");
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
		let id = this.props.location.search.slice(1).split("=")[1];
		this.setState({_id:id});
		let {data} = await get("http://127.0.0.1:1902/crx/manageUser_byId",{_id:id});
		data = data[0];
		delete data._id;
		this.setState({data});
	}
	render(){
		return <div style={{padding:"15px 150px 0"}}>
			<div style={{marginBottom:"15px"}}>
			    <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>管理员：</label>
			    <Input style={{width:"150px"}} value={this.state.data.username}
			        onChange={e=>{
			            let data = this.state.data;
			            data.username = e.target.value;
			            this.setState({data});
			        }}
			    />
			</div>
			<div style={{marginBottom:"15px"}}>
			    <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>密码：</label>
			    <Input type="password" style={{width:"150px"}} value={this.state.data.password}
			        onChange={e=>{
			            let data = this.state.data;
			            data.password = e.target.value;
			            this.setState({data});
			        }}
			    />
			</div>
			<div style={{marginBottom:"15px"}}>
			    <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>管理权限：</label>
			    <Select style={{ width: 120 }} 
					onChange={val=>{
						let type = Boolean(val);
						let data = this.state.data;
						data.manage = type;
						this.setState({data});
					}}
				>
					<Option value={1}>是</Option>
					<Option value={0}>否</Option>
			    </Select>
			</div>
			<div style={{marginBottom:"15px"}}>
			    <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>修改权限：</label>
			    <Select style={{ width: 120 }} 
					onChange={val=>{
						let type = Boolean(val);
						let data = this.state.data;
						data.update = type;
						this.setState({data});
					}}
				>
					<Option value={1}>是</Option>
					<Option value={0}>否</Option>
			    </Select>
			</div>
			<div style={{marginBottom:"15px"}}>
			    <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>添加权限：</label>
			    <Select style={{ width: 120 }} 
					onChange={val=>{
						let type = Boolean(val);
						let data = this.state.data;
						data.insert = type;
						this.setState({data});
					}}
				>
					<Option value={1}>是</Option>
					<Option value={0}>否</Option>
			    </Select>
			</div>
			<div style={{marginBottom:"15px"}}>
			    <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>删除权限：</label>
			    <Select style={{ width: 120 }} 
					onChange={val=>{
						let type = Boolean(val);
						let data = this.state.data;
						data.remove = type;
						this.setState({data});
					}}
				>
					<Option value={1}>是</Option>
					<Option value={0}>否</Option>
			    </Select>
			</div>
			<Button onClick={this.update} style={{margin:"10px 0 0 100px"}} type="primary">确认修改</Button>
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

ManageUserEdit = connect(mapStateToProps,mapDispatchToProps)(ManageUserEdit);
ManageUserEdit = withAjax(ManageUserEdit);
export default ManageUserEdit;