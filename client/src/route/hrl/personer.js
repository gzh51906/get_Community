import React, { Component } from 'react';
import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';
import { Row, Col, Icon } from 'antd';
//引入外部样式
import './style/personer.css';

class Personer extends Component{
    //数据
    state={
        username:'',
        num:'',
        day:'',
        muen:[{
            text:'待付款',
            icon: 'car'
        },{
            text:'待发货',
            icon: 'dropbox'
        },{
            text:'待收货',
            icon: 'credit-card'
        },{
            text:'退换货',
            icon: 'retweet'
        }],
        Mygoods:[{
            text:'我的购物车',
            icon: 'shopping-cart',
            path:'/cart'
        },{
            text:'我的晒图',
            icon: 'picture',
            path:''
        },{
            text:'我的评测',
            icon: 'solution',
            path:''
        },{
            text:'我的讨论',
            icon: 'message',
            path:''
        },{
            text:'我的鉴定',
            icon: 'search',
            path:''
        }],
        Mystreen:[{
            text:'我的优惠劵',
            icon: 'red-envelope'
        },{
            text:'我的收货地址',
            icon: 'environment'
        },{
            text:'手机绑定',
            icon: 'mobile'
        },{
            text:'身份证信息',
            icon: 'idcard'
        }]
    }

    async componentDidMount(){
        let {get,formatDate} = this.props;
        let usename = localStorage.getItem('username')
        let {data} = await get('http://127.0.0.1:1902/hrl/sgin',{
            usename:usename,
        })
        let dataTime = formatDate(data[0].sginTime,'-');
        console.log(dataTime.slice(8,10));
        this.setState({
            username:localStorage.getItem('username'),
            num: data[0].coin,
            day:dataTime.slice(8,10),
        })
    }
    //点击签到
    async onSgin(){
        let time = Date.now();
        let {patch,formatDate} = this.props;
        let usename = localStorage.getItem('username')
        let sginDate = formatDate(time,'-');
        let {num,day} = this.state;
        if(day !== sginDate.slice(8,10)){
            num = num + 5;
            let {data} = await patch('http://127.0.0.1:1902/hrl/sgin',{
                    usename: usename,
                    sginTime: time,
                    coin:num
        });
        this.componentDidMount();
        }
        console.log(sginDate,num);
    }
    //点击跳转
    goto(path){
        console.log(path);
        this.props.history.push(path);
    }
    render(){
        let {username,num,muen,Mygoods,Mystreen} = this.state;
        return(
            <div>
                <div className="hNavtop">
                    <div className="hNavtop_left" style={{float:'left'}}>
                        <strong style={{fontSize:'32px'}}>{username}</strong>
                        <div style={{marginTop:'10px'}}>
                            <span style={{marginRight:'10px'}}>Lv.1</span><span>保密</span>
                        </div>
                        <div style={{marginTop:'15px'}}><strong style={{fontSize:'24px',marginRight:'10px'}}>{num}</strong><span>金币</span></div>
                    </div>
                    <div className="hNavtop_right" style={{float:'right'}}>
                        <div><img style={{width:'65px',margin:'15px'}} src="http://images.dunkhome.com/get/defaul_avator.png"/></div>
                        <div onClick={this.onSgin.bind(this)} className="hSign">签到</div>
                    </div>
                </div>
                <div className="hordera">
                    <div className="hordera_top">
                        <span>我的订单</span><span style={{float:'right'}}>查看全部订单 ></span>
                    </div>
                    <div>
                         <Row style={{marginBottom:'10px'}}>
                             {
                                 muen.map(item=>{
                                     return <Col key={item.text} span={6} style={{textAlign:'center'}}>
                                            <div style={{marginTop:'10px',marginBottom:'10px'}}><Icon type={item.icon} style={{fontSize:'26px'}}></Icon></div>
                                            {item.text}
                                         </Col>
                                 })
                             }
                        </Row>
                    </div>
                </div>
                <div className="hordera">
                    <div className="hordera_top">
                        <span>历史订单</span><span style={{float:'right'}}>查看全部订单 ></span>
                    </div>
                    <div>
                         <Row style={{marginBottom:'10px'}}>
                             {
                                 muen.map(item=>{
                                     return <Col key={item.text} span={6} style={{textAlign:'center'}}>
                                            <div style={{marginTop:'10px',marginBottom:'10px'}}><Icon type={item.icon} style={{fontSize:'26px'}}></Icon></div>
                                            {item.text}
                                         </Col>
                                 })
                             }
                        </Row>
                    </div>
                </div>
                <div className="hMygoods">
                    {
                        Mygoods.map(item=>{
                            return <div key={item.text} className="hMybox">
                                <div onClick={this.goto.bind(this,item.path)} style={{marginTop:'35px'}}>
                                    <Icon type={item.icon} style={{fontSize:'26px'}}/>
                                </div>
                                <span>{item.text}</span>
                            </div>
                        })
                    }
                </div>
                <div className="hMystree">
                    {
                        Mystreen.map(item=>{
                            return <div className="hStreebox" key={item.text}>
                                <Icon type={item.icon} style={{fontSize:'24px',marginLeft:'10px'}}/>
                                <span style={{marginLeft:'8px'}}>{item.text}</span>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(withAjax(Personer));