import ROUTES from '~/constants/routes';
import DiscoverPage from '~/ui/pages/discover';
import HomePage from '~/ui/pages/home';
import NewsPage from '~/ui/pages/news';
import ProfilePage from '~/ui/pages/profile';

export type RouteItem = {
  path: string;
  Element: React.ElementType;
};

export const APP_ROUTES: RouteItem[] = [
  {
    path: ROUTES.INDEX,
    Element: HomePage,
  },
  {
    path: ROUTES.DISCOVER,
    Element: DiscoverPage,
  },
  {
    path: ROUTES.NEWS,
    Element: NewsPage,
  },
  {
    path: ROUTES.PROFILE,
    Element: ProfilePage,
  },
];
