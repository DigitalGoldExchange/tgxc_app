import axios from 'axios';
import {Platform} from 'react-native';
// const BuildConfig = require('react-native-build-config');
// console.log(BuildConfig.default.BASE_URL);
//ios

let baseURL = '';

if(Platform.OS == 'ios'){
	baseURL = 'http://localhost:8093';
}else{
	baseURL = 'http://10.0.2.2:8093';
}

// let baseURL = 'http://117.52.98.39:8093';


export default axios.create({
	baseURL: baseURL,
});