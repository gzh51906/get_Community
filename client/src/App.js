import React from "react";
import {Route,Redirect,NavLink,Switch} from "react-router-dom";
import {withRouter} from 'react-router';
import { Layout,Drawer, Button,Menu, Icon } from 'antd';


//黄日隆
import Login from './route/hrl/reg-login';
import './App.css';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

//苏沛龙
import Home from "./route/spl/Home";
import NewPage from "./route/spl/NewPage"

class App extends React.Component{
    rootSubmenuKeys = ['sub1', 'sub2','sub3', 'sub4'];

    //数据
    state = {
     visible: false,
     openKeys: ['sub4'],
    }
    //方法
     showDrawer = () => {
         this.setState({
             visible: true,
         });
     };

     onClose = () => {
         this.setState({
             visible: false,
         });
     };
     onTitleClick=()=>{
       this.prop.history.push("/home")
        
     }

     //菜单的方法
     onOpenChange = openKeys => {
         const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
         if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
             this.setState({
                 openKeys
             });
         } else {
             this.setState({
                 openKeys: latestOpenKey ? [latestOpenKey] : [],
             });
         }
     };


    render(){
        return <div style={{height:"100%"}}>
            <Layout>
                <Header style={{backgroundColor:"#fff",height:'1.08rem',padding:0}}>
                        <Icon onClick={this.showDrawer} type="menu" style={{fontSize:'24px',marginLeft:'20px'}}></Icon>
                        <img src="./route/hrl/img/logo.png" width="50px" style={{marginLeft:'32%',marginBottom:'10px'}}/>
                        <NavLink to="/login">
                        <Icon type="user" style={{fontSize:'24px',float:'right',marginRight:'20px',lineHeight:'54px'}}></Icon>
                        </NavLink>
                        <Drawer
                        placement="left"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible} 
                        >
                        <Layout>
                            <Header style={{height:'3.6rem',backgroundColor:'rgba(96,96,96)',padding:0}}>
                                <NavLink to={{
                                    pathname:'/login',
                                }}><Button style={{float:'left',marginTop:'1.6rem',marginLeft:'0.8rem'}}>注册</Button></NavLink>
                                <NavLink to={{
                                    pathname:'/login',
                                }}><Button type="primary" style={{float:'right',marginTop:'1.6rem',marginRight:'0.8rem'}}>登录</Button></NavLink>
                            </Header>
                            <Content >
                                 <Menu
                                mode="inline"
                                openKeys={this.state.openKeys}
                                onOpenChange={this.onOpenChange}
                                style={{ width: '5.12rem'}}
                            >
                                <SubMenu
                                key="sub1"
                                onTitleClick={this.onTitleClick}
                                title={
                                    <span>
                                    <Icon type="home" theme='filled'/>
                                    <span>首页</span>
                                    </span>
                                }
                                >
                                </SubMenu>
                                <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                    <Icon type="profile"/>
                                    <span>资讯</span>
                                    </span>
                                }
                                >
                                </SubMenu>
                                 <SubMenu
                                key="sub3"
                                title={
                                    <span>
                                    <Icon type="shopping" theme="filled"/>
                                    <span>扫货</span>
                                    </span>
                                }
                                >
                                </SubMenu>
                                <SubMenu
                                key="sub4"
                                title={
                                    <span>
                                    <Icon type="notification" theme="filled"/>
                                    <span>社区</span>
                                    </span>
                                }
                                >
                                <Menu.Item key="9">评测区</Menu.Item>
                                <Menu.Item key="10">晒图区</Menu.Item>
                                <Menu.Item key="11">运动品牌鉴定区</Menu.Item>
                                <Menu.Item key="12">潮牌鉴定区</Menu.Item>
                                </SubMenu>
                            </Menu>
                            </Content>
                            <Footer style={{textAlign:"center"}}>
                                <span> 退出账号</span>
                            </Footer>
                        </Layout>
                    </Drawer>
                </Header>

                <Content style={{backgroundColor:'#fff',borderTop:'1px #ccc solid'}}>
                    <Switch>
                        {/* 使用路由-黄日隆 */}
                        <Route path="/login" component={Login}></Route>
                        {/* {Home路由-苏沛龙} */}
                        <Route path="/home" component={Home}></Route>
                        <Route path="/newPage:_id" component={NewPage}></Route>
                        <Route path="/" component={Home}></Route>
                    </Switch>
                </Content>
            </Layout>





                
                
        </div>
    }
}

export default withRouter(App);