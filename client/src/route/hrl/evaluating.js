import React, { Component } from 'react';
import {Tabs, Col, Row, Icon } from 'antd'

import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';
const { TabPane } = Tabs;

class Evaluating extends Component{
    //数据
    state={
        pingcelist:[],
        isColor:true,
    }
    
    //方法
    async componentDidMount(){
        let {get} = this.props;
        let {data} = await get('http://127.0.0.1:1902/hrl/evaluating')
        this.setState({
            pingcelist:data.slice(4,16)
        })
    }
    //点击事件
    async newtype(){
        this.componentDidMount();
        this.setState({
            isColor:true
        })
    }

    async hottype(){
        let {get} = this.props;
        let {data} = await get('http://127.0.0.1:1902/hrl/evaluating')
        this.setState({
            pingcelist:data.slice(16,33),
            isColor:false
        })
    }

    render(){
        let {pingcelist,isColor} = this.state;
        return(
            <div>
                <Row style={{borderBottom:'1px solid #ccc'}}>
                    <Col onClick={this.newtype.bind(this)} span={12} style={{
                        textAlign:'center',
                        fontSize:'20px',
                        paddingTop:'10px',
                        paddingBottom:'10px',
                        color:isColor?'blue':''}}>最新</Col>
                    <Col onClick={this.hottype.bind(this)} span={12} style={{
                        textAlign:'center',
                        fontSize:'20px',
                        paddingTop:'10px',
                        color:isColor?'':'blue',
                        paddingBottom:'10px'}}>最热</Col>
                </Row>
                <div>
                        {
                            pingcelist.map(item=>{
                                return <div key={item._id} style={{width:'100%',borderBottom:'1px solid #ccc'}}>
                                    <div style={{margin:'8px'}}>
                                        <img style={{width:'30px',border:'1px solid #ccc',borderRadius:'50%'}} src={item.autorImg}/>
                                        <span style={{marginLeft:'10px'}}>{item.authorName}</span>
                                        <span style={{float:'right',lineHeight:'30px'}}>{item.date}</span>
                                    </div>
                                    <img style={{width:'100%'}} src={item.bigImg}/>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.detail}</p>
                                        <div style={{textAlign:'right'}}>
                                            <Icon type="like" style={{marginRight:'5px'}}></Icon><span style={{marginRight:'10px'}}>{item.like}</span>
                                            <Icon type="message" style={{marginRight:'5px'}}></Icon><span style={{marginRight:'10px'}}>{item.comment}</span>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                </div>
            </div>
        )
    }
}

export default withRouter(withAjax(Evaluating));