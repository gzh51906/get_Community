import React,{Component} from "react"
import { Button } from 'antd';
import axios from "axios"
import withAjax from "../../heightRouter/withAjax"
import $ from "jquery"

class Order extends Component{
    constructor(){
        super()
        this.state={
            orderlist:[],
            type:["全部订单","已付款","待退款","已发货" ]
        }
        this.refund=this.refund.bind(this)
        this.changeType=this.changeType.bind(this)
    }
  async  componentDidMount(){
        let {data} = await axios({
            method:"get",
            url:"http://127.0.0.1:1902/spl/order"
        })
        
       this.setState({
           orderlist:data.data
       })
        
    }
  async  refund(target,item,e){
      console.log(target,item,e);
      
        e.target.innerText="待退款"
        // let {data}=await axios({
        //     method:"post",
        //     url:"http://127.0.0.1:1902/spl/changerefund",
        //     data:{id:target._id}
        // })
        // console.log(data);
        
        alert("申请成功，等待商家处理")
    }
    changeType(e){
       $(e.target).css("color","#00AAEA").siblings().css("color","#000")
    }
    render(){
       let {orderlist,type}=this.state
       
       let {formatDate}=this.props
        
        return <div>
                <ul style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%",height:"0.8rem",padding:0,borderBottom:"0.02rem solid #ccc",color:"#000",margin:0}} onClick={this.changeType} className="type">
                    {
                        type.map((item,index)=>{
                            if(index==0){
                                return <li style={{color:"#00AAEA"}} onClick={this.changeType} key={index}>{item}</li>

                            }
                            else{
                                return <li onClick={this.changeType} key={index}>{item}</li>
                            }
                        })
                    }
                </ul>
                <ul style={{padding:"0px"}}>
                {
                orderlist.map((item,index)=>{
                      return item.allgoods.map((target,idx)=>{

                       
                        
                        return <li key={idx} style={{borderTop:"0.02rem solid #ccc",paddingTop:"0.2rem",display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}} >
                          
                         
                            <img src={"http://127.0.0.1:1902/"+target.picture} style={{width:"1.36rem",height:"1.36rem",marginLeft:"0.2rem",marginRight:"0.2rem"}}/>
                            <div>
                            <h6 style={{width: "4.6rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",margin:0}}>{target.name}</h6>
                            <p style={{color:"rgb(145, 139, 139)",margin:0}}>
                                <span style={{marginRight:"0.2rem"}}>尺码:{target.size}</span>
                                <span>颜色:{target.color}</span>
                            </p>
                            <p style={{margin:0}}>
                            <span style={{margin:0}}>数量：{item.qty}</span>
                            <Button type="primary" size="small" style={{float:"right"}} onClick={this.refund.bind(this,target,item)}>退款</Button>
                            </p>
                            <p style={{margin:0}}>
                            <span><b>价格：￥{target.price}.00</b></span>
                            </p>
                            <p style={{margin:0}}>付款时间:<span style={{marginLeft:"0.2rem"}}>
                            {formatDate(target.time,"-",true,true)}</span></p>
                           
                            </div>
                        </li>
                        })
                    })
                }
                </ul>
        </div>
    }
}
Order = withAjax(Order)
export default Order