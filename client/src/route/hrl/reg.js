import React, { Component } from 'react';

//引入所需要的组件
import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';

class Reg extends Component{
    //数据
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

     //方法
     handleSubmit = e => {
        let time = Date.now();
         e.preventDefault();
        let {post,form,get} = this.props;
        form.validateFields(async (err, values) => {
             if (!err) {
                //先进行判断是否已经存在该用户
                let userlist = await get('http://127.0.0.1:1902/hrl/reg', {
                    phoneNum: values.phone
                })
                if(userlist.data.length === 1){
                    alert('已经存在该用户')
                }else{
                    let {
                    data
                    } = await post("http://127.0.0.1:1902/hrl/login", {
                        usename:values.nickname,
                        password:values.psw,
                        phoneNum:values.phone,
                        date:time,
                        coin:100
                    });
                    this.goto('/home',values.nickname);
                    location.reload();
                }
                
             }
         });
     };
     //跳转
     goto = (path,usename) => {
         this.props.history.push(path)
         localStorage.setItem('username', usename);
     };
     
     handleConfirmBlur = e => {
         const {
             value
         } = e.target;
         this.setState({
             confirmDirty: this.state.confirmDirty || !!value
         });
     };
     compareToFirstPassword = (rule, value, callback) => {
         const {
             form
         } = this.props;
         if (value && value !== form.getFieldValue('psw')) {
             callback('Two passwords that you enter is inconsistent!');
         } else {
             callback();
         }
     };

     validateToNextPassword = (rule, value, callback) => {
         const {
             form
         } = this.props;
         if (value && this.state.confirmDirty) {
             form.validateFields(['confirm'], {
                 force: true
             });
         }
         callback();
     };

     render(){
         const { getFieldDecorator } = this.props.form;
          const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
         return(
             <div style={{marginTop:30}}>
                 <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        {/* 手机号码 */}
                        <Form.Item>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '请输入你的电话号码!' }],
                            })(<Input placeholder='手机号码' style={{ width: '100%' }} />)}
                        </Form.Item>
                        {/* 随机验证码 */}
                        <Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                {getFieldDecorator('rannum', {
                                    rules: [{ required: true, message: '请输入验证码!' }],
                                })(<Input placeholder="随机验证码"/>)}
                                </Col>
                                <Col span={12}>
                                <Button>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        {/* 短信验证码 */}
                        <Form.Item>
                            <Row gutter={8}>
                                <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: '请输入短信验证码!' }],
                                })(<Input placeholder="短信验证码"/>)}
                                </Col>
                                <Col span={12}>
                                <Button>获取短信验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        {/* 用户名 */}
                        <Form.Item>
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: '请输入你的用户名!', whitespace: true }],
                            })(<Input placeholder='用户名'/>)}
                        </Form.Item>
                        {/* 密码 */}
                        <Form.Item hasFeedback>
                            {getFieldDecorator('psw', {
                                rules: [
                                {
                                    required: true,
                                    message: '请输入你的密码!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                                ],
                            })(<Input.Password placeholder='密码'/>)}
                        </Form.Item>
                        {/* 再次确认密码 */}
                        <Form.Item hasFeedback>
                            {getFieldDecorator('confirm', {
                                rules: [
                                {
                                    required: true,
                                    message: '请确认你的密码!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                                ],
                            })(<Input.Password onBlur={this.handleConfirmBlur} placeholder='确认密码'/>)}
                        </Form.Item>
                        {/* 提交按钮 */}
                        <Form.Item style={{width:'100%'}}>
                            <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                                注册
                            </Button>
                        </Form.Item>
                   </Form>
             </div>
         )
     }
}
const UserReg = Form.create({ name: 'normal_login' ,name:'register'})(Reg);
export default withRouter(withAjax(UserReg));