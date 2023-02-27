import axios from 'axios';
import { BASE_URL } from '../utils/baseUrl';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,
});

export const sendRequest = (config) => {
    return axiosInstance.request(config)
}

export const getRequest = (params) => {
    return sendRequest({
        method: 'get',
        url: params
    })
}