import { MouseEventHandler } from 'react';

import { atom } from 'recoil';

import RECOIL_KEYS from '../key';

type HeaderState = {
  title: string;
  isVisible: boolean;
  isVisibleBack: boolean;
  previousUrl: string;
  backFn: MouseEventHandler<HTMLAnchorElement> | null;
};
export const headerState = atom<HeaderState>({
  key: RECOIL_KEYS.headerState,
  default: {
    title: '',
    isVisible: true,
    isVisibleBack: true,
    previousUrl: '',
    backFn: null,
  },
});
