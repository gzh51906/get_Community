import {createStore,combineReducers,applyMiddleware} from "redux";
// import redux_cart from "./route/redux_cart.js";
import createSagaMiddleware from 'redux-saga';

import rootSaga from "./route/rootsaga.js";

// 路由
let allReducer = combineReducers({
    // 例子
    // cart: redux_cart
})

// 创建中间件
const sagaMiddleware = createSagaMiddleware();

// 将中间件连接到store
let middleware = applyMiddleware(sagaMiddleware);

const store = createStore(allReducer, middleware);

// 运行
sagaMiddleware.run(rootSaga);

export default store;