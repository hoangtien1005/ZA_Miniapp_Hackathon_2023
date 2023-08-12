import ROUTES from '~/constants/routes';
import ChatPage from '~/ui/pages/chat';
import BookingListPage from '~/ui/pages/booking-list';
import HomePage from '~/ui/pages/home';
import ProfilePage from '~/ui/pages/profile';
import ProfileDataInfoPage from '~/ui/pages/profile-data-info';
import ProfileDataListPage from '~/ui/pages/profile-data-list';
import BookingPage from '~/ui/pages/booking';

import IntroductionPage from '~/ui/pages/introduction';

export type RouteItem = {
  path: string;
  Element: React.ElementType;
};

export const APP_ROUTES: RouteItem[] = [
  {
    path: ROUTES.HOME,
    Element: HomePage,
  },
  {
    path: `${ROUTES.CHAT}/:conversationId`,
    Element: ChatPage,
  },
  {
    path: ROUTES.BOOKING_LIST,
    Element: BookingListPage,
  },
  {
    path: ROUTES.PROFILE,
    Element: ProfilePage,
  },
  {
    path: ROUTES.PROFILE_DATA_LIST,
    Element: ProfileDataListPage,
  },
  {
    path: `${ROUTES.PROFILE_DATA_INFO}/:leadId/:leadType`,
    Element: ProfileDataInfoPage,
  },
  {
    path: `${ROUTES.BOOKING}`,
    Element: BookingPage,
  },
  {
    path: `${ROUTES.INTRODUCTION}`,
    Element: IntroductionPage,
  },
];
