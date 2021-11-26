import {  call, put, takeEvery ,all,fork} from 'redux-saga/effects';
import * as types from './types'
import {login_api,load_user_api,check_authenticated_api} from '../../api/api_authentication'

function * login({payload}){
    const { email, password } = payload 
    try {
        const response  = yield call(login_api,email,password)
        console.log(response);
        if (!response.message){
            yield put({type:types.LOGIN_SUCCESS,payload:response.data});
        }
        else{
            yield put({type:types.LOGIN_FAIL,payload:response.message});
        }
    } catch (error) {
        console.log(error);
        yield put({type:types.LOGIN_FAIL,payload:error});
    }
}
function * LOGIN_REQUEST(){
    yield takeEvery(types.LOGIN_REQUEST,login)
}

//-------------------//

function * load_user(){
    
    try {
         const response  = yield call(load_user_api)

         if (!response.message){
            yield put({type:types.USER_LOADED_SUCCESS,payload:response.data});
         }
         else{
             yield put({type:types.USER_LOADED_FAIL,payload:response.message});
         }
     } catch (error) {
         console.log(error);
         yield put({type:types.LOGIN_FAIL,payload:error});
     }
}

function * LOAD_USER_REQUEST(){
    yield takeEvery(types.USER_LOADED_REQUEST,load_user)
}

//-------------------//

function * check_authenticated(){
    
    try {
        const response  = yield call(check_authenticated_api)
        console.log(response);
        if (response.data.code !== 'token_not_valid'){
           yield put({type:types.CHECK_AUTHENTICATED_SUCCESS});
        }
        else{
            yield put({type:types.CHECK_AUTHENTICATED_FAIL});
        }
    } catch (error) {
        console.log(error);
        yield put({type:types.CHECK_AUTHENTICATED_FAIL});
    }
}

function * CHECK_AUTHENTICATED_WATCH(){
    yield takeEvery(types.CHECK_AUTHENTICATED_WATCH,check_authenticated)
}

//-------------------//

export default function* authSaga() {
    yield all([
      fork(LOGIN_REQUEST),
      fork(LOAD_USER_REQUEST),
      fork(CHECK_AUTHENTICATED_WATCH),
    ]);
}
  