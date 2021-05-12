import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import LocalStorageService from 'services/LocalStorageService';

import { ROUTES } from '../../constants';

interface CustomRouteProps {
  isPrivate?: boolean;
}

function CustomRoute({ path, isPrivate, ...props }: RouteProps & CustomRouteProps) {
  const userAuthenticated = LocalStorageService.getValue('session');

  if (userAuthenticated) {
    return isPrivate ? <Route path={path} {...props} /> : <Redirect to={ROUTES.home} />;
  }
  return isPrivate ? <Redirect to={ROUTES.login} /> : <Route path={path} {...props} />;
}

export default CustomRoute;
