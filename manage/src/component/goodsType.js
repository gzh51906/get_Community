import React from "react";
import {connect} from "react-redux";
import withAjax from "../heightRouter/withAjax.js";
import { Table, message,Input  } from 'antd';
const { Search } = Input;


class GoodsType extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[]
        }
        this.addType = this.addType.bind(this);
    }
    async addType(value){
        await this.props.post("http://127.0.0.1:1902/crx/addGoodsType",{type:value,date:Date.now()});
        let {data} = await this.props.get("http://127.0.0.1:1902/crx/getGoodsType");
        data = data.map(item => {
            item.key = item._id;
            return item;
        })
        this.setState({data});
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
        let {data} = await get("http://127.0.0.1:1902/crx/getGoodsType");
        data = data.map(item => {
            item.key = item._id;
            return item;
        })
        this.setState({data});
    }
    render(){
        const columns = [{
            title: '商品类型',
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
            <div style={{padding:"15px 200px"}}>
                <Search
                    placeholder="请输入添加的类型"
                    enterButton="添加"
                    size="large"
                    onSearch={value => this.addType(value)}
                />
            </div>
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

GoodsType = connect(mapStateToProps, mapDispatchToProps)(GoodsType);
GoodsType = withAjax(GoodsType);
export default GoodsType;