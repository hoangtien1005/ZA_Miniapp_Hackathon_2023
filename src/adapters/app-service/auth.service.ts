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
      if (!appConfig.isProd) zaloToken = 'VVbY6x7AIGrx_s0OkyvD27NvPHk-rG1j89Db69keA0iZxLj9cvmy55FeP6J1YneiUjjhFiYA4sq7-temeQ4mNNNxIXp_gZ1IQCTZ7FwI7r4m-sv2XOe9DoswTsMaYoCYAlnhOA2L02qt_2XT-8bL0rZkEbFcW7qsNjOLQkswM7z6po8-nvHPSK_NSopLdnj-PkTUQ-o8Cnec_7mJkyyNTZYvQGgZr3LxRB571jJs6KnKa78wrQSaJ5t_35pKhKaJ5VWWVx-KUmG0vGX2ivLUFXdq14Elkbmr6C4ALctv0XyaiDLE30';
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
