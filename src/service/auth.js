import { Alert } from "react-native";
import axios from "../utils/axios";
import AsyncStorage from '@react-native-community/async-storage';
axios.defaults.headers.common["Content-Type"] = "application/json";


export const signin = async (body) => {

    const response = await axios.post('/user/login', body);
    console.log(response.status);
	if (response.status == 200) {
		return response.data;
	} else {
		throw response.data;
	}
};


// export const apiUserInfo = async () => {

// 	try {	
// 		const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5MSIsImlhdCI6MTYwNDAxODUzMX0.hfQ1wc0ylpY9wj28S9unWeJ0vOzTYQ186JyYCg6etTQ';
// 		const userId = '807115P6FP5F152W'
// 		console.log(accessToken);
// 		console.log(userId);
// 		const response = await axios.get('/api/userInfo', {
			
// 			headers: {
// 				Accept: 'application/json',
// 				token: `${accessToken}`,
// 			},
// 			params: {userId:userId}
// 		});
// 		// console.log(response.data);
// 		if (response.status == 200 && response.data.code == 200) {
// 			return response.data;
// 		} else {
// 			throw response.data;
// 		}
// 	}catch(e){
// 		return e;
// 	}
	
// };



export const insertWithdraw = async (body) => {
    const response = await axios.post('/exchange/insertWithdraw', body);
    // console.log(response.data);
	if (response.status == 200) {
		return response.data;
	} else {
		throw response.data;
	}
};

export const checkOtp = async (body) => {
    const response = await axios.post('/user/checkCode', body);
    // console.log(response.data);
	if (response.status == 200) {
		return response.data;
	} else {
		throw response.data;
	}
};

export const confirmOtp = async (body) => {

	const userId = await AsyncStorage.getItem('userId');

	const bodyFormData = new FormData();
    bodyFormData.append("userCode", body);
    bodyFormData.append("userId", userId);

    const response = await axios.post('/user/confirmOtp', bodyFormData);
    // console.log(response.data);
	if (response.status == 200) {
		return response.data;
	} else {
		throw response.data;
	}
};


export const sendSignKey = async (body) => {
	const response = await axios.post('/user/sendSignKey', body);
	// console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};

export const signup = async (body) => {
	const response = await axios.post('/user/insert', body);
	// console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};

export const insertExchange = async (body) => {
	const response = await axios.post('/exchange/insertExchange', body);
	// console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};

export const updateUser = async (body) => {
	const response = await axios.post('/user/updateUser', body);
	// console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};

export const updatePush = async (body) => {
	const response = await axios.post('/push/updatePushRead', body);
	// console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};


export const updateAlarm = async (body) => {
	const response = await axios.post('/user/updatePushType', body);
	// console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};

export const findPw = async (body) => {
	const response = await axios.post('/user/findUserPassword', body);
	// console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};


export const getOtpCode = async () => {
	try {
		const response = await axios.get('/user/getOtpCode',);
		if (response.status == 200 && response.data.code == 200) {
			return response.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};

export const findEmail = async (phoneNumber) => {
	try {
		const response = await axios.get('/user/findByPhoneNumber',{params: {phoneNumber: phoneNumber}});
		if (response.status == 200 && response.data.code == 200) {
			return response.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};




export const findUser = async (emailId) => {
	console.log(emailId);
	
	try {
		const response = await axios.get('/user/findByEmailId', {params: {emailId: emailId}});
		if (response.status == 200 && response.data.code == 200) {
			return response.data.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};

export const getRefreshToken = async (token) => {
	// console.log(token);
	
	try {
		const response = await axios.get('/user/refreshToken', {params: {token: token}});
		console.log('1111111111111'+response.status);
		if (response.status == 200 && response.data.code == 200) {
			return response.data.data;
		} else if(response.status !== 200 && response.data.code !== 200){
			return response.code;	
		}else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};





export const changeSelectText = async (value) => {
	console.log(value);
	const userId = await AsyncStorage.getItem('userId');
	try {
		const response = await axios.get('/exchange/findByType', {params: {type: value,userId:userId}});
		if (response.status == 200 && response.data.code == 200) {
			return response.data.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};

export const getAlarmList = async () => {
	const userId = await AsyncStorage.getItem('userId');
	
	try {
		const response = await axios.get('/push/userPushList', {params: {userId: userId}});
		if (response.status == 200 && response.data.code == 200) {
			return response.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};


export const me = async () => {
	const userId = await AsyncStorage.getItem('userId');
	// console.log(userId);

	try {
		const response = await axios.get('/user/getOne', {params: {userId: userId}});
		if (response.status == 200 && response.data.code == 200) {
			return response.data.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};

export const depositMe = async () => {
	const userId = await AsyncStorage.getItem('userId');
	// console.log(userId);

	try {
		const response = await axios.get('/user/depositInfo', {params: {userId: userId}});
		if (response.status == 200 && response.data.code == 200) {
			return response.data.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};

export const getTgRate = async () => {

	try {
		const response = await axios.get('/exchangeRate/getList',);
		if (response.status == 200 && response.data.code == 200) {
			return response.data.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};

export const findPassword = async (userId, pw) => {
	console.log(userId);
	console.log(pw);

	try {
		const response = await axios.get('/user/findPassword', {params: {userId:userId,pw:pw}});
		if (response.status == 200 && response.data.code == 200) {
			return response.data.data;
		} else {
			throw response.data;
		}
	} catch (e) {
		return e;
	}
};




export const updateOtpKey = async (body) => {
	const userId = await AsyncStorage.getItem('userId');

	const bodyFormData = new FormData();
	bodyFormData.append("userId", userId);
	bodyFormData.append("otpKey", body);
	const response = await axios.post('/user/updateOtpKey', bodyFormData);
	// console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};