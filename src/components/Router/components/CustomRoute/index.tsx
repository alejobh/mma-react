import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import Dashboard from 'components/Dashboard';
import { LOCAL_STORAGE_KEYS } from 'constants/general';
import PATHS from 'constants/paths';
import LocalStorageService from 'services/LocalStorageService';

interface CustomRouteProps {
  isPrivate?: boolean;
}

function CustomRoute({ path, isPrivate, ...props }: RouteProps & CustomRouteProps) {
  const userAuthenticated = LocalStorageService.getValue(LOCAL_STORAGE_KEYS.session);

  if (userAuthenticated) {
    return isPrivate ? <Dashboard /> : <Redirect to={PATHS.home} />;
  }
  return isPrivate ? <Redirect to={PATHS.login} /> : <Route path={path} {...props} />;
}

export default CustomRoute;
