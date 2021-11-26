import {  call, put, takeEvery ,all,fork} from 'redux-saga/effects';
import { getDisasterList } from '../../api/api_disaster';
import * as types from './types'



function * GetDisasterList(){
    // console.log('sacxawfwafwad');
    try {
        const response  = yield call(getDisasterList)
        
        if (!response.message){
            yield put({type:types.GET_DISASTER_SUCCESS,payload:response.data});
        }
        else{
            yield put({type:types.GET_DISASTER_FAIL,payload:response.message});
        }
    } catch (error) {
        console.log(error);
        yield put({type:types.GET_DISASTER_FAIL,payload:error});
    }
}
function * GET_DISASTERLIST_REQUEST(){
    yield takeEvery(types.GET_DISASTER_WATCH,GetDisasterList)
}

//-------------------//

export default function* ImportMapSage() {
    yield all([
      fork(GET_DISASTERLIST_REQUEST),
    ]);
}
  