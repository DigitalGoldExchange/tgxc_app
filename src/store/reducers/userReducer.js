const initialState = {
  // alarmDenyRequest: false,
  // alarmDisbursementForCeleb: false,
  // alarmEvent: false,
  // alarmReceiveRequestForCeleb: false,
  // alarmRecommendContents: false,
  // alarmReminderForCeleb: false,
  // allowNews: false,
  // avgResponseTime: 0,
  // bankAccountNum: '',
  // bankName: '',
  // bestVivid: [],
  // birthday: '',
  // celebVerifiedStatus: '',
  // email: '',
  // gender: 'male',
  // id: 0,
  // intro: '',
  // job: [],
  // nickname: '',
  // phone: '',
  // platformId: '',
  // platformType: '',
  // price: 0,
  // profileImage: '',
  // reviewCount: 0,
  // role: 'user',
  // score: 0,
  // sns: [],
  // theme: [],
  // totalLikedCount: 0,
  // totalMadeCount: 0,
  // totalReceivedCommentCount: 0,
  // totalReceivedRequestCount: 0,
  // totalRevenue: 0,
  // video: '',
  user: {},
};

import {SET_USER_INFO_ASYNC, GET_USER_INFO_ASYNC} from '../actions/userAction';

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_USER_INFO_ASYNC: {
      return {
        ...state,
        user: payload,
      };
    }

    default:
      return state;
  }
};
