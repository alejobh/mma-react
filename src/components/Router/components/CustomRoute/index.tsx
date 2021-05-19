import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useSelector } from 'contexts/userContext';
import PATHS from 'constants/paths';
import Dashboard from 'components/Dashboard';

interface CustomRouteProps {
  isPrivate?: boolean;
}

function CustomRoute({ path, isPrivate, ...props }: RouteProps & CustomRouteProps) {
  const userAuthenticated = useSelector(context => context.uid);

  if (userAuthenticated) {
    return isPrivate ? <Dashboard /> : <Redirect to={PATHS.home} />;
  }
  return isPrivate ? <Redirect to={PATHS.login} /> : <Route path={path} {...props} />;
}

export default CustomRoute;
