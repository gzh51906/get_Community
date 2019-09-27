import React, { Component } from 'react';
import { Row, Col,Icon, Tooltip, Badge } from 'antd';
import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';
class LoginType2 extends Component{
    //数据
    state={
        username:'',
        cartLength:'',
    }
    async componentDidMount(){
        let {get} = this.props;
        let cartlist = await get('http://127.0.0.1:1902/hrl/hcart');
        this.setState({
            username:localStorage.getItem('username'),
            cartLength:cartlist.data.length,
        })
    }
    hgoto=(path)=>{
        this.props.history.push(path);
        this.props.onClose();
    }
    render(){
        let {username,cartLength} = this.state
        return(
            <div>
                <Row>
                    <Col span={12} offset={6} style={{textAlign:'center',marginTop:'10px'}}>
                        <img src='http://images.dunkhome.com/get/defaul_avator.png' width='40px'/>
                    </Col>
                </Row>
                <div style={{marginLeft:'64px',width:'128px',height:'32px',lineHeight:'32px',textAlign:'center'}}>
                    <Tooltip title={username==='黄日隆'?'黄日隆最帅气':'隆哥的小弟'}>
                    <span style={{color:'#fff',fontSize:16}}>{username}</span></Tooltip><br/>
                    <span style={{color:'#fff',backgroundColor:'#00AAEA',marginRight:'20px'}}>vip</span>
                    <span style={{display:'inlne-block',width:'30px',height:'30px',borderRadius:'50%',backgroundColor:'#ccc',color:'#fff',fontSize:'12px'}}>密</span>
                </div>
                <Row style={{marginTop:'20px'}}>
                    <Col span={8} style={{textAlign:'center'}}>
                        <Icon  type="search" style={{fontSize:'24px',color:'#fff'}}></Icon>
                    </Col>
                    <Col span={8} style={{marginTop:'20px',textAlign:'center'}}>
                        <div onClick={this.hgoto.bind(this,'/personer')} style={{backgroundColor:'#fff',height:'26px',lineHeight:'26px'}}>个人中心</div>
                    </Col>
                    <Col span={8} style={{textAlign:'center'}}>
                        <Badge count={cartLength}>
                        <Icon onClick={this.hgoto.bind(this,'/cart')} type="shopping-cart" style={{fontSize:'24px',color:'#fff'}}></Icon>
                        </Badge>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(withAjax(LoginType2));