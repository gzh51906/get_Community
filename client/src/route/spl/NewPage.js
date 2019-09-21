import React,{Component} from "react";
import axios from "axios"

import withAjax from "../../heightRouter/withAjax";

class NewPage extends Component{
    constructor(){
        super()
        this.state={
            newMsg:[]
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
          newMsg:data.data[0]
      })
      
        
    }

    render(){
        console.log(this.state.newMsg);
        console.log(this.props);
        
        let {title1,commentNum,seeNum,addTime,author}=this.state.newMsg
        let {formatDate}=this.props
        return <div>
                <h1 style={{padding:"0.4rem"}}><b>{title1}</b></h1>
                
                <p>
                    {author}
                    {
                        formatDate(addTime,"-",true,true)
                    }
                </p>



        </div>
    }
}
NewPage=withAjax(NewPage)
export default NewPage