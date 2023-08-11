const ROUTES = {
  INDEX: '/',
  HOME: '/',
  DISCOVER: '/discover',
  NEWS: '/news',
  PROFILE: '/profile',
};

export const mappingTitleFromRoute: any = {
  [ROUTES.HOME]: 'Tài chính Fiza',
  [ROUTES.DISCOVER]: 'Khám phá',
  [ROUTES.NEWS]: 'Tin tức',
  [ROUTES.PROFILE]: 'Cá nhân',
};

export const mappingDefaultPreviousRoute = {
  [ROUTES.DISCOVER]: ROUTES.HOME,
};

export default ROUTES;
