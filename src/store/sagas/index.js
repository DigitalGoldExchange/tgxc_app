import {all, fork} from 'redux-saga/effects';

import user from './userSaga';
const sagas = [fork(user)];

export default function* (services = {}) {
  yield all(sagas);
}
