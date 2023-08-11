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
        this.generateUrl(path),
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
      if (!appConfig.isProd) zaloToken = 'Fu8x7v1Gt5m_W3WQbL3OMJoDEn-NHyS1Lz5ZHPX4zdrmuNLYXpRYMdcJTbwX1Of7NBbe1h4noaPaWtHzmYITF3wdVH3eEUChGwjqCfCCyWHKhMe3_tpYFYNFMWVSQTa6BFTB0jnggZybza8FYtlvBKJdOI-fLfq-GOeKVgmSbKf-WH5Cj0sKPrs647we1g1SPweGU9K-iqH4g5L1g2l3SNkaTrEe8SfBNgXiNFSqtq4vjMrTqGMD5m-qR2VpEVaX3P9oEDaxqp4LasyW_2U7EWUIEpt81Ba9C7QVvD5pb4ZPLG';
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
