import { setRecoil } from 'recoil-nexus';

import { countLoadingState } from '../atoms/loading';

export const startLoading = () => {
  setRecoil(
    countLoadingState,
    (currentCountLoading) => currentCountLoading + 1
  );
};

export const endLoading = () => {
  setRecoil(
    countLoadingState,
    (currentCountLoading) => currentCountLoading - 1
  );
};
