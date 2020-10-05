import {put, takeEvery} from 'redux-saga/effects';

import {SET_USER_INFO, SET_USER_INFO_ASYNC} from '../actions/userAction';

export function* setUserInfo({payload}) {
  try {
    console.log('setUserInfo : ', payload);
    yield put({
      type: SET_USER_INFO_ASYNC,
      payload: payload,
    });
  } catch (e) {
    console.error('ERROR : ', e);
  }
}

export default function* () {
  yield takeEvery(SET_USER_INFO, setUserInfo);
}
