import React from "react";
import withAjax from "../heightRouter/withAjax.js";
import {connect} from "react-redux";


class OrderReset extends React.Component{
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
			订单退订
		</div>
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

OrderReset = connect(mapStateToProps,mapDispatchToProps)(OrderReset);
OrderReset = withAjax(OrderReset);
export default OrderReset;