import React,{Component} from "react";
import $ from "jquery"
import axios from "axios"
import css from "./css/Drawer.css"
import { Carousel,Layout,Icon,Button, Drawer, InputNumber,Badge,Modal} from 'antd';
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
            select:false,
            sizes:[],
            visible: false, 
            placement: 'bottom',
            color:"",
            goods_price:"",
            goods_num:1,
            goods_size:"",
            goods_picture:"",
            goods_color:"",
            goods_name:"",
            size_id:"",
            username:"",
            buymsg:{},
            cartlength:""
           

        }
        this.showDrawer=this.showDrawer.bind(this)
        this.onChange=this.onChange.bind(this)
        this.onClose=this.onClose.bind(this)
        this.selectSize=this.selectSize.bind(this)
        this.onChange=this.onChange.bind(this)
        this.add2Cart=this.add2Cart.bind(this)
        this.gotoCart=this.gotoCart.bind(this)

    }
   async componentDidMount(){
       //获取商品信息渲染
        let {_id} = this.props.match.params
        let {data} = await axios({
            method:"get",
            url:"http://127.0.0.1:1902/spl/goodmsg",
            params:{_id:_id}
        })
        let username=localStorage.getItem("username")
            let result=await axios({
                method:"get",
                url:"http://127.0.0.1:1902/spl/cartlength",
                params:{username}
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
            sizes:data.data[0].select.data[0].sizes,
            color:data.data[0].select.data[0].color,
            cartlength:result.data.data.length
           
        })
    
    }
    showDrawer() {
        this.setState({
          visible: true,
        });
        $(".goodpic").show()
      };
    
      onClose ()  {
        this.setState({
          visible: false,
        });
        $(".goodpic").hide()
      };
    
     onChange(value){
        let {goods_size,goods_price,goods_color,size_id,goods_picture,goods_name}=this.state
        let data= {
            qty:value,
            price:goods_price,
            color:goods_color,
            size:goods_size,
            picture:goods_picture,
            size_id:size_id,
            name:goods_name,
            username:localStorage.getItem("username")
        }
        this.setState({
            buymsg:data,
            goods_num:value
           
        })
    
     
     }
    selectSize(price,size,pic,color,name,size_id,e){
       $(e.target).css("background","#00AAEA").css("color","#fff").siblings().css("background","#fff").css("color","#000")
       
       let data={
        qty:this.state.goods_num,
        price:price,
        color:color,
        size:size,
        size_id:size_id,
        picture:pic,
        name:name,
        username:localStorage.getItem("username")
    }
        this.setState({
            newPrice:price,
            goods_color:color,
            goods_picture:pic,
            goods_price:price,
            goods_size:size,
            goods_name:name,
            size_id:size_id,
            buymsg:data
            
        })
    
      }
    async add2Cart(){
      
        if(typeof(this.state.newPrice)=="number"){
            let {data}=await axios({
                method:"get",
                url:"http://127.0.0.1:1902/spl/cart",
                params:this.state.buymsg
            })
            //获取购物车长度
            let username=localStorage.getItem("username")
            let result=await axios({
                method:"get",
                url:"http://127.0.0.1:1902/spl/cartlength",
                params:{username}
            })
            this.setState({
                cartlength:result.data.data.length
            })
            this.onClose()
            if(this.state.select==true&&username){
                this.props.history.push("/cart")
            }
            else{
                alert("您还未登陆哦！！")
                this.props.history.push("/login")
            }
           
           
            
           
        }
        else{
            alert("此商品暂时不能购买")
        }
      
        
      }
     gotoCart(){
         this.showDrawer()
         this.setState({
             select:true
         })
     }
     //防止内存泄漏
     componentWillUnmount() {
        this.setState = (state, callback) => {
          return;
        };
    }
    render(){
     
       
        let {title}=this.state.goodmsg
        let {picture,oldPrice,newPrice,type2,imgUrl,text,sizes,color,cartlength}=this.state
        const {Footer} =Layout
       
        
        var idx =-1
        
       
        
        
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
                           <b style={{color:"#000",marginRight:"0.1rem"}}>销量</b>30
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
                            <img src={"http://127.0.0.1:1902/"+picture[0]} style={{width:"1.56rem",height:"1.56rem",position:"absolute",left:"0.4rem",top:"-0.6rem",border:"0.02rem solid #ccc"}} className="goodpic"/>
                        <span style={{color:"#00AAEA",position:"absolute",left:"0.4rem",top:"2.2rem",fontSize:"0.4rem"}}><b>￥{newPrice}</b></span>
                        <p style={{padding:"0px 0px 0px 0.4rem",color:"#000",display:"flex",flexDirection:"column"}}><b>颜色</b>
                         <span style={{border:"0.01rem solid #ccc",width:"1.34rem",height:"0.56rem",marginTop:"0.3rem",display:"flex",justifyContent:"center",color:"#fff",alignItems:"center",background:"#00AAEA"}}>{color}</span>
                        </p>
                        <p style={{color:"#000",padding:"0px 0.4rem"}}><b>尺码</b></p>
                        <p style={{display:"flex",flexWrap:"wrap",paddingLeft:"0.3rem"}}>
                            {
                                sizes.map((item,index)=>{
                                   return <span style={{display:"flex",justifyContent:"center",alignItems:"center",border:"0.02rem solid #ccc",width:"1.34rem",height:"0.56rem",flexShrink:0,margin:"0px 0px 0.2rem 0.3rem",color:"#000"}} key={index} onClick={this.selectSize.bind(this,item.price,item.size,picture[0],color,title,item.size_id)}>{item.size}</span>
                                })
                            }
                        </p>
                        <div style={{display:"flex",flexDirection:"column",padding:"0px 0.4rem"}}>
                           
                            <span style={{color:"#000",marginBottom:"0.2rem"}}><b>购买数量</b></span>
                            <InputNumber min={1} max={10}  defaultValue={1} onChange={this.onChange} />
                            
                        </div>
                        <div style={{width:"100%",height:"1rem",background:"#00AAEA",color:"#fff",textAlign:"center",lineHeight:"1rem",position:"absolute",bottom:"0px"}} onClick={this.add2Cart}>确定</div>
                    </Drawer>




                    <Footer style={{background:"#fff", position:"fixed",bottom:"0rem",width:"100%",height:"1rem",borderTop:"0.02rem solid #ccc",display:"flex",alignItems:"center",padding:"0px"}}>
                    <div style={{display:"flex",flex:"40%",justifyContent:"space-around"}}>
                    <Badge count={cartlength}>
                    <Icon type="shopping-cart" style={{fontSize:"0.5rem",color:"rgb(145, 139, 139)",marginRight:"0.2rem"}}/>
                    </Badge>
                   
                    <Icon type="customer-service" style={{fontSize:"0.5rem",color:"rgb(145, 139, 139)",marginRight:"0.2rem"}} />
                    <Icon type="star" style={{fontSize:"0.5rem",color:"rgb(145, 139, 139)",marginRight:"0.2rem"}}/>
                    </div>
                    <div style={{display:"flex",flex:"60%",justifyContent:"flex-end",alignItems:"center"}}>
                        <span style={{color:"#00AAEA"}} onClick={this.showDrawer}>加入购物车</span>
                        <Button type="primary" size="large" style={{marginLeft:"0.4rem"}} onClick={this.gotoCart}>立即购买</Button>
                    </div>
                    </Footer>
        </div>
    }
}



export default Detail