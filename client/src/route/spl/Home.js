import React,{Component} from "react";
import { Carousel, List, Avatar, Icon } from 'antd';
import axios from "axios";


class Home extends Component{
    constructor(){
        super()
        this.state={
            navImg:[
                "http://images.dunkhome.com/pc-banner/image/611/medium______20190918162857.jpg",
                "http://images.dunkhome.com/pc-banner/image/610/medium______20190910104330.jpg",
                "http://images.dunkhome.com/pc-banner/image/612/medium___1600_560.jpg",
                "http://images.dunkhome.com/pc-banner/image/605/medium______20190815151659.jpg",
                "http://images.dunkhome.com/pc-banner/image/604/medium______20190815151259.jpg",
                "http://images.dunkhome.com/pc-banner/image/603/medium______20190815151026.jpg"
            ],
            New:[],
            goodslist:[],
            goodscheck:[]
          
        }
        this.gotoNew=this.gotoNew.bind(this)
        this.gotoDetail=this.gotoDetail.bind(this)
        this.gotonew=this.gotonew.bind(this)
        this.gotogood=this.gotogood.bind(this)
    }
   async componentDidMount(){
    let {data}= await axios({
        method:"get",
        url:"http://49.232.25.17:1902/spl/news"
    })
    let result = await axios({
        method:"get",
        url:"http://49.232.25.17:1902/spl/goods"
    })
    let type=await axios({
        method:"get",
        url:"http://49.232.25.17:1902/spl/check"
    })
   

   this.setState({
       New:data.data,
       goodslist:result.data.data,
       goodscheck:type.data.data
       
   })
    
    }
     gotoNew(id){
      this.props.history.push(`/newPage${id}`)
     
    }
    gotoDetail(id){
      this.props.history.push(`/detail${id}`)
    }
    gotonew(){
        this.props.history.push("/new")
    }
    gotogood(){
        this.props.history.push("/saogoods")
    }
    render(){
     
        let {navImg,New,goodslist,goodscheck}=this.state
       
        
        const listData = [];
      
            New.map(item=>{
                listData.push({
                    Url: "http://49.232.25.17:1902/"+item.imgUrl[0],
                    title: item.title1,
                    content:item.desc[1],
                    seeNum:item.seeNum,
                    commentNum:item.commentNum,
                    _id:item._id
                    
                });
            })
      
        
        const IconText = ({ type, text }) => (
            <span>
              <Icon type={type} style={{ marginRight: 8 }} />
              {text}
            </span>
          );
        return <div>
            
            <Carousel effect="fade" autoplay >
             {
                 navImg.map((item,index)=>{
                  return <div key={index}>
                         <img src={item} style={{width:"100%"}} />
                        </div>
                 })
             }
            </Carousel>
            <div style={{marginTop:"0.2rem"}}>
                <img src="http://www.dunkhome.com/images/h5/icon_home_news.svg" style={{width:"2rem",height:"1.24rem",display:"block",margin:"0 auto"}} onClick={this.gotonew}/>
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
            <div style={{marginTop:"0.2rem",borderTop:"0.02rem solid #ccc",paddingTop:"0.2rem"}}>
                <img src="http://www.dunkhome.com/images/h5/icon_home_products.svg" style={{width:"2rem",height:"1.24rem",display:"block",margin:"0 auto"}} onClick={this.gotogood}/>
            </div>
            <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={goodslist}
            renderItem={(item => (
            <List.Item style={{padding:"0rem 0.2rem"}} onClick={this.gotoDetail.bind(this,item._id)}>
             <img src={item.select.data[0].image}/>
             <p style={{overflow:"hidden",width:"100%",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{item.title}</p>
             <p>
                 <span style={{marginRight:"0.2rem"}}>￥<b>{item.newPrice}</b></span>
                 <span style={{color:"#929292"}}><del>￥{item.oldPrice}</del></span>
             </p>
            </List.Item>
            ))}/>
             <div style={{marginTop:"0.2rem",marginBottom:"0.4rem"}}>
                <img src="http://www.dunkhome.com/images/h5/icon_home_appraise.svg" style={{width:"2rem",height:"1.24rem",display:"block",margin:"0 auto"}}/>
            </div>
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={goodscheck}
                renderItem={item => (
                <List.Item style={{padding:"0 0.3rem"}}>
                   <img src={item.bigImg}/>
                   <p style={{overflow:"hidden",width:"100%",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{item.title}</p>
                   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                   <Icon type="audit" style={{color:"#00AAEA",fontSize:"0.4rem"}}/>
                    <p>
                   <span style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                       <span><b>getcc</b></span>
                       <span>3分钟前</span>
                   </span>
                   </p>
                   <span style={{color:"#00AAEA"}}>待鉴定</span>
                   </div>
                </List.Item>
                )}
            />,
            <div style={{height:"3rem",width:"100%",background:"#373d4f",fontSize:"0.24rem",textAlign:"center",overflow:"hidden"}}>
                <p style={{color:"#fff",marginTop:"0.4rem"}}>
                    <span style={{borderRight:"0.04rem solid #fff",display:"inline-block",width:"1.2rem"}}>关于我们</span>
                    <span style={{borderRight:"0.04rem solid #fff",display:"inline-block",width:"1.2rem"}}>联系方式</span>
                    <span style={{borderRight:"0.04rem solid #fff",display:"inline-block",width:"1.2rem"}}>隐私私策</span>
                    <span style={{borderRight:"0.04rem solid #fff",display:"inline-block",width:"1.2rem"}}>广告服务</span>
                    <span style={{borderRight:"0.04rem solid #fff",display:"inline-block",width:"1.2rem"}}>意见反馈</span>
                    <span style={{display:"inline-block",width:"1.2rem"}}>招贤纳士</span>
                </p>
                <p style={{color:"#fff",marginTop:"0.4rem"}}>
                    <span>版权所有：杭州当客网络科技有限公司 </span>
                    <span>浙ICP备18053567号-1</span>
                </p>
                <p>
                    <img src="http://www.dunkhome.com/beian.png"/>
                    <span style={{color:"#939393"}}>浙公网安备 33010802009765号</span>
                </p>
            </div>
        </div>
    }
}


export default Home