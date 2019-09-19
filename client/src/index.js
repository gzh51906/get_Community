import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import {HashRouter,BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store.js";

ReactDOM.render( 
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('app')
)