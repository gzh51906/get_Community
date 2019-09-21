import React,{Component} from "react";

import axios from "axios"
import css from "./css/Drawer.css"
import { Carousel,Layout,Icon,Button, Drawer, Radio} from 'antd';
class Detail extends Component{
    constructor(){
        super()
        this.state={
            goodmsg:[],
            picture:[],
            oldPrice:"",
            newPrice:"",
            type2:[],
            imgUrl:[],
            text:[],
            select:[],
            size:[],
            visible: false, 
            placement: 'bottom'

        }
        this.showDrawer=this.showDrawer.bind(this)
        this.onChange=this.onChange.bind(this)
        this.onClose=this.onClose.bind(this)
    }
   async componentDidMount(){
        let {_id} = this.props.match.params
        let {data} = await axios({
            method:"get",
            url:"http://127.0.0.1:1902/spl/goodmsg",
            params:{_id:_id}
        })
        this.setState({
            goodmsg:data.data[0],
            picture:data.data[0].picture,
            oldPrice:data.data[0].oldPrice,
            newPrice:data.data[0].newPrice,
            type2:data.data[0].type2,
            imgUrl:data.data[0].details.imgUrl,
            text:data.data[0].details.text,
            select:data.data[0].select,
            size:data.data[0].select.data[0].size
        })
     
        
    }
    showDrawer() {
        this.setState({
          visible: true,
        });
      };
    
      onClose ()  {
        this.setState({
          visible: false,
        });
      };
    
      onChange ( e ) {
        this.setState({
          placement: e.target.value,
        });
      };
    render(){
        console.log(this.state.goodmsg);
        let {title}=this.state.goodmsg
        let {picture,oldPrice,newPrice,type2,imgUrl,text,select,size}=this.state
        const {Footer} =Layout
        var idx =-1
        
        console.log(size);
        
        
        return <div>
                  <Carousel autoplay>
                       {
                           picture.map(item=>{
                             return  <div key={{item}}>
                                   <img src={"http://127.0.0.1:1902/"+item} style={{width:"100%"}}/>
                               </div>
                           })
                       }
                    </Carousel>
                    <h3 style={{padding:"0px 0.4rem"}}>{title}</h3>
                    <p style={{padding:"0 0.4rem"}}>
                        <span><b style={{color:"#00AAEA",fontSize:"0.46rem",marginRight:"0.2rem"}}>￥{newPrice}.00</b></span>
                        <del style={{fontSize:"0.32rem"}}>￥{oldPrice}.00</del>
                        <span style={{display:"inline-block",background:"#000",color:"#fff",marginLeft:"0.2rem"}}>51折</span>
                    </p>
                    <p style={{padding:"0 0.4rem"}}><span style={{marginRight:"0.3rem"}}>{type2[0]}</span><span>{type2[1]}</span></p>
                    <div style={{width:"100%",height:"1rem",borderTop:"0.02rem solid #ccc",borderBottom:"1px solid #ccc",display:"flex",alignItems:"center",paddingRight:"0.4rem"}}>
                       <span style={{display:"flex",flex:1,justifyContent:"center",color:"#00AAEA",borderRight:"1px solid #ccc"}}>
                           <b style={{color:"#000",marginRight:"0.1rem"}}>销量</b>{Math.floor(Math.random()*100)}
                        </span>
                       <span style={{display:"flex",flex:1,justifyContent:"center",color:"#00AAEA",borderRight:"1px solid #ccc"}}>
                           <b style={{color:"#000",marginRight:"0.1rem"}}>运费</b>0
                       </span>
                       <span style={{display:"flex",flex:1,justifyContent:"center",color:"#00AAEA"}}>
                       <b style={{color:"#000",marginRight:"0.1rem"}}>发货时间</b>30天
                       </span>
                           
                    </div>
                    {
                        text.map((item,index)=>{
                           
                            if(item){
                                if(index==1){
                                    return <p key={index} style={{textAlign:"center",padding:"0px 0.4rem",color:"red"}}>{item}</p>
                                }
                                return <p key={index} style={{textAlign:"center",padding:"0px 0.4rem" ,marginTop:"0.2rem"}}>{item}</p>
                                
                            }
                            else{
                                idx++   
                                return <img src={"http://127.0.0.1:1902/"+imgUrl[idx]} style={{width:"100%",marginTop:"0.3rem"}} key={index} />
                            }
                        })
                    }
                    <Drawer
                        title={title}
                        placement={this.state.placement}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        height="558px"
                        closable="ture"
                        style={{paddingTop:"0.6rem"}}
                        
                        >
                            <img src={"http://127.0.0.1:1902/"+picture[0]} style={{width:"1.56rem",height:"1.56rem",position:"absolute",left:"0.4rem",top:"-0.6rem",border:"0.02rem solid #ccc"}}/>
                        <span style={{color:"#00AAEA",position:"absolute",left:"0.4rem",top:"2.2rem",fontSize:"0.4rem"}}><b>￥{newPrice}</b></span>
                        <p style={{padding:"0.4rem 0px 0px 0.4rem",color:"#000",display:"flex",flexDirection:"column"}}><b>颜色</b>
                         <span style={{border:"0.01rem solid #ccc",width:"1.34rem",height:"0.56rem",marginTop:"0.3rem",textAlign:"center",lineHeight:"0.56rem"}}></span>
                        </p>
                        <p>Some contents...</p>
                    </Drawer>




                    <Footer style={{background:"#fff", position:"fixed",bottom:"0rem",width:"100%",height:"1rem",borderTop:"0.02rem solid #ccc",display:"flex",alignItems:"center",padding:"0px"}}>
                    <div style={{display:"flex",flex:"40%",justifyContent:"space-around"}}>
                    <Icon type="shopping-cart" style={{fontSize:"0.5rem",color:"rgb(145, 139, 139)",marginRight:"0.2rem"}}/>
                    <Icon type="customer-service" style={{fontSize:"0.5rem",color:"rgb(145, 139, 139)",marginRight:"0.2rem"}} />
                    <Icon type="star" style={{fontSize:"0.5rem",color:"rgb(145, 139, 139)",marginRight:"0.2rem"}}/>
                    </div>
                    <div style={{display:"flex",flex:"60%",justifyContent:"flex-end",alignItems:"center"}}>
                        <span style={{color:"#00AAEA"}} onClick={this.showDrawer}>加入购物车</span>
                        <Button type="primary" size="large" style={{marginLeft:"0.4rem"}}>立即购买</Button>
                    </div>
                    </Footer>
        </div>
    }
}


export default Detail