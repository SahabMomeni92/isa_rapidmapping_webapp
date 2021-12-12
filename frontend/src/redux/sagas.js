import { all , put } from 'redux-saga/effects';
import authSaga from './Authentication/saga'
import DrawMapSaga from './DrawMap/saga';
import ImportMapSage from './ImportMap/saga'
import WebGISSage from './WebGIS/saga';

export default function* rootSaga() {
    yield all([
      authSaga(),
      ImportMapSage(),
      WebGISSage(),
      DrawMapSaga(),
    ]);
}
  