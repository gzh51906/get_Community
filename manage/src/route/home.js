import React from "react";
import {connect} from "react-redux";

class Home extends React.Component{
    render(){
        return <div>
            首页
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

Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;