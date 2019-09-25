import React,{Component} from "react"
import { Carousel, List, Avatar, Icon } from 'antd';
import axios from "axios"
import $ from "jquery"
class New extends Component{
    constructor(){
        super()
        this.state={
           type:[],
           allnew:[]
        }
        this.gotoNew=this.gotoNew.bind(this)
        this.changeType=this.changeType.bind(this)
        this.changeStyle=this.changeStyle.bind(this)
    }
   async componentDidMount(){
    let result = await axios({
        method:"get",
        url:"http://127.0.0.1:1902/spl/allnew"
    })
    let {data} = await axios({
        method:"get",
        url:"http://127.0.0.1:1902/spl/new"
    })
  
    
   this.setState({
       type:result.data.data,
       allnew:data.data
   })
    
    }
    gotoNew(id){
        this.props.history.push(`/newPage${id}`)
       
      }
    changeStyle(e){
       $(e.target).css("color","#00AAEA").siblings().css("color","#000")
        
    }
   async changeType(type){
    
    if(type=="全部"){
        let {data} = await axios({
            method:"get",
            url:"http://127.0.0.1:1902/spl/new"
        })
        this.setState({
            allnew:data.data
        })
    }else{
        let {data} = await axios({
            method:"get",
            url:"http://127.0.0.1:1902/spl/type",
            params:{type}
        })
        this.setState({
            allnew:data.data
        })
    }
    
    
    }
    render(){
        let {type,allnew}=this.state
        const listData = [];
        const IconText = ({ type, text }) => (
            <span>
              <Icon type={type} style={{ marginRight: 8 }} />
              {text}
            </span>
          );
        allnew.map(item=>{
            listData.push({
                Url: "http://127.0.0.1:1902/"+item.imgUrl[0],
                title: item.title1,
                content:item.desc[1],
                seeNum:item.seeNum,
                commentNum:item.commentNum,
                _id:item._id
                
            });
        })
        return <div>
                <div className="type" style={{width:"100%",height:"1rem",display:"flex",justifyContent:"space-around",alignItems:"center",color:"#000",borderBottom:"0.02rem solid #ccc"}} onClick={this.changeStyle}>
                    <span style={{color:"#00AAEA"}} onClick={this.changeType.bind(this,"全部")}>全部</span>
                    {
                        type.map((item,index)=>{
                           return <span key={index} onClick={this.changeType.bind(this,item.type)}>{item.type}</span>
                        })
                    }
                </div>
                <List dataSource={listData}
            renderItem={item => (
            <List.Item key={item.title} onClick={this.gotoNew.bind(this,item._id)}>
                <List.Item.Meta 
                title={
                <>
                <a style={{width:"100%",padding:"0rem 0.2rem",float:"left"}}>
                    <p style={{float:"left",width:"50%"}}>
                    <b style={{fontSize:"0.36rem"}}>{item.title}</b>
                    <span style={{float:"left",marginTop:"0.2rem",width:"100%",color:"#929292",overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}} >{item.content}</span>
                    </p>
                    <img src={item.Url} style={{width:"3rem",height:"1.88rem",float:"right"}}/>
                </a> 
                <span style={{paddingLeft:"0.2rem"}}>
                    {(new Date()).toLocaleDateString()}
                </span>
                <span style={{float:"right",display:"flex",width:"1.6rem",justifyContent:"space-between",paddingRight:"0.2rem"}}>
                <IconText type="like-o" text={item.seeNum}  style={{marginRight:"0.2rem"}}/>
                <IconText type="message" text={item.commentNum} />
                </span>
                </>
                }
                />
               
            </List.Item>
                    )}/>




        </div>
    }
}

export default New