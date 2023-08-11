/* eslint-disable no-restricted-syntax */
/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-use-before-define */

import { Api, ResponseData } from '~/adapters/api.helper';

import { API_CODE } from '~/constants/enums';

import { buildURLWithParam, extend } from '~/utils/common.util';
import { setAccessTokenHeader } from '~/utils/service.util';

export function myFetch(
  url: string,
  params?: any,
  options?: any,
  timeOut?: 10
): Promise<any> {
  const urlFetch = buildURLWithParam(url, params);
  // const cachedData = readFromCache(urlFetch);
  // if (
  //     // !cachedData ||
  //     options?.method === "POST" ||
  //     params?.__forceReload === true ||
  //     urlFetch.indexOf("track") !== -1
  // ) {
  const exOptions = extend(
    {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    options
  );

  setAccessTokenHeader(exOptions);

  return fetch(urlFetch, exOptions)
    .then(toJson)
    .then((result) => {
      // writeToCache(urlFetch, result);
      return result;
    })
    .catch(async (err) => {
      const parseError = await err.json?.();
      throw parseError;
    });
  // }
  // return cachedData;
}

export const getWithLocalPath = (
  path,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return getWithUrl(
    `http://localhost:3000/api${path}`,
    params,
    options,
    timeOut
  );
};

export const getWithUrl = (
  url: string,
  params?: {},
  options?: {},
  timeOut?: 10
) => {
  return myFetch(url, params, options, timeOut);
};

export const post = (
  url,
  params = {},
  data: any = {},
  options: any = {},
  timeOut
) => {
  return myFetch(
    url,
    params,
    extend(
      {
        body: JSON.stringify(data),
      },
      options
    ),
    timeOut
  );
};

export const postWithUrlBinary = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return myFetch(
    url,
    params,
    extend({ body: formData, method: 'POST' }, options),
    timeOut
  );
};

export const postWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: 'POST' }, options), timeOut);
};

export const putWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: 'PUT' }, options), timeOut);
};

export const patchWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(url, params, data, extend({ method: 'PATCH' }, options), timeOut);
};

export const deleteWithUrl = (
  url,
  params?: {},
  data?: {},
  options?: {},
  timeOut?: 10
) => {
  return post(
    url,
    params,
    data,
    extend({ method: 'DELETE' }, options),
    timeOut
  );
};

function toJson(resp) {
  if (resp.ok) {
    return resp.json();
  }
  return Promise.reject(resp);
}

function toBlob(resp) {
  if (resp.ok) {
    return resp.blob();
  }

  return Promise.reject(resp);
}

function validResp<T>(resp: ResponseData<T>): Promise<ResponseData<T>> {
  if (resp?.code === API_CODE.SUCCESS) {
    return Promise.resolve(resp);
  }
  return Promise.reject(resp);
}

export function formatResponse<T>(response): T {
  const { code, data, success } = response;
  if (code === API_CODE.SUCCESS) {
    return data;
  }
  throw new Error(JSON.stringify(response));
}

const fetchVibClient: Api = {
  get: getWithUrl,
  post: postWithUrl,
  put: putWithUrl,
  patch: patchWithUrl,
  deleteResource: deleteWithUrl,
};

export default fetchVibClient;
