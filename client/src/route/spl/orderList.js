import React,{Component} from "react"
import axios from "axios"
import withAjax from "../../heightRouter/withAjax"

class Order extends Component{
    constructor(){
        super()
        this.state={
            orderlist:[]
        }
    }
  async  componentDidMount(){
        let {data} = await axios({
            method:"get",
            url:"http://127.0.0.1:1902/spl/order"
        })
        console.log(data);
        
       this.setState({
           orderlist:data.data
       })
        
    }
    render(){
       let {orderlist}=this.state
       
       let {formatDate}=this.props
        
        return <div>
                <ul style={{display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%",height:"0.8rem",padding:0,borderBottom:"0.02rem solid #ccc",color:"#000",margin:0}}>
                    <li style={{color:"#00AAEA"}}>全部订单</li>
                    <li>已付款</li>
                    <li>待退款</li>
                    <li>已发货</li>
                </ul>
                <ul style={{padding:"0px"}}>
                {
                    orderlist.map((item,index)=>{
                      return item.allgoods.map((item,index)=>{

                       
                        
                        return <li key={index} style={{borderTop:"0.02rem solid #ccc",paddingTop:"0.2rem",display:"flex",justifyContent:"center",width:"100%",height:"2rem"}} >
                          
                         
                            <img src={"http://127.0.0.1:1902/"+item.picture} style={{width:"1.36rem",height:"1.36rem",marginLeft:"0.2rem",marginRight:"0.2rem"}}/>
                            <div>
                            <h6 style={{width: "4.6rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",margin:0}}>{item.name}</h6>
                            <p style={{color:"rgb(145, 139, 139)",margin:0}}>
                                <span style={{marginRight:"0.2rem"}}>尺码:{item.size}</span>
                                <span>颜色:{item.color}</span>
                            </p>
                            <p style={{margin:0}}>
                            <span style={{margin:0}}>数量：{item.qty}</span>
                            <span style={{float:"right"}}><b>价格：￥{item.price}.00</b></span>
                            </p>
                            <p style={{margin:0}}>付款时间:<span style={{marginLeft:"0.2rem"}}>
                            {formatDate(item.time,"-",true,true)}</span></p>
                           
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