import React from "react";
import withAjax from "../heightRouter/withAjax.js";
import {connect} from "react-redux";
import { Input,Table  } from 'antd';
const { Search } = Input;


class OrderMore extends React.Component{
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
		let result = await get("http://127.0.0.1:1902/crx/order_get");
		let data = getData(result);
		this.setState({data});
	}
	render(){
		const columns = [{
			title: '买家',
			align:"center",
			dataIndex: 'allgoods.username'
		},{
			title: '商品图片',
			align:"center",
			dataIndex: 'allgoods.picture',
			render:img=><img style={{width:"40px",height:"30px"}} src={"http://127.0.0.1:1902/"+img} />
		},{
			title: '商品标题',
			dataIndex: 'allgoods.name',
			render:text=><p style={{width:"300px",margin:"0",height:"21px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{text}</p>
		},{
			title: '颜色',
			align:"center",
			dataIndex: 'allgoods.color'
		},{
			title: '尺寸',
			align:"center",
			dataIndex: 'allgoods.size'
		},{
			title: '单价（元）',
			align:"center",
			dataIndex: 'allgoods.price'
		},{
			title: '数量',
			align:"center",
			dataIndex: 'allgoods.qty'
		},{
			title: '总价（元）',
			align:"center",
			dataIndex: 'allgoods',
			render:text=><p style={{margin:"0"}}>{text.qty*text.price}</p>
		},{
			title: '购买时间',
			align:"center",
			dataIndex: 'allgoods.time',
			render:text=><p style={{margin:"0"}}>{this.props.formatDate(text,"-",true,true)}</p>
		},{
			title:"订单状态",
			align:"center",
			dataIndex:"allgoods.refund",
			render:type=><p style={{margin:"0"}}>{type?"完成":"待退款"}</p>
		}]
		return <div>
			<div style={{padding:"20px 200px"}}>
				<Search placeholder="请输入买家用户名" onSearch={value => console.log(value)} enterButton />
			</div>
			<Table columns={columns} dataSource={this.state.data} />
		</div>
	}
}

function getData(result){
	let arr1 = result.data;
	if(arr1.length>0){
		let arr2 = [];
		arr1.forEach(item=>{
			item.allgoods.forEach((e,i)=>{
				let obj = {};
				obj.key = e._id+i+Math.random();
				obj.allgoods = e;
				obj.allgoods.parentId = item._id;
				arr2.push(obj);
			})
		})
		return arr2;
	}else{
		return [];
	}
}

let mapStateToProps = function(state){
    return {
        insert:state.common.insert,
        update:state.common.update,
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

OrderMore = connect(mapStateToProps,mapDispatchToProps)(OrderMore);
OrderMore = withAjax(OrderMore);
export default OrderMore;