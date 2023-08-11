import { getRecoil } from 'recoil-nexus';

import { userProfileState } from '~/adapters/store/atoms/user';
import { TOKEN_KEY } from '~/constants';

export function readCookieClient(name) {
  let ck: any = document?.cookie;
  if (ck) {
    ck = ck.split('; ');
    if (ck && ck.length > 0) {
      const nameLen = name.length + 1;
      for (let i = ck.length - 1; i >= 0; i -= 1) {
        let item = ck[i];
        if (item && item.indexOf(name) === 0) {
          item = item.substring(nameLen, item.length);
          if (item) {
            item = item.replace(/["']/g, '');
            return item;
          }
        }
      }
    }
  }
  return '';
}

export function setAccessTokenHeader(config) {
  const { accessToken } = getRecoil(userProfileState);
  if (accessToken) {
    const headers = { [TOKEN_KEY]: accessToken };
    config.headers = { ...config.headers, ...headers };
    config.withCredentials = true;
  }
}

export function readCookie(cookie, name) {
  if (cookie) {
    cookie = cookie.split('; ');
    if (cookie && cookie.length > 0) {
      const nameLen = name.length + 1;
      for (let i = cookie.length - 1; i >= 0; i -= 1) {
        let item = cookie[i];
        if (item && item.indexOf(name) === 0) {
          item = item.substring(nameLen, item.length);
          if (item) {
            item = item.replace(/["']/g, '');
            return item;
          }
        }
      }
    }
  }
  return '';
}
