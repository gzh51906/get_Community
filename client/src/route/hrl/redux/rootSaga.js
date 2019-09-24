import {call,put,takeLatest} from 'redux-saga/effects';
import {changeQty} from './action/cart';

import Api from '../api/api';

function* getStock({goods_id,qty}) {
    if(qty>5){
        qty=5
    }
    yield put(changeQty(goods_id,qty));
}

function* rootSage(){
    yield takeLatest('get_stock', getStock);
}

export default rootSage;