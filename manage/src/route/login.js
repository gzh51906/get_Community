import React from "react";
import {connect} from "react-redux";
import { Row, Col,Form, Icon, Input, Button,message } from 'antd';
import withAjax from "../heightRouter/withAjax.js";

class Login extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            let data = await this.props.get("http://127.0.0.1:1902/crx/login",values);
            if(data.code === 1){
                let {manage,insert,update,remove} = data.data[0];
                localStorage.setItem("author", values.username);
                this.props.changeType({author:values.username,manage,insert,update,remove});
            }else{
                message.warning('用户名或密码错误');
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return <div>
            <Row type="flex" justify="center" style={{marginTop:200}}>
                <Col xs={{span:20}} sm={{span:5}}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '管理员名称不能为空' },{min:2,message:"管理员名称最小长度为2"}],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入管理员的名称"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码不能为空' }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width:"100%"}}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    }
}

let mapStateToProps = function(state){
    return {

    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        changeType({author,manage,insert,update,remove}){
            dispatch({type:"changeType",author,manage,insert,update,remove});
        }
    }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);
Login = Form.create({ name: 'normal_login' })(Login);
Login = withAjax(Login);
export default Login;