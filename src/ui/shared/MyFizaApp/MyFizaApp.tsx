/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { App } from 'zmp-ui';

import Loading from '../Loading';

import { useAppService } from '~/adapters/app-service/app.service';
import { countLoadingState } from '~/adapters/store/atoms/loading';
import { userProfileState } from '~/adapters/store/atoms/user';
import { handleCacheGlobalData } from '~/application/app/useCacheGlobalData';
import { useLogin } from '~/application/auth/useLogin';
import useEffectOnce from '~/ui/hooks/use-effect-once';
import { generateId } from '~/utils/common.util';
import { handleCloseLoading } from '~/utils/zalo.util';

function MyFizaApp({ children }) {
  const appService = useAppService();

  const user = useRecoilValue(userProfileState);
  const countAppLoading = useRecoilValue(countLoadingState);
  const { login } = useLogin();

  useEffect(() => {
    const queryParams = appService.getQueryParams();
    const sessionId = generateId();
    // setTracking({ ...tracking, ...queryParams, session_id: sessionId });
  }, []);

  useEffect(() => {
    handleCloseLoading();
  }, []);

  useEffectOnce(() => {
    login();
  });

  useEffect(() => {
    if (user.accessToken) {
      handleCacheGlobalData();
    }
  }, [user]);

  return (
    <App>
      {user.accessToken && children}
      {(!user.accessToken || countAppLoading > 0) && <Loading />}
    </App>
  );
}

export default MyFizaApp;
