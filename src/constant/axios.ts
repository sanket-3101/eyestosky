import axios from 'axios';
import { apiConstants } from './constant';



axios.defaults.headers.common = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
axios.defaults.baseURL = apiConstants.baseUrl

axios.interceptors.request.use(async function (config) {

    const auth_token = await localStorage.getItem('auth_token')
    if (auth_token) {

        if (auth_token) {
            config.headers['Authorization'] = 'Bearer ' + auth_token;
        }

    }
    return config;

}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code range of 2xx
    return response.data;
}, function (error) {

    return Promise.reject(error);
});


export default axios;