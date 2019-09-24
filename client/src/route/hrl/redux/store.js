import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducer';
import {composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga.js';
const sagaMiddleware = createSagaMiddleware();

let enhancer = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, composeWithDevTools(enhancer));

sagaMiddleware.run(rootSaga);
export default store;