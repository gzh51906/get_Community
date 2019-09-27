import React from "react";
import {Route,Redirect,NavLink,Switch} from "react-router-dom";
import {withRouter} from 'react-router';
import { Layout,Drawer, Button,Menu, Icon } from 'antd';


//黄日隆
import Login from './route/hrl/reg-login';
import SaoGoods from './route/hrl/saogoods';
import APP from './route/hrl/app';
import Allgoods from './route/hrl/allgoods';
import LoginType from './route/hrl/loginType';
import LoginType2 from './route/hrl/loginType2';
import Personer from './route/hrl/personer';
import './App.css';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

//苏沛龙
import Home from "./route/spl/Home";
import NewPage from "./route/spl/NewPage";
import Detail from "./route/spl/detail"
import Cart from "./route/spl/cart"
import New from "./route/spl/New"
import Order from "./route/spl/orderList"

class App extends React.Component{
    rootSubmenuKeys = ['/home', '/new','/saogoods', 'sub4'];

    //数据
    state = {
     visible: false,
     openKeys: ['sub4'],
     isUse:false,
     usename:'',
     hrlTrue:false,
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
     onTitleClick=(e)=>{
        this.props.history.push(e.key)
        this.onClose();
     }
     loginout=()=>{
         localStorage.removeItem('username');
         this.setState({
             usename:'',
         })
         this.onClose();
         this.props.history.push('/home');
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
     hgoto=(path)=>{
         this.props.history.push(path);
         this.onClose();
     }
     //进行判断是否有用户登入状态
     componentDidMount(){
         this.state.usename = localStorage.getItem('username');
         if(this.state.usename){
             this.setState({
                 isUse:true
             })
         }
     }

    render(){
        let {isUse} = this.state;
        let {hgoto,onClose} = this;
        // console.log(decodeURI(this.props.location.search.slice(1)))
        return <div style={{height:"100%"}}>
            <Layout>
                <Header style={{backgroundColor:"#fff",height:'1.08rem',padding:0}}>
                        <Icon onClick={this.showDrawer} type="menu" style={{fontSize:'24px',marginLeft:'20px'}}></Icon>
                        <img src="./route/hrl/img/logo.png" width="50px" style={{marginLeft:'32%',marginBottom:'10px'}}/>
                        
                        {   
                            isUse
                            ? 
                            <Icon onClick={this.hgoto.bind(this,'/cart')} type="shopping-cart" style={{fontSize:'24px',float:'right',marginRight:'20px',lineHeight:'54px'}}></Icon>
                            :
                            <Icon onClick={this.hgoto.bind(this,'/login')} type="user" style={{fontSize:'24px',float:'right',marginRight:'20px',lineHeight:'54px'}}></Icon>
                            
                        }
                        <Drawer
                        placement="left"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        keyboard={true}
                        >
                        <Layout>
                            
                            <Header style={{height:'3.6rem',backgroundColor:'rgba(96,96,96)',padding:0}}>
                                {
                                    isUse
                                    ?
                                    <LoginType2 onClose={onClose}></LoginType2>
                                    :
                                    <LoginType onClose={onClose}></LoginType>
                                }                             
                            </Header>
                           
                            <Content >
                                 <Menu
                                mode="inline"
                                openKeys={this.state.openKeys}
                                onOpenChange={this.onOpenChange}
                                style={{ width: '5.12rem'}}
                            >
                                <SubMenu
                                key="/home"
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
                                key="/new"
                                onTitleClick={this.onTitleClick}
                                title={
                                    <span>
                                    <Icon type="profile"/>
                                    <span>资讯</span>
                                    </span>
                                }
                                >
                                </SubMenu>
                                 <SubMenu
                                key="/saogoods"
                                onTitleClick={this.onTitleClick}
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
                                <span onClick={this.loginout}> 退出账号</span>
                            </Footer>
                        </Layout>
                    </Drawer>
                </Header>

                <Content style={{backgroundColor:'#fff',borderTop:'1px #ccc solid'}}>
                    <Switch>
                        {/* 使用路由-黄日隆 */}
                        <Route path="/login" component={Login}></Route>
                        <Route path="/saogoods" component={SaoGoods}></Route>
                        <Route path='/app' component={APP}></Route>
                        <Route path='/allgoods' component={Allgoods}></Route>
                        <Route path="/personer" component={Personer}></Route>
                        {/* {Home路由-苏沛龙} */}

                        <Route path="/home" component={Home}></Route>
                        <Route path="/newPage:_id" component={NewPage}></Route>
                        <Route path="/detail:_id" component={Detail}></Route>
                        <Route path="/cart" component={Cart}></Route>
                        <Route path="/new" component={New}></Route>
                        <Route path="/order" component={Order}></Route>
                        <Route path="/" component={Home}></Route>
                    </Switch>
                </Content>
            </Layout> 
        </div>
    }
}

export default withRouter(App);