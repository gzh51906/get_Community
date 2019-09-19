import React from "react";
import {Route,Redirect,NavLink,Switch} from "react-router-dom";
import Login from "./route/login";

class App extends React.Component{
    render(){
        return <div>
            <Login></Login>
        </div>
    }
}

export default App;