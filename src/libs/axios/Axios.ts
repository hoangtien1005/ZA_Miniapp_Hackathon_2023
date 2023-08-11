import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import requestConfig from './requestConfig';

import { Api } from '~/adapters/api.helper';
import { API_CODE } from '~/constants/enums';
import { setAccessTokenHeader } from '~/utils/service.util';

axiosRetry(axios, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error: AxiosError) => {
    // if retry condition is not specified, by default idempotent requests are retried
    return error?.response?.status === 503;
  },
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx status code
    // eslint-disable-next-line eqeqeq
    if (response?.data?.code != API_CODE.SUCCESS) {
      return Promise.reject(response?.data);
    }
    return response?.data;
  },
  (error: AxiosError) => {
    // handle some common status code
    if (error.response?.status === 401) {
      // client redirect
    } else if (error.response?.status && error.response?.status >= 500) {
      // error page
    }

    return Promise.reject(error.response?.data);
  }
);

async function getRequestConfig(apiConfig?) {
  let config = { ...requestConfig };
  if (apiConfig) {
    config = { ...requestConfig, ...apiConfig };
  }
  setAccessTokenHeader(config);
  return config;
}

async function get(url: string, params?, config?): Promise<any> {
  const apiConfig = await getRequestConfig(config);
  apiConfig.params = params;
  const request = axios.get(url, apiConfig);
  return request;
}

async function post(url: string, body, config?): Promise<any> {
  const apiConfig = await getRequestConfig(config);
  let postData = {};
  if (
    config &&
    config.headers &&
    config.headers['Content-Type'] &&
    config.headers['Content-Type'] !== 'application/json'
  ) {
    postData = body;
    axios.defaults.headers.post['Content-Type'] =
      config.headers['Content-Type'];
  } else {
    postData = JSON.stringify(body);
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }
  const request = axios.post(url, postData, apiConfig);
  return request;
}

async function put(url: string, body, config?): Promise<any> {
  const apiConfig = await getRequestConfig(config);
  apiConfig.headers['Content-Type'] = 'application/json';
  const request = axios.put(url, JSON.stringify(body), apiConfig);
  return request;
}

async function patch(url: string, body, config?): Promise<any> {
  const apiConfig = await getRequestConfig(config);
  apiConfig.headers['Content-Type'] = 'application/json';
  const request = axios.patch(url, JSON.stringify(body), apiConfig);
  return request;
}

async function deleteResource(url: string, config?): Promise<any> {
  const apiConfig = await getRequestConfig(config);
  const request = axios.delete(url, apiConfig);
  return request;
}

const axiosClient: Api = {
  get,
  post,
  put,
  patch,
  deleteResource,
};

export default axiosClient;
