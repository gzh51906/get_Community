import React,{Component} from "react";
import { Carousel, List, Avatar, Icon } from 'antd';
import axios from "axios"

class Home extends Component{
    constructor(){
        super()
        this.state={
            navImg:[
                "http://images.dunkhome.com/pc-banner/image/611/medium______20190918162857.jpg",
                "http://images.dunkhome.com/pc-banner/image/610/medium______20190910104330.jpg",
                "http://images.dunkhome.com/pc-banner/image/609/medium______20190910103201.jpg",
                "http://images.dunkhome.com/pc-banner/image/605/medium______20190815151659.jpg",
                "http://images.dunkhome.com/pc-banner/image/604/medium______20190815151259.jpg",
                "http://images.dunkhome.com/pc-banner/image/603/medium______20190815151026.jpg"
            ]
        }
    }
   async componentDidMount(){
    let {data}= await ({
        method:"get",
        url:"http:127.0.0.1:1903/spl/new"
    })
    console.log(data);
    
    }
    render(){
        let {navImg}=this.state
        return <div>
            <div className="nav">
            <Carousel effect="fade" autoplay >
             {
                 navImg.map((item,index)=>{
                  return <div key={index}>
                         <img src={item} style={{width:"100%"}}/>
                        </div>
                 })
             }
            </Carousel>
            </div>
            <div style={{marginTop:"0.2rem"}}>
                <img src="http://www.dunkhome.com/images/h5/icon_home_news.svg" style={{width:"2rem",height:"1.24rem",display:"block",margin:"0 auto"}}/>
            </div>
        </div>
    }
}
export default Home