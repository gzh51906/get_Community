import React, { Component } from 'react';
import {withRouter} from 'react-router';
import withAjax from '../../heightRouter/withAjax';


class usePhone extends Component{
    state={
        phoneNum:'',
    }
    //方法
    async componentDidMount(){
        let {get} = this.props;
        let usename = localStorage.getItem('username');
        let {
            data
        } = await get('http://49.232.25.17:1902/hrl/login', {
            usename: usename
        })
        console.log(data[0].phoneNum);
        this.setState({
            phoneNum: data[0].phoneNum
        })
    }
    render(){
        let {phoneNum} = this.state;
        return(
            <div style={{textAlign:"center"}}>
                {'您已经绑定手机号：' + phoneNum}
            </div>
        )
    }
}

export default withRouter(withAjax(usePhone));