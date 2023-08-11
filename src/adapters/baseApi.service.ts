import { Api } from './api.helper';

import { DOMAIN_API_URL } from '~/configs/app';
import fetchClient from '~/libs/fetch';

export class BaseApiService {
  api;

  constructor(api: Api = fetchClient) {
    this.api = api;
  }

  get(url, params = {}, config = {}) {
    return this.api.get(url, params, config);
  }

  post(url, params?, body?, config = {}) {
    return this.api.post(url, params, body, config);
  }

  put(url, params?, body?, config = {}) {
    return this.api.put(url, params, body, config);
  }

  patch(url, params?, body?, config = {}) {
    return this.api.patch(url, params, body, config);
  }

  deleteResource(url, params?, config = {}) {
    return this.api.deleteResource(url, params, config);
  }

  // eslint-disable-next-line class-methods-use-this
  generateUrl(path) {
    let rootApiUrl;
    if (typeof window !== 'undefined') {
      // call from client
      rootApiUrl = DOMAIN_API_URL;
    } else rootApiUrl = process.env.API_INTERNAL_URL;
    return path ? `${rootApiUrl}/${path}` : rootApiUrl;
  }
}

const instance = new BaseApiService();

export default instance;
