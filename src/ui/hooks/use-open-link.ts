import { openMiniApp } from 'zmp-sdk/apis';

import { useAppNavigate } from './use-app-navigate';

import { isInnerRouting, isMiniappUrl } from '~/utils/route';
import { handleOpenWebview } from '~/utils/zalo.util';

function useOpenLink() {
  const navigate = useAppNavigate();
  return (url) => {
    const innerMatchCurrentMiniappURL = isInnerRouting(url);
    const matchMiniappURL = isMiniappUrl(url);

    if (innerMatchCurrentMiniappURL) {
      navigate(url.replace(innerMatchCurrentMiniappURL, ''));
    } else if (matchMiniappURL) {
      const [miniappId, restUrl] =
        url.replace(matchMiniappURL, '')?.split('/') || [];
      if (miniappId) {
        let moreInfoPathAndParams = {};
        if (restUrl) {
          const [path, params] = restUrl.split('?');
          moreInfoPathAndParams = {
            path: `/${path}`,
            params: Object.fromEntries(new URLSearchParams(params)),
          };
        }
        openMiniApp({
          appId: miniappId,
          ...moreInfoPathAndParams,
          fail: (error) => {
            console.log('Error open miniapp', error);
          },
        });
        console.log({
          appId: miniappId,
          ...moreInfoPathAndParams,
          fail: (error) => {
            console.log('Error open miniapp', error);
          },
        });
      }
    } else handleOpenWebview(url);
  };
}

export default useOpenLink;
