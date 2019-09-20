import React,{Component} from 'react';
import {
    Row,
    Col,
    Button,
} from 'antd';

import Reg from './reg';
import Login from './login';

const ButtonGroup = Button.Group;

class RegLogin extends Component{
    //数据
    state = {
        isForm:true,
    }
    //方法
    changTure=()=>{
        this.setState({
            isForm:true,
        })
    }
    changFalse=()=>{
        this.setState({
            isForm:false,
        })
    }
    render(){
        let {isForm,lightColor} = this.state
        return(
            <div style={{padding:20}}>
                <Row style={{marginTop:'30px'}}>
                    <Col span={12} offset={6}>
                        <ButtonGroup>
                        <Button  size="large" type='primary' onClick={this.changTure}>
                            登入
                        </Button>
                        <Button size="large" type='danger' onClick={this.changFalse}>
                            注册
                        </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                {
                    isForm ? <Login></Login> : <Reg></Reg>
                }
            </div>
        )
    }
}

export default RegLogin;