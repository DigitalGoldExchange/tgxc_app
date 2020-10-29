import { Alert } from "react-native";
import axios from "../utils/axios";
import AsyncStorage from '@react-native-community/async-storage';
axios.defaults.headers.common["Content-Type"] = "application/json";


export const signin = async (body) => {
    const response = await axios.post('/user/login', body);
    // console.log(response.data);
	if (response.status == 200) {
		return response.data;
	} else {
		throw response.data;
	}
};

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