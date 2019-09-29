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
      let list=[]
      let username=localStorage.getItem("username")
        let {data} = await axios({
            method:"get",
            url:"http://49.232.25.17:1902/spl/order",
            params:{username}
        })
       data.data.map(e=>{
           e.allgoods.map(item=>{
               item.id=e._id
               list.push(item)
           })
       })
       this.setState({
           orderlist:list
       })
       
        
    }
  async  refund(target,e){
       
        if(target.refund || e.target.innerText=="待退款"){
            alert("您已经申请退款,请勿重复操作")
        }
        else{
            e.target.innerText="待退款"
            let {data}=await axios({
                method:"post",
                url:"http://49.232.25.17:1902/spl/changerefund",
                data:{id:target._id,_id:target.id}
            })
         
   
           
            
            alert("申请成功，等待商家处理")
        }
        
    }
   async changeType(e){
       //调用e.persist()这会从事件池中移除该合成函数并允许对该合成事件的引用被保留下来。
       e.persist()
       let list=[]
       let username=localStorage.getItem("username")
       $(e.target).css("color","#00AAEA").siblings().css("color","#000")
       if(e.target.innerText=="已付款"){

                let {data}=await axios({
                    method:"get",
                    url:"http://49.232.25.17:1902/spl/pay",
                    params:{username}
                    
                })
                
                data.data.map((e)=>{
                    return e.map(item=>{
                        // item.id=e._id
                            return list.push(item)
                    })
                })
                
                this.setState({
                    orderlist:list
                })
                
                
       }
       
       if(e.target.innerText=="待退款"){
           
        let {data}=await axios({
            method:"get",
            url:"http://49.232.25.17:1902/spl/refund",
            params:{username}
        })
        data.data.map((e)=>{
            return e.map(item=>{
                item.id=e._id
                  return list.push(item)
             })
         })
         this.setState({
             orderlist:list
         })
       }
       if(e.target.innerText=="全部订单"){
           
        let {data}=await axios({
            method:"get",
            url:"http://49.232.25.17:1902/spl/order",
            params:{username}
        })
        data.data.map((e)=>{
            return e.allgoods.map(item=>{
                item.id=e._id
                  return list.push(item)
             })
         })
         this.setState({
             orderlist:list
         })
       }
       if(e.target.innerText=="已发货"){
           
            let {data}=await axios({
                method:"get",
                url:"http://49.232.25.17:1902/spl/pay",
                params:{username}
                
            })

            data.data.map((e)=>{
                
                return e.map(item=>{
                    item.id=e._id
                        return list.push(item)
                })
            })
            this.setState({
                orderlist:list
            })

       }
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
               
               orderlist.map((target,idx)=>{

                       
                        
                        return <li key={idx} style={{borderTop:"0.02rem solid #ccc",paddingTop:"0.2rem",display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}} >
                          
                         
                            <img src={"http://49.232.25.17:1902/"+target.picture} style={{width:"1.36rem",height:"1.36rem",marginLeft:"0.2rem",marginRight:"0.2rem"}}/>
                            <div>
                            <h6 style={{width: "4.6rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",margin:0}}>{target.name}</h6>
                            <p style={{color:"rgb(145, 139, 139)",margin:0}}>
                                <span style={{marginRight:"0.2rem"}}>尺码:{target.size}</span>
                                <span>颜色:{target.color}</span>
                            </p>
                            <p style={{margin:0}}>
                            <span style={{margin:0}}>数量：{target.qty}</span>
                            <Button type="primary" size="small" style={{float:"right"}} onClick={this.refund.bind(this,target)} className="status">
                                {target.refund  ? "待退款" : "退款"}
                            </Button>
                            </p>
                            <p style={{margin:0}}>
                            <span><b>价格：￥{target.price}.00</b></span>
                            </p>
                            <p style={{margin:0}}>付款时间:<span style={{marginLeft:"0.2rem"}}>
                            {formatDate(target.time,"-",true,true)}</span></p>
                           
                            </div>
                        </li>
                        
                    })
                }
                </ul>
        </div>
    }
}
Order = withAjax(Order)
export default Order