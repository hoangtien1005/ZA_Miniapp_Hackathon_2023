import { atom } from 'recoil';

import RECOIL_KEYS from '../key';

import Profile from '~/domain/profile';

export const defaultUserProfile: Profile = {
  uid: '1',
  name: 'Nguyen Van A',
  avatar: 'https://picsum.photos/200',
  accessToken:
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MjQyODUzMDQwMDQyMTMzNzMyIiwiaWF0IjoxNjkxNzcwMjM1LCJleHAiOjE2OTE4NTY2MzV9.emolTQBgQ2dxh7nHFOCXlSu0Kqt-5jW7A6Y6CMl6GH4xdKEI0Bfk_R5nSmDuh8Bb439e6WpqmzRYXNQY-aGLzQ',
};

export const userProfileState = atom<Profile>({
  key: RECOIL_KEYS.userProfileState,
  default: defaultUserProfile,
});

export {};
