import {  call, put, takeEvery ,all,fork} from 'redux-saga/effects';
import { getDisasterList } from '../../api/api_disaster';
import { getMapDetails } from '../../api/api_mapInformations';
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

function * GetImportedMapDetails({payload}){
    console.log(payload)
    try {
        const response  = yield call(getMapDetails,payload)
        console.log('api problems')
        console.log(response.data)
        if (!response.message){
            yield put({type:types.GET_IMPORTEDMAPDETAIS_SUCCESS,payload:response.data});
        }
        else{
            yield put({type:types.GET_IMPORTEDMAPDETAIS_FAIL});
        }
    } catch (error) {
        console.log(error);
        yield put({type:types.GET_IMPORTEDMAPDETAIS_FAIL});
    }
}
function * GET_IMPORTEDMAP_REQUEST(){
    yield takeEvery(types.GET_IMPORTEDMAPDETAIS_WATCH,GetImportedMapDetails)
}

//-------------------//

export default function* ImportMapSage() {
    yield all([
      fork(GET_DISASTERLIST_REQUEST),
      fork(GET_IMPORTEDMAP_REQUEST),
    ]);
}
  