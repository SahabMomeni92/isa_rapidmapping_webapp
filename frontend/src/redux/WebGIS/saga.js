import {  call, put, takeEvery ,all,fork} from 'redux-saga/effects';
import { getWMS_BoundingBox } from '../../api/api_webGIS';
import * as types from './types'



function * GET_WMSBoundingBOX({payload}){
    console.log(payload)
    // const { workspaceName, layerName } = payload 
    // console.log(workspaceName)
    try {
        console.log('error nadade')
        const response  = yield call(getWMS_BoundingBox,payload[0],payload[1])
        console.log(response)
        if (!response.message){
            console.log('error nadade')
            console.log(response)
            yield put({type:types.GET_WMSCapabilities_SUCCESS,payload:response});
        }
        else{
            console.log('error dade haji halit nist')
            yield put({type:types.GET_WMSCapabilities_FAIL});
        }
    } catch (error) {
        console.log(error);
        console.log('inja error dade haji halit nist')
        yield put({type:types.GET_WMSCapabilities_FAIL});
    }
}
function * GET_WMSCapabilities_REQUEST(){
    yield takeEvery(types.GET_WMSCapabilities_WATCH,GET_WMSBoundingBOX)
}

//-------------------//

export default function* WebGISSage() {
    yield all([
      fork(GET_WMSCapabilities_REQUEST),
    ]);
}
  