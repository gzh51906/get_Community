import React from "react";
import {connect} from "react-redux";
import {Route,Redirect,NavLink,Switch} from "react-router-dom";
import { Layout,Collapse, Icon } from 'antd';
import {withRouter} from "react-router";
const { Sider, Content,Header } = Layout;
const { Panel } = Collapse;

import ZiXunMore from "../component/zixunMore";
import ZiXunType from "../component/zixuntype";
import ZiXunTypeAdd from "../component/zixuntypeadd";
import ZiXunMoreAdd from "../component/zixunMoreAdd";
import ZiXunMoreEdit from "../component/ziXunMoreEdit";
import GoodsMore from "../component/goodsMore";
import GoodsEdit from "../component/goodsEdit";
import GoodsType from "../component/goodsType";
import GoodsAdd from "../component/goodsAdd";
import ManageUser from "../component/manageUser";
import ManageUserEdit from "../component/manageUserEdit";
import ManageUserAdd from "../component/manageUserAdd";
import ClientUser from "../component/clientUser";
class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            user:""
        }
        this.changeListTitle = this.changeListTitle.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }
    componentDidMount(){
        let user = localStorage.getItem("author");
        this.setState({
            user
        })
        if (localStorage.getItem("listTitle")){
            this.props.changeListTitle(localStorage.getItem("listTitle"));
        }
    }
    removeUser(){
        localStorage.removeItem("listTitle");
        localStorage.removeItem("author");
        this.props.removeUser();
        this.props.history.push("/zixunmore");
    }
    changeListTitle(value){
        localStorage.setItem("listTitle",value);
        this.props.changeListTitle(value);
    }
    render(){
        return <Layout style={{height:"100%"}}>
            <Sider style={{background:"rgb(255, 255, 255)"}}>
                <h1 style={{background:"rgb(0, 21, 41)",color:"white",textAlign:"center",
                    lineHeight:"50px",
                    fontSize:"20px",
                    marginBottom:"20px",
                    height:"50px"
                }}>GET-后台管理系统</h1>
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    <Panel header="资讯管理" key="1">
                        <p style={{marginLeft:23,cursor:"pointer"}}>
                            <NavLink onClick={this.changeListTitle.bind(this,"首页/资讯管理/资讯信息")} to="/zixunmore" style={{color:"rgb(89, 89, 89)"}} activeStyle={{color:"blue",fontWeight:"600"}}>资讯信息</NavLink>
                        </p>
                        <p style={{marginLeft:23,cursor:"pointer"}}>
                            <NavLink onClick={this.changeListTitle.bind(this,"首页/资讯管理/资讯分类")} to="/zixuntype" style={{color:"rgb(89, 89, 89)"}} activeStyle={{color:"blue",fontWeight:"600"}}>资讯分类</NavLink>
                        </p>
                    </Panel>
                    <Panel header="商品管理" key="2">
                        <p style={{marginLeft:23,cursor:"pointer"}}>
                            <NavLink onClick={this.changeListTitle.bind(this,"首页/商品管理/商品信息")} to="/goodsmore" style={{color:"rgb(89, 89, 89)"}} activeStyle={{color:"blue",fontWeight:"600"}}>商品信息</NavLink>
                        </p>
                        <p style={{marginLeft:23,cursor:"pointer"}}>
                            <NavLink onClick={this.changeListTitle.bind(this,"首页/商品管理/商品分类")} to="/goodstype" style={{color:"rgb(89, 89, 89)"}} activeStyle={{color:"blue",fontWeight:"600"}}>商品分类</NavLink>
                        </p>
                    </Panel>
                    <Panel header="用户管理" key="3">
                        <p style={{marginLeft:23,cursor:"pointer"}}>
                            <NavLink onClick={this.changeListTitle.bind(this,"首页/用户管理/用户信息")} to="/clientuser" style={{color:"rgb(89, 89, 89)"}} activeStyle={{color:"blue",fontWeight:"600"}}>用户信息</NavLink>
                        </p>
                        <p style={{marginLeft:23,cursor:"pointer"}}>
                            <NavLink onClick={this.changeListTitle.bind(this,"首页/用户管理/权限管理")} to="/manageuser" style={{color:"rgb(89, 89, 89)"}} activeStyle={{color:"blue",fontWeight:"600"}}>权限管理</NavLink>
                        </p>
                    </Panel>
                    <Panel header="订单管理" key="4">
                        <p style={{marginLeft:23,cursor:"pointer"}}>
                            <NavLink onClick={this.changeListTitle.bind(this,"首页/订单管理/订单信息")} to="" style={{color:"rgb(89, 89, 89)"}} activeStyle={{color:"blue",fontWeight:"600"}}>订单信息</NavLink>
                        </p>
                        <p style={{marginLeft:23,cursor:"pointer"}}>
                            <NavLink onClick={this.changeListTitle.bind(this,"首页/订单管理/订单退订")} to="" style={{color:"rgb(89, 89, 89)"}} activeStyle={{color:"blue",fontWeight:"600"}}>订单退订</NavLink>
                        </p>
                    </Panel>
                </Collapse>
            </Sider>
            <Content>
                <Layout>
                    <Header style={{height:"50px",background:"rgb(240, 242, 245)",marginBottom:"10px"}}>
                        <span style={{float:"left",height:"100%",fontWeight:"600"}}>{this.props.listTitle}</span>
                        <div style={{overflow:"hidden",float:"right",height:"100%"}}>
                            <p style={{color:"blue",height:"30px",lineHeight:"30px",margin:"0"}}>管理员: {this.state.user}</p>
                            <p onClick={this.removeUser} style={{color:"blue",float:"right",height:"20px",lineHeight:"20px",margin:"0",cursor:"pointer"}}>退出</p>
                        </div>
                    </Header>
                    <Content>
                        <Switch>
                            <Route path="/zixunmore" component={ZiXunMore} exact/>
                            <Route path="/zixunmore/edit" component={ZiXunMoreEdit} />
                            <Route path="/zixunmore/add" component={ZiXunMoreAdd} />
                            <Route path="/zixuntype" component={ZiXunType} exact/>
                            <Route path="/zixuntype/add" component={ZiXunTypeAdd}/>
                            <Route path="/goodsmore" component={GoodsMore} exact/>
                            <Route path="/goodsmore/edit" component={GoodsEdit} exact/>
                            <Route path="/goodsmore/add" component={GoodsAdd} exact/>
                            <Route path="/goodstype" component={GoodsType} exact/>
                            <Route path="/manageuser" component={ManageUser} exact/>
							<Route path="/manageuser/add" component={ManageUserAdd}/>
                            <Route path="/manageuser/edit" component={ManageUserEdit}/>
							<Route path="/clientuser" component={ClientUser} exact/>
                            <Redirect from="/" to="/zixunmore" exact />
                        </Switch>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    }
}

let mapStateToProps = function(state){
    return {
        listTitle:state.common.listTitle
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        changeListTitle(data){
            dispatch({type:"changeListTitle",data});
        },
        removeUser(){
            dispatch({type:"removeUser"});
        }
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
Home = withRouter(Home);
export default Home;