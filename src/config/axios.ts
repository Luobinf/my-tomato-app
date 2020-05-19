import axios from 'axios';
import history from './history';

const appID = 'dgWhuZttnnaAY54ZWqkb1PmY';
const appSecret = 'CKBKfxbk3rJkgu8P529yYcqm';

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token');
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`;
  }
  return config;
}, function (error) {
  console.error(error);
  console.log('我错了');
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token']);
  }
  return response;
}, function (error) {
  // Do something with response error
  if(error.response.status === 401) {
    //401未授权，重定向
    //组件外如何跳转路由（无刷新）
    history.push('/login');
  }
  // console.log('error',error.response);
  return Promise.reject(error);
});

export default instance;
