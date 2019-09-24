import React from "react";
import {connect} from "react-redux";
import withAjax from "../heightRouter/withAjax.js";
import { Input,Select,Button   } from 'antd';
const { Option } = Select;

class ZiXunMoreEdit extends React.Component{
    constructor(){
        super();
        this.state = {
            data:{},
            type:[],
            imgUrl:[]
        }
        this.didOk = this.didOk.bind(this);
    }
    async didOk(){
        let _id = this.props.location.search.slice(1).split("=")[1];
        let data = this.state.data;
        data.addTime = Date.now();
        this.setState({data});
        await this.props.post("http://127.0.0.1:1902/crx/zixunupdate2",{_id,data});
        this.props.history.replace("/zixunmore");
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
        let {data} = await get("http://127.0.0.1:1902/crx/zixunupdate",{_id});
        let result = data[0];
        delete result._id;
        this.setState({data:result});
        let result2 = await get("http://127.0.0.1:1902/crx/ziXunType");
        let type = result2.data;
        this.setState({type});
        this.setState({imgUrl:result.imgUrl})
    }
    render(){
        return <div style={{padding:"15px 50px 0"}}>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>标题：</label>
                <Input style={{width:"500px"}} value={this.state.data.title1}
                    onChange={e=>{
                        let data = this.state.data;
                        data.title1 = e.target.value;
                        this.setState({data});
                    }}
                />
            </div>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>作者：</label>
                <Input style={{width:"150px"}} value={this.state.data.author}
                    onChange={e=>{
                        let data = this.state.data;
                        data.author = e.target.value;
                        this.setState({data});
                    }}
                />
            </div>
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>类型：</label>
                <Select defaultValue="热门" style={{ width: 120 }} 
                onChange={val=>{
                    let data = this.state.data;
                    data.type1 = val;
                    this.setState({data});
                }}>
                    {
                        this.state.type.map(item=><Option key={item._id} value={item.type}>{item.type}</Option>)
                    }
                </Select>
            </div>
            <div style={{marginBottom:"15px"}}>
                {
                    this.state.imgUrl.map((item,i)=><img style={{width:"150px",height:"100px",
                        margin:"20px"
                    }} src={"http://127.0.0.1:1902/"+item} key={i}></img>)
                }
            </div>
            <div>
                <Button onClick={this.didOk} style={{marginLeft:"30px"}} size="large" type="primary">确定</Button>
            </div>
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

ZiXunMoreEdit = connect(mapStateToProps,mapDispatchToProps)(ZiXunMoreEdit);
ZiXunMoreEdit = withAjax(ZiXunMoreEdit);
export default ZiXunMoreEdit;