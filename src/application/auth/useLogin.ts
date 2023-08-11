import { useSetRecoilState } from 'recoil';

import { AuthServiceApp } from './ports';

import { useAuthService } from '~/adapters/app-service/auth.service';
import { userProfileState } from '~/adapters/store/atoms/user';

export function useLogin() {
  const authService: AuthServiceApp = useAuthService();
  const setUser = useSetRecoilState(userProfileState);
  return {
    async login() {
      const profile = await authService.login();
      // setUser(profile);
    },
  };
}
