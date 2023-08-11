import React, { Suspense } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { RouterProvider } from 'react-router';
import { Route } from 'react-router-dom';

import { OLD_ORIGIN_URL_MINIAPP, ORIGIN_URL_MINIAPP } from '~/constants';
import Loading from '~/ui/shared/Loading';

export interface IRouteBase {
  id?: number;
  name?: string;
  icon?: string | any;
  path: string;
  container?: string;
  element?: any;
  redirect?: string;
  featureId?: number;
  hideLink?: boolean;
  type?: string;
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

export function renderRoute(route: IRoute) {
  // console.log('renderRoute', route, roles, filterRole(route.roles, roles));
  return (
    <Route
      key={route.path}
      // exact={route.path !== "*"}
      path={route.path}
      element={<route.element />}
    />
  );
}

export function renderRoutes(routes) {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export function flattenRoute(routeList: IRoute[], deep: boolean): IRoute[] {
  const result: IRoute[] = [];

  routeList.forEach((route) => {
    result.push({
      ...route,
    });

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep));
    }
  });

  return result;
}

export function getRouteList(routes: any): IRoute[] {
  const routeList = routes;

  if (routeList.length > 0) {
    return flattenRoute(routeList, true);
  }
  return [];
}

export function findRoutesByPaths(
  pathList: string[],
  routeList: IRoute[],
  basename?: string
): IRoute[] {
  return routeList.filter(
    (child: IRoute) => pathList.indexOf((basename || '') + child.path) !== -1
  );
}

export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) =>
      '/'.concat(array.slice(0, index + 1).join('/'))
    );
}

export function isInnerRouting(url) {
  if (url.startsWith(ORIGIN_URL_MINIAPP)) return ORIGIN_URL_MINIAPP;
  if (url.startsWith(OLD_ORIGIN_URL_MINIAPP)) return OLD_ORIGIN_URL_MINIAPP;
  return false;
}

export function isMiniappUrl(url) {
  const PREFIX_URL_MINIAPP = 'https://zalo.me/s/';
  const OLD_PREFIX_URL_MINIAPP = 'https://zalo.me/app/link/zapps/';
  if (url.startsWith(PREFIX_URL_MINIAPP)) return PREFIX_URL_MINIAPP;
  if (url.startsWith(OLD_PREFIX_URL_MINIAPP)) return OLD_PREFIX_URL_MINIAPP;
  return false;
}
