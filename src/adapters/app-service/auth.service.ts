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
      if (!appConfig.isProd) zaloToken = '4dnQTMGyNKqIVbbmOJnPI15pMdLZApyDHnTePq0s6ryoTcTY6pLWEYm91G0zJ7en0Gyu2W0kHJ9_BYvAQ1TQ3s42A4jX15CwO1WtVXuMHm482nL40aiKU0TyNHyKOZb0EonB3oy3JJuF8YXuApyi9bmUU4mYMG0EBtnGNZjPCWmKMqT3Vtyo6WayItn_EoyVSNzjBtvCRnTC3X1lHY5BIcaS8szTCrGiMNGzHKLsV2axNmT8C15oDn8gT5qSBJ5u5I5f6sOE45jNBaeOSW4N97CKQMPj6muS7Gy9Maz6TZ48O2HOH0';
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
