import axios from 'axios';
// const BuildConfig = require('react-native-build-config');
// console.log(BuildConfig.default.BASE_URL);

let baseURL = 'http://localhost:8093';

export default axios.create({
	baseURL: baseURL,
});