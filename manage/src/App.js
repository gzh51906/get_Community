import React from "react";
import {connect} from "react-redux";
import Login from "./route/login";
import Home from "./route/home";

class App extends React.Component{
    componentDidMount(){
        let localAuthor = localStorage.getItem("author");
        if (localAuthor){
            this.props.authorShow();
        }
    }
    render(){
        return <div style={{height:"100%"}}>
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
        authorShow(){
            dispatch({type:"authorShow"});
        }
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;