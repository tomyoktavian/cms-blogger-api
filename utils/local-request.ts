import axios, { AxiosRequestConfig } from 'axios';

// create an axios instance
const localRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN, // api
  timeout: 60 * 1000 // seconds request timeout
});

// request interceptor
axios.defaults.params = {};
localRequest.interceptors.request.use((config: AxiosRequestConfig | any) => {
  config.params['key'] = process.env.BLOGGER_API_KEY;
  return config;
},
error => {
  // console.log(error) // for debug
  Promise.reject(error);
}
);

// response interceptor
localRequest.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    return Promise.reject(error.response?.data);
  }
);

export default localRequest;
