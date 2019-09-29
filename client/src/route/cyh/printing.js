import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Layout } from 'antd';
import withAjax from '../../heightRouter/withAjax';

const { Header, Footer, Content } = Layout;

class Printing extends Component{
    render(){
        return(
            <div style={{width:'100%',height:'100%',background:'#f0f2f5'}}>
                <Layout>
                    <Header style={{width:'100%',background:'#fff',padding:'7px',height:'100%',overflow:'hidden',marginBottom:'10px'}}>
                        <h3 style={{float:'left',fontSize:'14px',color:'#606060',lineHeight:'30px'}}>热门话题·hot topipcs</h3>
                        <span style={{float:'right',color:'#929292',fontSize:'12px',lineHeight:'30px'}}>查看更多>></span>
                        <ul style={{width:'100%',overflow:'hidden',padding:'0',margin:'0'}}>
                            <li style={{float:'left',width:'-webkit-calc((100% - 40px) / 3 )',height:'100%',marginLeft:'10px'}}>
                                <img src="http://images.dunkhome.com/feed-topic/image/150/cropped____180x180_copy.jpg" style={{width:'100%'}}/>
                                <p style={{textAlign:'center',fontSize:'12px',lineHeight: '30px'}}>#get买家秀</p>
                            </li>
                            <li style={{float:'left',width:'-webkit-calc((100% - 40px) / 3 )',height:'100%',marginLeft:'10px'}}>
                                <img src="http://images.dunkhome.com/feed-topic/image/40/cropped_____2.jpg" style={{width:'100%'}}/>
                                <p style={{textAlign:'center',fontSize:'12px',lineHeight: '30px'}}>#球鞋定制</p>
                            </li>
                            <li style={{float:'left',width:'-webkit-calc((100% - 40px) / 3 )',height:'100%',marginLeft:'10px'}}>
                                <img src="http://images.dunkhome.com/feed-topic/image/120/cropped_____180x180.jpg" style={{width:'100%'}}/>
                                <p style={{textAlign:'center',fontSize:'12px',lineHeight: '30px'}}>#海淘晒单</p>
                            </li>
                        </ul>
                    </Header>
                    <Content style={{height:'100%',marginTop:'0px',background:'#f0f2f5'}}>
                        <h3 style={{marginTop:'5px',fontSize:'14px',color:'#606060',lineHeight:'30px',padding:'7px',margin:'0',background:'#fff'}}>热门推荐·hot recommended</h3>
                        <ul style={{paddingLeft:'0'}}>
                            <li style={{marginBottom:'10px',background:'#fff'}}>
                                <div style={{paddingLeft:'5px', width:'100%',height:'60px',paddingTop:'10px'}}>
                                    <img src="http://images.dunkhome.com/user/avator/383508/thumb_RackMultipart20190212-14500-kjanqq" style={{float:'left',borderRadius:'50%',width:'40px'}} />
                                    <div style={{float:'left',marginLeft:'5px'}}>
                                        <p style={{color:'#222',fontSize:'12px',lineHeight:'20px',margin:'0'}}>baby_iiii</p>
                                        <p style={{color:'#ABABAB',fontSize:'10px',lineHeight:'20px',margin:'0'}}>2小时前</p>
                                    </div>
                                </div>
                                <div style={{overflow:'hidden',paddingTop:'8px'}}>
                                    <img src="http://images.dunkhome.com/feed-item/image/1139854/normal_item_image.jpg" style={{float:'left',width:'-webkit-calc((100% - 1px) / 2)'}}/>
                                    <img src="http://images.dunkhome.com/feed-item/image/1139855/normal_item_image.jpg" style={{float:'left',width:'-webkit-calc((100% - 1px) / 2)'}}/>
                                </div>
                                <p style={{color:'#929292',fontSize:'12px',background:'#F3F3F3',display:'inline-block',lineHeight:'16px',marginLeft:'7px',marginBottom:'0'}}>#就是爱肉体</p>
                                <div>
                                    <span style={{fontSize:'10px',paddingLeft:'10px',color:'#929292'}}>♥ 38</span>
                                    <span style={{fontSize:'10px',paddingLeft:'20px',color:'#929292'}}>💬 2</span>
                                </div>
                            </li>
                            <li style={{marginBottom:'10px',background:'#fff'}}>
                                <div style={{paddingLeft:'5px', width:'100%',height:'60px',paddingTop:'10px'}}>
                                    <img src="http://images.dunkhome.com/user/avator/173754/thumb_RackMultipart20170412-1582-1g4wqqw" style={{float:'left',borderRadius:'50%',width:'40px'}} />
                                    <div style={{float:'left',marginLeft:'5px'}}>
                                        <p style={{color:'#222',fontSize:'12px',lineHeight:'20px',margin:'0'}}>壹捌叁</p>
                                        <p style={{color:'#ABABAB',fontSize:'10px',lineHeight:'20px',margin:'0'}}>16小时前</p>
                                    </div>
                                </div>
                                <div style={{overflow:'hidden',paddingTop:'8px'}}>
                                    <img src="http://images.dunkhome.com/feed-item/image/1139852/normal_item_image.jpg" style={{float:'left',width:'-webkit-calc((100% - 1px) / 2)'}}/>
                                    <img src="http://images.dunkhome.com/feed-item/image/1139853/normal_item_image.jpg" style={{float:'left',width:'-webkit-calc((100% - 1px) / 2)'}}/>
                                </div>
                                <p style={{color:'#929292',fontSize:'12px',background:'#F3F3F3',display:'inline-block',lineHeight:'16px',marginLeft:'7px',marginBottom:'0'}}>#潮流穿搭show</p>
                                <div>
                                    <span style={{fontSize:'10px',paddingLeft:'10px',color:'#929292'}}>♥ 42</span>
                                    <span style={{fontSize:'10px',paddingLeft:'20px',color:'#929292'}}>💬 0</span>
                                </div>
                            </li>
                            <li style={{marginBottom:'10px',background:'#fff'}}>
                                <div style={{paddingLeft:'5px', width:'100%',height:'60px',paddingTop:'10px'}}>
                                    <img src="http://images.dunkhome.com/user/avator/88176/thumb_RackMultipart20151012-24745-1x9jh9m" style={{float:'left',borderRadius:'50%',width:'40px'}} />
                                    <div style={{float:'left',marginLeft:'5px'}}>
                                        <p style={{color:'#222',fontSize:'12px',lineHeight:'20px',margin:'0'}}>﹏年輕人丶</p>
                                        <p style={{color:'#ABABAB',fontSize:'10px',lineHeight:'20px',margin:'0'}}>16小时前</p>
                                    </div>
                                </div>
                                <div style={{overflow:'hidden',paddingTop:'8px'}}>
                                    <img src="http://images.dunkhome.com/feed-item/image/1139848/normal_item_image.jpg" style={{float:'left',width:'-webkit-calc((100% - 1px) / 2)'}}/>
                                    <img src="http://images.dunkhome.com/feed-item/image/1139849/normal_item_image.jpg" style={{float:'left',width:'-webkit-calc((100% - 1px) / 2)'}}/>
                                </div>
                                <p style={{color:'#929292',fontSize:'12px',background:'#F3F3F3',display:'inline-block',lineHeight:'16px',marginLeft:'7px',marginBottom:'0'}}>zk4.还挺良心，手工拆鞋</p>
                                <div>
                                    <span style={{fontSize:'10px',paddingLeft:'10px',color:'#929292'}}>♥ 37</span>
                                    <span style={{fontSize:'10px',paddingLeft:'20px',color:'#929292'}}>💬 0</span>
                                </div>
                            </li>
                            <li style={{marginBottom:'10px',background:'#fff'}}>
                                <div style={{paddingLeft:'5px', width:'100%',height:'60px',paddingTop:'10px'}}>
                                    <img src="http://images.dunkhome.com/user/avator/1190416/thumb_RackMultipart20181215-14390-1jb3aks" style={{float:'left',borderRadius:'50%',width:'40px'}} />
                                    <div style={{float:'left',marginLeft:'5px'}}>
                                        <p style={{color:'#222',fontSize:'12px',lineHeight:'20px',margin:'0'}}>Angela婷</p>
                                        <p style={{color:'#ABABAB',fontSize:'10px',lineHeight:'20px',margin:'0'}}>2018-12-15 11:45:16</p>
                                    </div>
                                </div>
                                <div style={{overflow:'hidden',paddingTop:'8px'}}>
                                    <img src="http://images.dunkhome.com/feed-item/image/1060801/normal_item_image.jpg" style={{float:'left',width:'-webkit-calc((100% - 1px) / 2)'}}/>
                                    <img src="http://images.dunkhome.com/feed-item/image/1060802/normal_item_image.jpg" style={{float:'left',width:'-webkit-calc((100% - 1px) / 2)'}}/>
                                </div>
                                <p style={{color:'#929292',fontSize:'12px',background:'#F3F3F3',display:'inline-block',lineHeight:'16px',marginLeft:'7px',marginBottom:'0'}}>#最污挑战赛</p>
                                <div>
                                    <span style={{fontSize:'10px',paddingLeft:'10px',color:'#929292'}}>♥ 1562</span>
                                    <span style={{fontSize:'10px',paddingLeft:'20px',color:'#929292'}}>💬 64</span>
                                </div>
                            </li>
                        </ul>
                    </Content>
                    <Footer style={{padding:'0',height:'0'}}></Footer>
                </Layout>
            </div>
        )
    }p
}


export default withRouter(withAjax(Printing));