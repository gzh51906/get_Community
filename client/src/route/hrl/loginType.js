import React, { Component } from 'react';
import {Button} from 'antd';
import {NavLink} from 'react-router-dom';

class LoginType extends Component{
    render(){
        return(
            <div>
             <NavLink to={{
                pathname:'/login',
            }}><Button style={{float:'left',marginTop:'1.6rem',marginLeft:'0.8rem'}}>注册</Button></NavLink>
            <NavLink to={{
                pathname:'/login',
            }}><Button type="primary" style={{float:'right',marginTop:'1.6rem',marginRight:'0.8rem'}}>登录</Button></NavLink>
            </div>
        )
    }
}

export default LoginType;