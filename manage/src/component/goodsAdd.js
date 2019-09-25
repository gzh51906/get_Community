import React from "react";
import withAjax from "../heightRouter/withAjax.js";
import {connect} from "react-redux";
import { Input,Select,Button,Upload, Icon, Modal, message   } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

class GoodsAdd extends React.Component{
    constructor(){
        super();
        this.state = {
            data:{
                type1:"",
                type2:[],
                title:"",
                newPrice:"",
                oldPrice:"",
                select:{
                    "title" : "颜色",
                    "data" : [ 
                        {
                            "color_id" : 63,
                            "color" : "黑蓝",
                            "image" : "http://images.dunkhome.com/product/image/11064/small_JORDAN-ECLIPSE-555088_140_A_PREM___.jpg",
                            "sizes" : [ 
                                {
                                    "size_id" : 48,
                                    "size" : "40",
                                    "stock_quantity" : 2,
                                    "price" : 3559
                                }, 
                                {
                                    "size_id" : 49,
                                    "size" : "40.5",
                                    "stock_quantity" : 2,
                                    "price" : 3569
                                }, 
                                {
                                    "size_id" : 51,
                                    "size" : "41",
                                    "stock_quantity" : 2,
                                    "price" : 3789
                                }, 
                                {
                                    "size_id" : 54,
                                    "size" : "42",
                                    "stock_quantity" : 2,
                                    "price" : 3729
                                }, 
                                {
                                    "size_id" : 55,
                                    "size" : "42.5",
                                    "stock_quantity" : 2,
                                    "price" : 3399
                                }, 
                                {
                                    "size_id" : 57,
                                    "size" : "43",
                                    "stock_quantity" : 2,
                                    "price" : 3179
                                }, 
                                {
                                    "size_id" : 60,
                                    "size" : "44",
                                    "stock_quantity" : 2,
                                    "price" : 2459
                                }, 
                                {
                                    "size_id" : 61,
                                    "size" : "44.5",
                                    "stock_quantity" : 2,
                                    "price" : 2219
                                }, 
                                {
                                    "size_id" : 63,
                                    "size" : "45",
                                    "stock_quantity" : 2,
                                    "price" : 2059
                                }, 
                                {
                                    "size_id" : 65,
                                    "size" : "45.5",
                                    "stock_quantity" : 1,
                                    "price" : 2299
                                }, 
                                {
                                    "size_id" : 66,
                                    "size" : "46",
                                    "stock_quantity" : 1,
                                    "price" : 2199
                                }, 
                                {
                                    "size_id" : 71,
                                    "size" : "47.5",
                                    "stock_quantity" : 1,
                                    "price" : 2399
                                }
                            ]
                        }
                    ]
                },
                stock:999,
                online:true,
                picture:[],
                details:{
                    imgUrl:[],
                    text:[]
                }
            },
            types:[],
            isOk:false,
			previewVisible: false,
			previewImage: '',
			fileList:[],
			previewVisible2: false,
			previewImage2: '',
			fileList2:[]
        }
		this.handleCancel = this.handleCancel.bind(this);
		this.handlePreview = this.handlePreview.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCancel2 = this.handleCancel2.bind(this);
		this.handlePreview2 = this.handlePreview2.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		this.dataAdd = this.dataAdd.bind(this);
    }
	async dataAdd(){
		if(this.state.isOk){
			if(this.state.data.title === ""){
				message.warning("标题不能为空");
			}else if(this.state.data.type1 === ""){
				message.warning("类型不能为空");
			}else if(this.state.data.newPrice === ""){
				message.warning("现价不能为空");
			}else if(this.state.data.oldPrice === ""){
				message.warning("出厂价不能为空");
			}else if(this.state.data.picture.length === 0){
				message.warning("请上传商品图片");
			}else{
				await this.props.post("http://127.0.0.1:1902/crx/goodsadd2",{data:this.state.data});
				this.props.history.replace("/goodsmore");
			}
		}else{
			message.warning("请完善数据");
		}
	}
	handleChange(result){
	    let {fileList} = result;
	    this.setState({fileList});
	    if (result.file.response){
	        let img = result.file.response.data;
	        let data = this.state.data;
	        data.picture.push(img);
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
	handleChange2(result){
	    let {fileList} = result;
	    this.setState({fileList2:fileList});
	    if (result.file.response){
	        let img = result.file.response.data;
	        let data = this.state.data;
	        data.details.imgUrl.push(img);
	        this.setState({data});
	    }
		console.log(this.state);
	} 
	async handlePreview2(file) {
	    if (!file.url && !file.preview) {
	        file.preview = await getBase64(file.originFileObj);
	    }
	
	    this.setState({
	        previewImage2: file.url || file.preview,
	        previewVisible2: true,
	    });
	};
	handleCancel2(){ 
	    this.setState({previewVisible2: false});
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
        data = data.map(item=>item.type);
        this.setState({types:data});
    }
    render(){
		const { previewVisible, previewImage, fileList,previewVisible2, previewImage2, fileList2 } = this.state;
		const uploadButton = (
		    <div>
		        <Icon type="plus" />
		        <div style={{marginTop:"8px",color:"#666"}}>上传</div>
		    </div>
		);
        return <div style={{padding:"15px 50px 0"}}>
            {/* 标题区域 */}
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>标题：</label>
                <Input style={{width:"500px"}} value={this.state.data.title}
                    onChange={e=>{
                        let data = this.state.data;
                        data.title = e.target.value;
                        this.setState({data});
                    }}
                    onBlur={()=>{
                        if(this.state.data.title === ""){
                            message.warning("标题不能为空");
                            this.setState({isOk:false});
                        }else{
                            this.setState({isOk:true});
                        }
                    }}
                />
            </div>
            {/* 类型区域 */}
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>类型：</label>
                <Select style={{ width: 120 }} 
                onChange={val=>{
                    let data = this.state.data;
                    data.type1 = val;
                    this.setState({data});
                }}
                onBlur={()=>{
                    if(this.state.data.type1 === ""){
                        message.warning("类型不能为空");
                        this.setState({isOk:false});
                    }else{
                        this.setState({isOk:true});
                    }
                }}>
                    {
                        this.state.types.map(item=><Option key={item} value={item}>{item}</Option>)
                    }
                </Select>
            </div>
            {/* 新价格区域 */}
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>现价：</label>
                <Input style={{width:"100px"}} value={this.state.data.newPrice}
                    onChange={e=>{
                        let data = this.state.data;
                        if (isNaN(Number(e.target.value))){
                            data.newPrice = 0;
                        }else{
                            data.newPrice = Number(e.target.value);
                        }
                        this.setState({data});
                    }}
                    onBlur={()=>{
                        if (this.state.data.newPrice === "" || this.state.data.newPrice === 0) {
                            message.warning("现价不能为0或不能为空");
                            this.setState({isOk:false});
                        }else{
                            this.setState({isOk:true});
                        }
                    }}
                />
            </div>
            {/* 旧价格区域 */}
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>出厂价：</label>
                <Input style={{width:"100px"}} value={this.state.data.oldPrice}
                    onChange={e=>{
                        let data = this.state.data;
                        if (isNaN(Number(e.target.value))){
                            data.oldPrice = 0;
                        }else{
                            data.oldPrice = Number(e.target.value);
                        }
                        this.setState({data});
                    }}
                    onBlur={()=>{
                        if (this.state.data.oldPrice === "" || this.state.data.oldPrice === 0) {
                            message.warning("出厂价不能为0或不能为空");
                            this.setState({isOk:false});
                        }else{
                            this.setState({isOk:true});
                        }
                    }}
                />
            </div>
            {/* 库存区域 */}
            <div style={{marginBottom:"15px"}}>
                <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>库存：</label>
                <Input style={{width:"100px"}} value={this.state.data.stock}
                    onChange={e=>{
                        let data = this.state.data;
                        if (isNaN(Number(e.target.value))){
                            data.stock = 0;
                        }else{
                            data.stock = Number(e.target.value);
                        }
                        this.setState({data});
                    }}
                    onBlur={()=>{
                        if (this.state.data.stock === "" || this.state.data.stock === 0) {
                            message.warning("出厂价不能为0或不能为空");
                            this.setState({isOk:false});
                        }else{
                            this.setState({isOk:true});
                        }
                    }}
                />
            </div>
			{/* 上架状态 */}
			<div style={{marginBottom:"15px"}}>
			    <label style={{width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>上架状态：</label>
			    <Select style={{ width: 120 }} 
			    onChange={val=>{
			        let data = this.state.data;
			        data.online = Boolean(val);
			        this.setState({data});
			    }}>
			        <Option value={1}>是</Option>
					<Option value={0}>否</Option>
			    </Select>
			</div>
			{/* 所在专区 */}
			<div style={{marginBottom:"15px"}}>
			    <label style={{verticalAlign:"top",width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>所在专区：</label>
			    <TextArea placeholder="不同区域之间用:;分隔" onBlur={e=>{
			        let text = e.target.value.split(":;");
			        let data = this.state.data;
			        data.type2 = text;
			        this.setState({data});
			    }} rows={2} style={{width:"500px"}} />
			</div>
			{/* 详情内容 */}
			<div style={{marginBottom:"15px"}}>
			    <label style={{verticalAlign:"top",width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>详情内容：</label>
			    <TextArea placeholder="分段用:;分隔" onBlur={e=>{
			        let text = e.target.value.split(":;");
			        let data = this.state.data;
			        data.details.text = text;
			        this.setState({data});
			    }} rows={4} style={{width:"500px"}} />
			</div>
			{/* 商品图片 */}
			<div style={{marginBottom:"15px"}}>
			    <label style={{verticalAlign:"top",width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>商品图片：</label>
			    <div style={{overflow:"hidden",display:"inline-block",width:"600px"}}>
			        <Upload
			        action="http://127.0.0.1:1902/crx/goodsadd"
			        listType="picture-card"
			        name="goods_picture"
			        fileList={fileList}
			        onPreview={this.handlePreview}
			        onChange={this.handleChange}
			        >
			        {fileList.length >= 5 ? null : uploadButton}
			        </Upload>
			        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
			        <img alt="example" style={{ width: '100%' }} src={previewImage} />
			        </Modal>
			    </div>
			</div>
			{/* 详情图片 */}
			<div style={{marginBottom:"15px"}}>
			    <label style={{verticalAlign:"top",width:"100px",display:"inline-block",paddingRight:"10px",textAlign:"right"}}>详情图片：</label>
			    <div style={{overflow:"hidden",display:"inline-block",width:"600px"}}>
			        <Upload
			        action="http://127.0.0.1:1902/crx/goodsadd"
			        listType="picture-card"
			        name="goods_picture"
			        fileList={fileList2}
			        onPreview={this.handlePreview2}
			        onChange={this.handleChange2}
			        >
			        {fileList2.length >= 10 ? null : uploadButton}
			        </Upload>
			        <Modal visible={previewVisible2} footer={null} onCancel={this.handleCancel2}>
			        <img alt="example" style={{ width: '100%' }} src={previewImage2} />
			        </Modal>
			    </div>
			</div>
			{/* 点击添加 */}
			<Button onClick={this.dataAdd} size="large" type="primary" style={{marginLeft:"100px",width:"200px"}}>添加</Button>
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

GoodsAdd = connect(mapStateToProps, mapDispatchToProps)(GoodsAdd);
GoodsAdd = withAjax(GoodsAdd);
export default GoodsAdd;