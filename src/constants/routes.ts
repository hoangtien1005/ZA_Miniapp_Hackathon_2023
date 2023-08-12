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
  [ROUTES.HOME]: 'Trang chủ',
  [ROUTES.CHAT]: 'Cuộc trò chuyện',
  [ROUTES.BOOKING_LIST]: 'Cuộc hẹn của bạn',

  [ROUTES.PROFILE]: 'Cá nhân',
  // [ROUTES.PROFILE]: 'Cá nhân',
  [ROUTES.PROFILE_DATA_LIST]: 'Cá nhân',
  [ROUTES.BOOKING]: 'Chi tiết OA',
  [ROUTES.INTRODUCTION]: 'Giới thiệu',

};

export const invisibleBottomNavigatorRoutes = [ROUTES.CHAT];

export const mappingDefaultPreviousRoute = {};

export default ROUTES;
