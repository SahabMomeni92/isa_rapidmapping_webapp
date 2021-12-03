import {  call, put, takeEvery ,all,fork} from 'redux-saga/effects';
import { getDisasterList } from '../../api/api_disaster';
import { getMapDetails } from '../../api/api_mapInformations';
import * as types from './types'




//-------------------//

export default function* DrawMapSaga() {
    yield all([
    ]);
}
  