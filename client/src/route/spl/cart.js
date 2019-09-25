import React,{Component} from "react"
import axios from "axios"
import { Checkbox,Empty  } from 'antd'

import $ from "jquery"

class Cart extends Component{
    constructor(){
        super()
        this.state={
            goodslist:[],
            totalPrice:0.00,
            allPrice:"",
            price:""

           
          
        }
      this.checkOne=this.checkOne.bind(this)
      this.checkAll=this.checkAll.bind(this)
    }
    
  async  componentDidMount(){
        let username=localStorage.getItem("usename")
        let {data} = await axios({
            method:"get",
            url:"http://127.0.0.1:1902/spl/cartlength",
            params:{username}
        })
      let total=  data.data.map((item)=>{
            return Number(item.price)*Number(item.qty)
        })
        let totalPrice=0
      for(let i=0;i<total.length;i++){
        totalPrice+=total[i]
      }
       this.setState({
           goodslist:data.data,
           allPrice:totalPrice
       })

        
    }
      checkAll (e) {
          let{allPrice}=this.state
          let price=0
         if($(e.target).prop("checked")==true){


            $("li input").map((index,item)=>{
                $(item).prop("checked",true)
            })
            this.setState({
                totalPrice:allPrice
            })
          }else{
            $("li input").map((index,item)=>{
                $(item).prop("checked",false)
            })
              this.setState({
                  totalPrice:price
              })
          }
        
      
      };
      checkOne (msg)  {
          let{price}=msg
          let allPrice=0
       $("li input").map((index,item)=>{
         if( $(item).prop("checked")==true){
            allPrice+=price*1
            this.setState({
                totalPrice:allPrice
            })
         }else{
            
             $(".checkall").prop("checked",false)
             this.setState({
                 totalPrice:allPrice
             })
         }
         
         
       })
      };
    
    render(){
       
       
        let {goodslist,totalPrice} = this.state
        return <div>
            
                <ul style={{padding:"0px",display:"flex",justifyContent:"center",flexDirection:"column"}}>
                {
                    goodslist.map((item,index)=>{
                        return <li key={index} style={{borderTop:"0.02rem solid #ccc",paddingLeft:"0.3rem",marginBottom:"0.2rem",display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"2rem"}}>
                          <input type="checkbox" style={{width:"0.5rem",height:"0.5rem"}} onClick={this.checkOne.bind(this,item)}/>
                              
                            <img src={"http://127.0.0.1:1902/"+item.picture} style={{width:"1.36rem",height:"1.36rem",marginLeft:"0.2rem",marginRight:"0.2rem"}}/>
                            <div  style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <h6 style={{width: "4.6rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.name}</h6>
                            <p style={{color:"rgb(145, 139, 139)"}}>
                                <span style={{marginRight:"0.2rem"}}>尺码:{item.size}</span>
                                <span>颜色:{item.color}</span>
                            </p>
                            <p>
                                <span className="price"><b>￥{item.price}.00</b></span>
                                <span style={{float:"right"}}>×{item.qty}</span>
                            </p>
                            </div>
                        </li>
                    })
                }
                </ul>
                <div style={{width:"100%",height:"1rem",position:"fixed",bottom:"0rem",display:"flex",justifyContent:"space-between",alignItems:"center",paddingLeft:"0.5rem",borderTop:"0.02rem solid #ccc"}}>
                <span style={{fontSize:"0.3rem",color:"#000"}}>
                <input type="checkbox" style={{width:"0.5rem",height:"0.5rem",verticalAlign:"middle"}} onClick={this.checkAll} className="checkall"/>全选
                </span>
                    <span style={{color:"#000"}}>合计:<b style={{color:"#00AAEA"}}>￥{totalPrice.toFixed(2)}</b></span>
                    <span style={{width:"2rem",height:"100%",background:"#00AAEA",textAlign:"center",lineHeight:"1rem",color:"#fff"}}>结算</span>
                </div>






        </div>
    }
}


export default Cart