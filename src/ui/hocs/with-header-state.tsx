/* eslint-disable react/display-name */
import React, { useEffect } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { headerState } from '~/adapters/store/atoms/header';
import ROUTES, {
  mappingDefaultPreviousRoute,
  mappingTitleFromRoute,
} from '~/constants/routes';
import { compareDynamicPath } from '~/utils/common.util';
import { standardlizePath } from '~/utils/format.util';
import { isFirstAccessPath } from '~/utils/location.util';

const withHeaderState = (WrappedComponent) =>
  function (props) {
    const location = useLocation();
    const params = useParams();
    const setHeader = useSetRecoilState(headerState);
    const isDynamicRoute = Object.keys(params).length > 0;
    const arrayPathInsvisible = [] as string[];

    const arrayPathInsvisibleBack = [] as string[];

    const getPreviousUrl = (path, mappingPrevious = {}) => {
      if (isDynamicRoute) {
        let mappingPath = '';
        Object.keys(mappingPrevious).forEach((key) => {
          if (compareDynamicPath(key, path)) {
            mappingPath = mappingPrevious[key];
          }
        });
        return mappingPath;
      }
      return mappingPrevious[path];
    };
    useEffect(() => {
      const path = standardlizePath(location.pathname);
      const mappingPrevious = isFirstAccessPath(location)
        ? mappingDefaultPreviousRoute
        : {};
      let prevPath = getPreviousUrl(path, mappingPrevious);
      // allow back to home when access from deeplink
      if (
        !arrayPathInsvisibleBack.includes(path) &&
        isFirstAccessPath(location)
      ) {
        prevPath = ROUTES.HOME;
      }
      const header = {} as any;
      if (isDynamicRoute) {
        let mappingTitle = '';
        Object.keys(mappingTitleFromRoute).forEach((key) => {
          if (compareDynamicPath(key, path)) {
            mappingTitle = mappingTitleFromRoute[key];
          }
        });
        header.title = mappingTitle;
      } else if (mappingTitleFromRoute[path]) {
        header.title = mappingTitleFromRoute[path];
      }
      // hardcode
      if (path.indexOf('chat') > 0) {
        header.title = mappingTitleFromRoute[ROUTES.CHAT];
      }

      header.previousUrl = prevPath;
      header.isVisible = !arrayPathInsvisible.includes(path);
      header.isVisibleBack = !arrayPathInsvisibleBack.includes(path);
      setHeader(header);
    }, []);

    return <WrappedComponent {...props} />;
  };

export default withHeaderState;
