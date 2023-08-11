import React from 'react';

import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { headerState } from '~/adapters/store/atoms/header';
import ROUTES from '~/constants/routes';
import { useAppNavigate, useAppNavigateBack } from '~/ui/hooks';
import './HeaderBar.scss';

export const optionBack = {
  replace: true,
  animate: true,
  direction: 'backward' as any,
};
const ROUTES_WITH_HEADER_CENTER = [ROUTES.HOME];

function HeaderBar() {
  const header = useRecoilValue(headerState);
  const location = useLocation();
  const navigate = useAppNavigate();
  const navigateBack = useAppNavigateBack();
  const { title, isVisible, isVisibleBack, previousUrl, backFn } = header;

  const back = () => {
    if (previousUrl) {
      navigate(previousUrl, optionBack);
    } else {
      navigateBack();
    }
  };
  const isTextCenter = ROUTES_WITH_HEADER_CENTER.includes(location.pathname);
  const variantBtnBack =
    location.pathname === ROUTES.HOME ? 'icon_home_w' : 'icon_back_w';
  return (
    <>
      {isVisible ? (
        <div
          className={classNames('breadcrumb', {
            center: isTextCenter,
          })}
        >
          {isVisibleBack && location.pathname !== ROUTES.HOME && (
            <span className="icon sz-14 btn_back" onClick={backFn || back}>
              <i className="icon_arr_left_w" />
            </span>
          )}
          <h1 className="ttl fz-16 fw-500">{title}</h1>
          {/* <span className="icon sz-14 btn_bell">
            {' '}
            <i className="icon_bell_w" />
            <span className="noti" />
          </span> */}
        </div>
      ) : null}
    </>
  );
}

export default HeaderBar;
