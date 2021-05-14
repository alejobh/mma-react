import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { SESSION } from 'constants/general';
import PATHS from 'constants/paths';
import LocalStorageService from 'services/LocalStorageService';

interface CustomRouteProps {
  isPrivate?: boolean;
}

function CustomRoute({ path, isPrivate, ...props }: RouteProps & CustomRouteProps) {
  const userAuthenticated = LocalStorageService.getValue(SESSION);

  if (userAuthenticated) {
    return isPrivate ? <Route path={path} {...props} /> : <Redirect to={PATHS.home} />;
  }
  return isPrivate ? <Redirect to={PATHS.login} /> : <Route path={path} {...props} />;
}

export default CustomRoute;
