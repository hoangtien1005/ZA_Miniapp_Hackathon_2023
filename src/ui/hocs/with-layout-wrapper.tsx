/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/display-name */
/* eslint-disable react/destructuring-assignment */
import React, { ComponentType } from 'react';

import {
  NavDiscoverOnImg,
  NavHomeOnImg,
  NavNewsOnImg,
  NavProfileOnImg,
} from '../assets/images';

import ROUTES from '~/constants/routes';

type layoutWrapperOptions = Partial<{
  useHeader: boolean;
  // useBottomNavigator: boolean;
  // bottomItems: Array<any>;
}>;

export const BOTTOM_NAV_ITEMS = {
  HOME: [
    {
      imageSrc: NavHomeOnImg,
      text: 'Trang chủ',
      url: ROUTES.HOME,
      name: 'HOME',
      // additionalActiveUrls: [ROUTES.LOANS, ROUTES.CARDS, ROUTES.NEW_APP],
    },
    {
      imageSrc: NavDiscoverOnImg,
      text: 'Khám phá',
      url: ROUTES.DISCOVER,
      name: 'DISCOVER',
    },
    {
      imageSrc: NavNewsOnImg,
      text: 'Tin tức',
      url: ROUTES.NEWS,
      name: 'NEWS',
    },
    {
      imageSrc: NavProfileOnImg,
      text: 'Cá nhân',
      url: ROUTES.PROFILE,
      name: 'PROFILE',
    },
  ],
};

function withLayoutWrapper<T>(
  HocComponent: ComponentType<T>,
  options: layoutWrapperOptions = {} as layoutWrapperOptions
) {
  const {
    useHeader = true,
    // useBottomNavigator = true,
    // bottomItems = BOTTOM_NAV_ITEMS.HOME,
  } = options;

  return (hocProps: T) => {
    // const navigate = useAppNavigate();
    // const handleChangeTab = (item) => {
    //   LOG.CLICK_BOTTOM_TAB({
    //     tab_name: item.name,
    //   });
    //   navigate(item.url);
    // };

    return (
      <main>
        <HocComponent {...hocProps} />
        {/* {useBottomNavigator && (
          <Navigator items={bottomItems} handleChangeTab={handleChangeTab} />
        )} */}
      </main>
    );
  };
}

export default withLayoutWrapper;
