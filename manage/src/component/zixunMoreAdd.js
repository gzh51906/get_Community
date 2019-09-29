import React from "react";
import {connect} from "react-redux";
import withAjax from "../heightRouter/withAjax.js";
import { Input,Select,Button,Upload, Icon, Modal, message   } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

class ZiXunMoreAdd extends React.Component{
    constructor(){
        super();
        this.state = {
            data:{
                title1:"",
                type1:"热门",
                addTime:0,
                seeNum:0,
                commentNum:0,
                author:"",
                desc:[],
                imgUrl:[]
            },
            type:[],
            previewVisible: false,
            previewImage: '',
            fileList:[]
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.dataAdd = this.dataAdd.bind(this);
    }
    async dataAdd(){
        if(this.state.data.title1){
            let data = this.state.data;
            data.addTime = Date.now();
            this.setState({data});
            await this.props.post("http://49.232.25.17:1902/crx/zixunadd2",{data:this.state.data});
            this.props.history.replace("/zixunmore");
        }else{
            message.warning("标题不能为空");
        }
        
    }
    handleChange(result){
        let {fileList} = result;
        this.setState({fileList});
        if (result.file.response){
            let img = result.file.response.data;
            let data = this.state.data;
            data.imgUrl.push(img);
            this.setState({data});
        }
    } 
    async handlePreview(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    handleCancel(){ 
        this.setState({previewVisible: false});
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
        let result2 = await get("http://49.232.25.17:1902/crx/ziXunType");
        let type = result2.data;
        this.setState({type});
    }
    render(){
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div style={{marginTop:"8px",color:"#666"}}>上传</div>
            </div>
        );
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
                <label style={{verticalAlign:"top",width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>描述内容：</label>
                <TextArea onBlur={e=>{
                    let desc = e.target.value.split(":;");
                    let data = this.state.data;
                    data.desc = desc;
                    this.setState({data});
                }} rows={4} style={{width:"500px"}} />
            </div>
            <div style={{marginBottom:"15px"}}>
                <label style={{verticalAlign:"top",width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>描述图片：</label>
                <div style={{overflow:"hidden",display:"inline-block",width:"500px"}}>
                    <Upload
                    action="http://49.232.25.17:1902/crx/zixunadd"
                    listType="picture-card"
                    name="desc_picture"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    >
                    {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            </div>
            <Button onClick={this.dataAdd} type="primary" style={{marginLeft:"100px"}}>添加</Button>
        </div>
    }
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
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

ZiXunMoreAdd = connect(mapStateToProps,mapDispatchToProps)(ZiXunMoreAdd);
ZiXunMoreAdd = withAjax(ZiXunMoreAdd);
export default ZiXunMoreAdd;