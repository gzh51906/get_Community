import React from "react";
import {connect} from "react-redux";
import withAjax from "../heightRouter/withAjax.js";
import { Input,Select,Button   } from 'antd';
const { Option } = Select;

class GoodsEdit extends React.Component{
    constructor(){
        super();
        this.state = {
            data: {},
            type: []
        }
        this.didOK = this.didOK.bind(this);
    }
    async didOK(){
        let _id = this.props.location.search.slice(1).split("=")[1];
        let data = this.state.data;
        await this.props.post("http://127.0.0.1:1902/crx/goodsUpdate",{_id,data});
        this.props.history.replace("/goodsmore");
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
        let _id = this.props.location.search.slice(1).split("=")[1];
        let {data} = await get("http://127.0.0.1:1902/crx/goodsIdGet",{_id});
        let result = data[0];
        delete result._id;
        this.setState({data:result});
        // 获取商品类型
        let type_result = await get("http://127.0.0.1:1902/crx/getGoodsType");
        let type = type_result.data.map(item=>item.type);
        this.setState({type});
    }
    render(){
        return <div style={{padding:"15px 50px 0"}}>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>标题：</label>
                <Input style={{width:"500px"}} value={this.state.data.title}
                    onChange={e=>{
                        let data = this.state.data;
                        data.title = e.target.value;
                        this.setState({data});
                    }}
                />
            </div>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>类型：</label>
                <Select defaultValue="篮球鞋" style={{ width: 120 }} 
                onChange={val=>{
                    let data = this.state.data;
                    data.type1 = val;
                    this.setState({data});
                }}>
                    {
                        this.state.type.map((item,i)=><Option key={i} value={item}>{item}</Option>)
                    }
                </Select>
            </div>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>现价：</label>
                <Input style={{width:"100px"}} value={this.state.data.newPrice}
                    onChange={e=>{
                        let data = this.state.data;
                        data.newPrice = Number(e.target.value);
                        this.setState({data});
                    }}
                />
            </div>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>出厂价：</label>
                <Input style={{width:"100px"}} value={this.state.data.oldPrice}
                    onChange={e=>{
                        let data = this.state.data;
                        data.oldPrice = Number(e.target.value);
                        this.setState({data});
                    }}
                />
            </div>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>库存：</label>
                <Input style={{width:"100px"}} value={this.state.data.stock}
                    onChange={e=>{
                        let data = this.state.data;
                        data.stock = Number(e.target.value);
                        this.setState({data});
                    }}
                />
            </div>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>是否上架：</label>
                <Select style={{ width: 120 }} 
                onChange={val=>{
                    let online = Boolean(val);
                    let data = this.state.data;
                    data.online = online;
                    this.setState({data});
                }}>
                <Option value={1}>是</Option>
                <Option value={0}>否</Option>
                </Select>
            </div>
            <Button style={{margin:"20px 0 0 100px"}} onClick={this.didOK} type="primary">确认修改</Button>
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

GoodsEdit = connect(mapStateToProps,mapDispatchToProps)(GoodsEdit);
GoodsEdit = withAjax(GoodsEdit);
export default GoodsEdit;