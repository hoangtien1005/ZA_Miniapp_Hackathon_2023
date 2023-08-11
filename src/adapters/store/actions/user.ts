import { setRecoil } from 'recoil-nexus';

import { defaultUserProfile, userProfileState } from '../atoms/user';

export const clearUserProfileState = () => {
  setRecoil(userProfileState, defaultUserProfile);
};
