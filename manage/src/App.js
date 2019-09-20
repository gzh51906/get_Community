import React from "react";
import {Route,Redirect,NavLink,Switch} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./route/login";
import Home from "./route/home";

class App extends React.Component{
    componentDidMount(){
        console.log(this.props);
    }
    render(){
        return <div>
            {
                this.props.authorType ? <Home></Home> : <Login></Login>
            }
        </div>
    }
}


let mapStateToProps = function (state) {
    return {
        authorType: state.common.authorType
    }
}

let mapDispatchToProps = function (dispatch) {
    return {

    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;