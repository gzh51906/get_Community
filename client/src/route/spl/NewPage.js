import React,{Component} from "react";
import axios from "axios"

import withAjax from "../../heightRouter/withAjax";

class NewPage extends Component{
    constructor(){
        super()
        this.state={
            newMsg:[],
            desc:[]
        }
    }
   async componentDidMount(){
    
      let {_id}=this.props.match.params
       
      let {data}= await axios({
          methods:"get",
          url:"http://127.0.0.1:1902/spl/newpage",
          params:{_id:_id}
      })
      this.setState({
          newMsg:data.data[0],
          desc:data.data[0].desc
      })
      
        
    }

    render(){
       
        
        let {title1,commentNum,seeNum,addTime,author,imgUrl}=this.state.newMsg
        let {desc}=this.state
        let {formatDate}=this.props
        let idx = -1
        return  <div>
            
            <h1 style={{padding:"0.4rem 0.4rem 0 0.4rem"}}><b>{title1}</b></h1>
                <p style={{padding:"0.4rem"}}>
                    {author}
                    {formatDate(addTime,"-",true,true)}
                    <span style={{float:"right"}}>{seeNum}人已看</span>
                </p>
               {
                   
                   desc.map((item,index)=>{
                       if(item){
                            return <p key={index} style={{fontSize:"0.36rem"}}>{item}</p>
                            
                       }
                       else{
                        idx++
                        if(index==desc.length-3){
                            idx--
                            return
                           
                        }
                         
                        return <img src={"http://127.0.0.1:1902/"+imgUrl[idx]} key={index} style={{width:"100%",height:"100%",marginBottom:"0.4rem"}}/> 
                       }
                       
                       
                       
                   })
               }
               
               

        </div>
    }
}
NewPage=withAjax(NewPage)
export default NewPage