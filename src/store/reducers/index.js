import {combineReducers} from 'redux';

import user from './userReducer';

const reducers = {user};

export default combineReducers(reducers);
