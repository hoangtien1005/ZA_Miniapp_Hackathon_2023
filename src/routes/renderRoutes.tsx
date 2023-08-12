import React from 'react';

import { Route } from 'react-router-dom';

import { RouteItem } from '.';

export const renderRoutes = (routes: RouteItem[]) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={<route.Element />} />
  ));
};
