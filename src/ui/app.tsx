import React, { Suspense, useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import api, { Events } from 'zmp-sdk';
import { AnimationRoutes, SnackbarProvider, ZMPRouter } from 'zmp-ui';

import { APP_ROUTES } from '../routes';
import { renderRoutes } from '../routes/renderRoutes';

import { useAppNavigate } from './hooks';
// import { GlobalSheet } from './shared';
import HeaderBar from './shared/HeaderBar/HeaderBar';
import MyFizaApp from './shared/MyFizaApp/MyFizaApp';
// import 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.2.0/tailwind.min.css';
import '~/ui/assets/scss/layout.scss';
import Navigator from './shared/Navigator/Navigator';

const queryClient = new QueryClient();

const AppInit = () => {
  const navigate = useAppNavigate();
  useEffect(() => {
    const nonRedirectRoutes = [] as string[];
    const handleNavigate = (data) => {
      const { path } = data;
      if (nonRedirectRoutes.includes(path)) {
        return;
      }
      navigate(path);
    };
    api.events.on(Events.OpenApp, handleNavigate);
  }, []);
  return <></>;
};

function MyApp() {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <MyFizaApp>
            <SnackbarProvider>
              <ZMPRouter>
                <AppInit />
                <HeaderBar />
                <AnimationRoutes>{renderRoutes(APP_ROUTES)}</AnimationRoutes>
                {/* <GlobalSheet /> */}
                <Navigator />
              </ZMPRouter>
            </SnackbarProvider>
          </MyFizaApp>
        </QueryClientProvider>
      </Suspense>
    </RecoilRoot>
  );
}
export default MyApp;
