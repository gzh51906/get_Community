import React from "react";
import {connect} from "react-redux";
import { Row, Col } from 'antd';

class Login extends React.Component{
    render(){
        return <div>
            <Row type="flex" justify="center">
                <Col xs={{span:20}} sm={{span:10}}>
                    col-12 col-offset-6
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

    }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;