//引入
import React,{Component} from 'react';
import {
    Form,
    Input,
    Icon,
    Checkbox,
    Button,
} from 'antd';

import {Route,NavLink,Switch} from 'react-router-dom';
import withAjax from '../../heightRouter/withAjax';
//引入样式
import './style/login.css'

class Login extends Component{
    //数据

    //方法
    handleSubmit = e => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
             if (!err) {
                 console.log('Received values of form: ', values);
             }
         });
    };
    componentDidMount(){
        console.log(withAjax)
        
    }


    render(){
        const { getFieldDecorator } = this.props.form;

        return(
                <div style={{marginTop:'40px'}}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('Username', {
                            rules: [{ required: true, message: '请输入你的用户名!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入你的密码!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            忘记密码？
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登入
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
        )
    }
}

const UserLogin = Form.create({ name: 'normal_login' ,name:'register'})(Login);
export default UserLogin;