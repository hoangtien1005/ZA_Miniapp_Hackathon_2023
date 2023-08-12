/* eslint-disable no-async-promise-executor */
import zmpApi from 'zmp-sdk';

import { ProfileDTO, profileFromDTO } from '../../dto/profile';
import { BaseApiService } from '../baseApi.service';

import appConfig from '~/configs/app';

class AuthService extends BaseApiService {
  async _getAccessToken() {
    return new Promise((resolve) => {
      zmpApi.login({
        success: () => {
          zmpApi.getAccessToken({
            success: (token) => {
              resolve(token);
            },
            fail: (error) => {
              console.error(error);
            },
          });
        },
        fail: (error) => {
          console.error(error);
        },
      });
    });
  }

  loginFiza(token: string): Promise<ProfileDTO> {
    const path = 'login';
    return super
      .post(
        this.generateUrl(path, "https://zah-4.123c.vn/api"),
        {},
        {
          accessToken: token,
        },
        {
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error login: ', err);
        }
        return null;
      });
  }

  login(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      let zaloToken = (await this._getAccessToken()) as string;
      if (!appConfig.isProd) zaloToken = 'rX86Cc55grpG50GnQq6lMTuI0J9kMiiKd7ygVKzgXHAAGMyAJKl0BhPfQ010FO1ngpToGnm0gKp84czA8I75My8ZCaGlSET_n29A5ZO5e1xZC5ClMJc56hDkH0j6UEGEbr4AA7v3eZQtQtKEOrkOEzXARIqqRi4rqayzM15dd3NSDtSl3oUgChbrVG1FLiaTXMOn8cPkmXcXNJSQUNMMDPrxF0DPUEika7n7At0jf2YvBcWjQp-o1PaZV3PF4jKBXKG45LXqrW2hKneMVGRQ1QSmUZXo2TjLXbuLUN91WcQPN61Qh5q';
      if (zaloToken) {
        const profileUser = await this.loginFiza(zaloToken);
        if (profileUser) {
          // resolve(userFromDTO(profileUser));

          resolve(profileFromDTO(profileUser));
        }
      }
      reject(new Error('CAN NOT GET ACCESS TOKEN'));
    });
  }

  getProfile(): Promise<ProfileDTO> {
    const path = 'auth/profile';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get profile: ', err);
        }
        return {};
      });
  }

  logout(): void {
    const path = 'auth/logout';
    return super
      .get(this.generateUrl(path))
      .then()
      .catch((err) => {
        if (err) {
          console.log('Error log out: ', err);
        }
      });
  }

  async checkPhone(body: { phone: string }) {
    const path = `auth/check-phone`;
    return super
      .post(this.generateUrl(path), {}, body)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error check phone: ', err);
        }
        return {};
      });
  }
}
export const useAuthService = () => new AuthService();
