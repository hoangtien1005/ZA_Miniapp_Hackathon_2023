import { atom } from 'recoil';

import RECOIL_KEYS from '~/adapters/store/key';

export const countLoadingState = atom<number>({
  key: RECOIL_KEYS.countLoading,
  default: 0,
});
