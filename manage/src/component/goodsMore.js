import React from "react";
import {connect} from "react-redux";
import withAjax from "../heightRouter/withAjax.js";
import { Table,Button,Popconfirm, message,Input   } from 'antd';
const { Search } = Input;


class GoodsMore extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [],
            select: []
        }
        this.removeOne = this.removeOne.bind(this);
        this.removeMany = this.removeMany.bind(this);
        this.gotoEdit = this.gotoEdit.bind(this);
    }
    gotoEdit(id){
        if(this.props.update){
            this.props.history.push({
                pathname:this.props.match.path+"/edit",
                search:"?id="+id
            }) 
        }else{
            message.warning("权限不足");
        }
    }
    async removeMany(){
        if (this.props.remove){
            let data = this.state.data.filter(item => !this.state.select.includes(item._id));
            this.setState({data});
            message.success("删除成功");
            await this.props.delete("http://127.0.0.1:1902/crx/removeGoods",{id:this.state.select});
        }else{
            message.warning("权限不足");
        }
    }
    async removeOne(id){
        if (this.props.remove){
            let data = this.state.data.filter(item=>item._id!==id);
            this.setState({data});
            message.success("删除成功");
            await this.props.delete("http://127.0.0.1:1902/crx/removeGoods",{id})
        }else{
            message.warning("权限不足");
        }
    }
    async searchData(value){
        let {data} = await this.props.get("http://127.0.0.1:1902/crx/getGoodsMore",{checkName:value});
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
        let {data} = await get("http://127.0.0.1:1902/crx/getGoodsMore");
        data = data.map(item => {
            item.key = item._id;
            return item;
        })
        this.setState({data});
    }
    render(){
        const columns = [
            {
                title: '图片',
                dataIndex: 'picture',
                render: text => <img style={{width:"50px",height:"40px"}} src={"http://127.0.0.1:1902/" + text[0]}></img>,
            },{
                title:"标题",
                dataIndex:"title",
                render:text=><p style={{marginTop:"12px",height:"21px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                    width:"450px"
                }}>{text}</p>
            },{
                title:"类型",
                dataIndex:"type1"
            },{
                title:"现价",
                dataIndex: "newPrice"
            },{
                title:"出厂价",
                dataIndex: "oldPrice"
            },{
                title:"库存",
                dataIndex:"stock"
            },{
                title:"是否上架",
                dataIndex: "online",
                render:text=><p>{text?"是":"否"}</p>
            },{
                title:"操作",
                dataIndex:"_id",
                render:id=>{
                    return <div>
                        <Button type="primary" shape="circle" icon="edit" onClick={this.gotoEdit.bind(this,id)} />
                        <Popconfirm
                            title="您确定要删除此条数据？"
                            onConfirm={this.removeOne.bind(this,id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger" shape="circle" icon="delete" />
                        </Popconfirm>   
                    </div>
                }
            }
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    select: selectedRowKeys
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
                name: record.name,
            }),
        };
        return <div>
            <div style={{height:"50px",background:"white",padding:"10px 30px"}}>
                <Button type="primary" icon="file-add" onClick={this.dataAdd}>
                    添加
                </Button>
                <Popconfirm
                    title="您确定要删除此条数据？"
                    onConfirm={this.removeMany}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger" icon="delete">
                        删除已勾选
                    </Button>
                </Popconfirm>
                <Search
                    style={{width:"350px",marginLeft:"50px"}}
                    placeholder="请输入内容"
                    enterButton="搜索"
                    onSearch={value => this.searchData(value)}
                />
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
        </div>
    }
}

let mapStateToProps = function(state){
    return {
        insert:state.common.insert,
        update: state.common.update,
        remove: state.common.remove
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

GoodsMore = connect(mapStateToProps,mapDispatchToProps)(GoodsMore);
GoodsMore = withAjax(GoodsMore);
export default GoodsMore;