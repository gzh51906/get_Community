//引入
import React,{Component} from 'react';
import {
    Form,
    Input,
    Icon,
    Checkbox,
    Button,
} from 'antd';

import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';
//引入样式
import './style/login.css'

class Login extends Component{
    //数据
    state={
        comusename:'',
        compsw:''
    }
    //方法
    handleSubmit = e => {
         e.preventDefault();
         let time = Date.now();
         let {get,form,post,patch} = this.props;
         form.validateFields(async (err, values) => {
             if (!err) {
                 let userlist = await get('http://49.232.25.17:1902/hrl/login', {
                     usename: values.Username
                 })
                if(userlist.data.length === 1){
                    this.state.comusename = userlist.data[0].usename;
                    this.state.compsw = userlist.data[0].password;
                }else{
                    this.state.comusename = '';
                    this.state.compsw = '';
                    alert('不存在该账户')
                }
                  //判断是否存在该用户
                if(this.state.comusename === values.Username && this.state.compsw !== values.password){
                    alert('存在该用户，但是密码不对')
                }else if(this.state.comusename === values.Username && this.state.compsw === values.password){
                    let {data} = await patch('http://49.232.25.17:1902/hrl/login',{
                         usename: values.Username,
                         loginTime: time
                    })
                   this.goto('/home',values.Username)
                    location.reload();
                }
             }
            
         });
    };

    //跳转
    goto=(path,usename)=>{
        this.props.history.push({
            pathname:path,
        })
        localStorage.setItem('username',usename);
        // console.log(path,usename);
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
export default withRouter(withAjax(UserLogin));