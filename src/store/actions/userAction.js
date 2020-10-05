export const LEAVE_USER = 'LEAVE_USER';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_INFO_ASYNC = 'SET_USER_INFO_ASYNC';
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_ASYNC = 'GET_USER_INFO_ASYNC';

// # 유저정보 입력하기
export const setUserInfo = (payload) => ({
  type: SET_USER_INFO,
  payload,
});

export const getUserInfo = () => ({
  type: GET_USER_INFO,
});
