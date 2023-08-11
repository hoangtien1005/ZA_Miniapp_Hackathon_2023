import { atom } from 'recoil';

import RECOIL_KEYS from '../key';

import Profile from '~/domain/profile';

export const defaultUserProfile: Profile = {
  uid: '',
  name: '',
  avatar: '',
  accessToken: '',
};

export const userProfileState = atom<Profile>({
  key: RECOIL_KEYS.userProfileState,
  default: defaultUserProfile,
});

export {};
