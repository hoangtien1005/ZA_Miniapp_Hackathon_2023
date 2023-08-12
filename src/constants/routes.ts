const ROUTES = {
  HOME: '/home',
  CHAT: '/chat',
  BOOKING_LIST: '/booking-list',
  PROFILE: '/profile',
  PROFILE_DATA_LIST: '/profile-data-list',
  PROFILE_DATA_INFO: '/profile-data-info',
  BOOKING: '/booking',
  INTRODUCTION: '/',
};

export const mappingTitleFromRoute: any = {
  [ROUTES.HOME]: 'Food Date',
  [ROUTES.CHAT]: 'Chat',
  [ROUTES.BOOKING_LIST]: 'Cuộc hẹn của bạn',

  [ROUTES.PROFILE]: 'Profile',
  // [ROUTES.PROFILE]: 'Cá nhân',
  [ROUTES.PROFILE_DATA_LIST]: 'Profile',
  [ROUTES.BOOKING]: 'Food Court',
  [ROUTES.INTRODUCTION]: 'Introduction',

};

export const invisibleBottomNavigatorRoutes = [ROUTES.CHAT];

export const mappingDefaultPreviousRoute = {};

export default ROUTES;
