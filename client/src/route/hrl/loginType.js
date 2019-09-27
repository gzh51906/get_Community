import React, { Component } from 'react';
import {Button} from 'antd';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';

class LoginType extends Component{

    //跳转方法
    goto(){
        this.props.history.push('/login')
        this.props.onClose();
    }
    render(){
        return(
            <div>
                <Button onClick={this.goto.bind(this)} style={{float:'left',marginTop:'1.6rem',marginLeft:'0.8rem'}}>注册</Button>
                <Button  onClick={this.goto.bind(this)} type="primary" style={{float:'right',marginTop:'1.6rem',marginRight:'0.8rem'}}>登录</Button>
            </div>
        )
    }
}

export default withRouter(LoginType);