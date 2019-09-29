import React, { Component } from 'react';
import { Tabs,Icon,Pagination } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';
const { TabPane } = Tabs;
//引入外部样式
import './style/allgoods.css';
class Allgoods extends Component{
    //数据
    state={
        type:[],
        goodslist:[],
        allgoods:[],
        dataNum:[],
    };
    async componentDidMount(){
        let typecode = decodeURI(this.props.location.search.slice(1));
        let {dataNum} = this.state;
        let {get} = this.props;
        let somelist = await get('http://127.0.0.1:1902/hrl/allgoods',{
            type: typecode,
            
        });
        let datalist = await get('http://127.0.0.1:1902/hrl/goodsprice', {
            type: '鞋',
            asc: true
        })
        this.setState({
            goodslist:somelist.data,
            dataNum:datalist.data,
        })
    }
    //方法
    async callback(key){
        let {get} = this.props;
        // console.log(key);
        let somelist = await get('http://127.0.0.1:1902/hrl/allgoods', {
            type: key
        });
        this.setState({
            goodslist:somelist.data,
        })
    }
    //价格升序
    async UpPrice(){
        let {get} = this.props;
        let somelist = await get('http://127.0.0.1:1902/hrl/goodsprice', {
            type: '鞋',
            asc: true
        })
        this.setState({
            goodslist:somelist.data,
        })
    }
    //价格降序
    async DownPrice(){
        let {get} = this.props;
        let somelist = await get('http://127.0.0.1:1902/hrl/goodsprice', {
            type: '鞋',
            asc: false
        })
         this.setState({
             goodslist: somelist.data,
         })
    }
    //跳转
    goto(path){
        this.props.history.push(path);
    }
    //页码控制数据
    onChange=(value)=>{
        let {dataNum} = this.state;
        let num1 = (value-1) * 10;
        let num2 = value * 10;
        let datapage = dataNum.slice(num1,num2)
        this.setState({
            goodslist: datapage,
        })
    }
    render(){
        let {goodslist,allgoods} = this.state;
        return(
            <div>
                <Tabs defaultActiveKey="衣" onChange={this.callback.bind(this)}>
                    <TabPane tab="综合排序" key='衣'>
                         <div className="hgoodsBox">
                        {
                            goodslist.map(item=>{
                                return <div onClick={this.goto.bind(this,`/detail${item._id}`)} key={item._id} style={{marginRight:'10px',width:'165px'}}>
                                    <img src={'http://127.0.0.1:1902/'+item.picture[0]} style={{width:'100%'}}/>
                                    <p className='hgoodsTitle'>{item.title}</p>
                                    <span style={{float:'left'}}>{'￥'+item.newPrice}</span><span style={{float:'right'}}>自营</span>
                                </div>
                            })
                        }
                        </div>
                    </TabPane>
                    <TabPane tab="折扣优先" key="折">
                        <div className="hgoodsBox">
                        {
                            goodslist.map(item=>{
                                return <div onClick={this.goto.bind(this,`/detail${item._id}`)} key={item._id} style={{marginRight:'10px',width:'165px'}}>
                                    <img src={'http://127.0.0.1:1902/'+item.picture[0]} style={{width:'100%'}}/>
                                    <p className='hgoodsTitle'>{item.title}</p>
                                    <span style={{float:'left'}}>{'￥'+item.newPrice}</span><span style={{float:'right'}}>自营</span>
                                </div>
                            })
                        }
                        </div>
                    </TabPane>
                    <TabPane tab="新品优先" key="新">
                         <div className="hgoodsBox">
                        {
                            goodslist.map(item=>{
                                return <div onClick={this.goto.bind(this,`/detail${item._id}`)} key={item._id} style={{marginRight:'10px',width:'165px'}}>
                                    <img src={'http://127.0.0.1:1902/'+item.picture[0]} style={{width:'100%'}}/>
                                    <p className='hgoodsTitle'>{item.title}</p>
                                    <span style={{float:'left'}}>{'￥'+item.newPrice}</span><span style={{float:'right'}}>自营</span>
                                </div>
                            })
                        }
                        </div>
                    </TabPane>
                    <TabPane tab={
                        <span>
                             价格排序
                            <Icon type = "arrow-up" onClick={this.UpPrice.bind(this)}/>
                            <Icon type="arrow-down" onClick={this.DownPrice.bind(this)}/>
                        </span>
                    } key="鞋">
                         <div className="hgoodsBox">
                        {
                            goodslist.slice(0,10).map(item => {
                                return <div onClick={this.goto.bind(this,`/detail${item._id}`)} key={item._id} style={{marginRight:'10px',width:'165px'}}>
                                    <img src={'http://127.0.0.1:1902/'+item.picture[0]} style={{width:'100%'}}/>
                                    <p className='hgoodsTitle'>{item.title}</p>
                                    <span style={{float:'left'}}>{'￥'+item.newPrice}</span><span style={{float:'right'}}>自营</span>
                                </div>
                            })
                        }
                        
                        </div>
                        <Pagination simple defaultCurrent={1} total={90} onChange={this.onChange}/>
                    </TabPane>
                </Tabs>,
            </div>
        )
    }
}

export default withRouter(withAjax(Allgoods));