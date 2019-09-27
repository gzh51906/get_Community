import React, { Component } from 'react';
import {Tabs, Col, Row } from 'antd'

import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';
const { TabPane } = Tabs;

class Evaluating extends Component{
    //数据
    state={

    }
    
    //方法
    async componentDidMount(){
        let {get} = this.props;
        let {data} = await get('http://127.0.0.1:1902/hrl/reg')
        console.log(data);
    }

    render(){
        return(
            <div>
                <Row style={{borderBottom:'1px solid #ccc'}}>
                    <Col span={12} style={{textAlign:'center',fontSize:'20px',paddingTop:'10px',paddingBottom:'10px'}}>最新</Col>
                    <Col span={12} style={{textAlign:'center',fontSize:'20px',paddingTop:'10px',paddingBottom:'10px'}}>最热</Col>
                </Row>
                <div>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(withAjax(Evaluating));