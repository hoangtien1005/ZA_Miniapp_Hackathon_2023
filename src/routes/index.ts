import ROUTES from '~/constants/routes';
import ChatPage from '~/ui/pages/chat';
import HomePage from '~/ui/pages/home';
import ProfilePage from '~/ui/pages/profile';
import ProfileDataInfoPage from '~/ui/pages/profile-data-info';
import ProfileDataListPage from '~/ui/pages/profile-data-list';
import BookingPage from '~/ui/pages/booking';


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
    path: ROUTES.CHAT,
    Element: ChatPage,
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
];
