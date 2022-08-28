import axios, { AxiosRequestConfig } from 'axios';
// import { removeStorage } from '@utils/use-local-storage';
import { getCookie } from '@utils/use-cookie';

// create an axios instance
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // api
  timeout: 60 * 1000 // seconds request timeout
});

// request interceptor
request.interceptors.request.use((config: AxiosRequestConfig | any) => {
  if (getCookie(`myolsera-customer`)) {
    const tokenCustomer = JSON.parse(getCookie(`myolsera-customer`));
    config.headers['Authorization'] = `Bearer ${tokenCustomer?.access_token}`;
  } else {
    if (getCookie(`myolsera-client`)) {
      const tokenClient = JSON.parse(getCookie(`myolsera-client`));
      config.headers['Authorization'] = 'Bearer ' + tokenClient?.access_token;
    }
  }
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
    // console.log(error)
    const fallbackMessage = 'Request failed, please try again';
    let errorCode = 0;
    let statusCode = 500;
    let message = fallbackMessage;
    let string = fallbackMessage;
    if (error.response) {
      const errorError = error.response.data.error.error;
      let errArr = errorError;
      string = errArr;

      if (typeof errorError !== 'string') {
        string = '';
        errArr = Object.values(errorError);
        for (let index = 0; index < errArr.length; index++) {
          string += '- ' + errArr[index];
        }
      }

      if (error.response) {
        statusCode = error.response.data.error.status_code;
        message = error.response.data.error.message;
        errorCode = error.response.data.error.error_code;
      } else {
        string = message;
      }
    }

    return Promise.reject({
      statusCode,
      message,
      string,
      errorCode
    });
  }
);

export default request;
