import React, { Component } from 'react';
import { Carousel,Icon } from 'antd';

import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';


//引入路由
import {NavLink} from "react-router-dom";

//引入外部样式
import './style/saogoods.css'

class SaoGoods extends Component{
    //数据
    state={
        imgBox:[
            'http://images.dunkhome.com/pc-banner/image/448/cropped____superme_1_.jpg',
            'http://images.dunkhome.com/pc-banner/image/447/cropped________.jpg',
            'http://images.dunkhome.com/pc-banner/image/446/cropped_Air-Jordan-11-Low-.jpg'
        ],
        goodsimg:[
            'http://images.dunkhome.com/mall-product-topic-banner/image/169/cropped_____1.jpg',
            'http://images.dunkhome.com/mall-product-topic-banner/image/168/cropped_____1.jpg',
            'http://images.dunkhome.com/mall-product-topic-banner/image/164/cropped____-____1.jpg'
        ],
        muendata:[{
            text:'App签到',
            icon:'schedule',
            path:'/app'
        },{
            text:'全部商品',
            icon:'shop',
            path:'/allgoods'
        },{
            text:'App下载',
            icon:'gift',
            path:'/app'
        },{
            text:'网页首站',
            icon:'appstore',
            path:'/home'
        }],
        goodsBox1:[],
        goodsBox2:[],
        goodsBox3:[],
    };

    //在生命周期获取数据进行渲染
    async componentDidMount(){
        let {get} = this.props;
        let userlist1 = await get('http://127.0.0.1:1902/hrl/saogoods', {
            type:'篮球鞋'
        });
        let userlist2 = await get('http://127.0.0.1:1902/hrl/saogoods',{
            type:'休闲鞋'
        })
        let userlist3 = await get('http://127.0.0.1:1902/hrl/saogoods',{
            type:'上衣'
        })
        this.setState({
            goodsBox1:userlist1.data.slice(0,8),
            goodsBox2:userlist2.data.slice(0,8),
            goodsBox3:userlist3.data.slice(0,8),
        })
    }
    //跳转方法
    goto(path){
        this.props.history.push(path);
    }
    allgoodsGoto(path){
        console.log(path);
    }

    render(){
        return(
            <div>
                <Carousel effect="fade" autoplay>
                    {
                        this.state.imgBox.map(item=>{
                            return <div key="item">
                                <img src={item} width="100%"/>
                            </div>
                        })
                    }
                </Carousel>
                <div className="menuBox">
                    {
                        this.state.muendata.map(item=>{
                            return  <div key={item.icon} className="menuList" style={{textAlign:"center"}}>
                                <NavLink to={item.path}>
                                    <div><Icon type={item.icon} theme="twoTone" twoToneColor="#eb2f96" style={{fontSize:30}}></Icon></div>
                                </NavLink>
                                <span>{item.text}</span>
                            </div>
                        })
                    }
                </div>
                {/* 篮球鞋 */}
                <div className="goodsBox">
                    <div>
                        <img src={this.state.goodsimg[0]} style={{width:'100%'}}/>
                    </div>
                    <div>
                        <ul className="listBox">
                            {
                                this.state.goodsBox1.map(item=>{
                                    return <li onClick={this.goto.bind(this,`/detail${item._id}`)} key={item._id} style={{width:110,height:167}}>
                                        <img src={item.select.data[0].image} style={{width:'100%'}}/>
                                        <p className="goodsTitle">{item.title}</p>
                                        <strong>{'￥' + item.newPrice}</strong><span style={{float:"right"}}>自营</span>
                                    </li>
                                })
                            }
                           <div style={{width:100,height:110}}>
                                <img src='http://www.dunkhome.com/images/h5/product_item_more.png' style={{width:110,paddingTop:5}}/>
                           </div>
                        </ul>
                    </div>
                </div>
                {/* 上衣 */}
                <div className="goodsBox">
                    <div>
                        <img src={this.state.goodsimg[1]} style={{width:'100%'}}/>
                    </div>
                    <div>
                        <ul className="listBox">
                            {
                                this.state.goodsBox3.map(item=>{
                                    return <li onClick={this.goto.bind(this,`/detail${item._id}`)} key={item._id} style={{width:110,height:167}}>
                                        <img src={item.select.data[0].image} style={{width:'100%'}}/>
                                        <p className="goodsTitle">{item.title}</p>
                                        <strong>{'￥' + item.newPrice}</strong><span style={{float:"right"}}>自营</span>
                                    </li>
                                })
                            }
                           <div style={{width:100,height:110}}>
                                <img src='http://www.dunkhome.com/images/h5/product_item_more.png' style={{width:110,paddingTop:5}}/>
                           </div>
                        </ul>
                    </div>
                </div>
                {/* 休闲鞋 */}
                <div className="goodsBox">
                    <div>
                        <img src={this.state.goodsimg[2]} style={{width:'100%'}}/>
                    </div>
                    <div>
                        <ul className="listBox">
                            {
                                this.state.goodsBox2.map(item=>{
                                    return <li onClick={this.goto.bind(this,`/detail${item._id}`)} key={item._id} style={{width:110,height:167}}>
                                        <img src={item.select.data[0].image} style={{width:'100%'}}/>
                                        <p className="goodsTitle">{item.title}</p>
                                        <strong>{'￥' + item.newPrice}</strong><span style={{float:"right"}}>自营</span>
                                    </li>
                                })
                            }
                           <div style={{width:100,height:110}}>
                                <img src='http://www.dunkhome.com/images/h5/product_item_more.png' style={{width:110,paddingTop:5}}/>
                           </div>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(withAjax(SaoGoods));