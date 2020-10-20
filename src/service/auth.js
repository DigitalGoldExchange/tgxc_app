import { Alert } from "react-native";
import axios from "../utils/axios";
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


export const signup = async (body) => {
	const response = await axios.post('/user/insert', body);
	console.log(response.data);
	if(response.status == 200){
		return response.data;
	}else{
		return response.data;
	}

};