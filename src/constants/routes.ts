const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  PROFILE: '/profile',
  PROFILE_DATA_LIST: '/profile-data-list',
  PROFILE_DATA_INFO: '/profile-data-info',
  
};

export const mappingTitleFromRoute: any = {
  [ROUTES.HOME]: 'Food Date',
  [ROUTES.CHAT]: 'Chat',
  [ROUTES.PROFILE]: 'Profile',
  // [ROUTES.PROFILE]: 'Cá nhân',
  [ROUTES.PROFILE_DATA_LIST]: 'Profile',
};

export const mappingDefaultPreviousRoute = {
};

export default ROUTES;
