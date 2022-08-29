import axios, { AxiosRequestConfig } from 'axios';

// create an axios instance
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // api
  timeout: 60 * 1000 // seconds request timeout
});

// request interceptor
axios.defaults.params = {};
request.interceptors.request.use((config: AxiosRequestConfig | any) => {
  config.params['key'] = process.env.BLOGGER_API_KEY;
  return config;
},
error => {
  // console.log(error) // for debug
  Promise.reject(error);
}
);

// response interceptor
request.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    console.log(error);
    return Promise.reject(error.response);
  }
);

export default request;
