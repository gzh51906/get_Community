import { call,apply, put, takeEvery, takeLatest,delay } from 'redux-saga/effects';

// 例子
function* helloWorld(){
    yield console.log("Hello World");
}



function* rootSaga(){
    yield takeLatest("HELLO_WORLD", helloWorld);
}

export default rootSaga;