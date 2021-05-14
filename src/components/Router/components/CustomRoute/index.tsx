import React, { Fragment } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import Navbar from 'components/Navbar';
import { LOCAL_STORAGE_KEYS } from 'constants/general';
import PATHS from 'constants/paths';
import LocalStorageService from 'services/LocalStorageService';

interface CustomRouteProps {
  isPrivate?: boolean;
}

function CustomRoute({ path, isPrivate, ...props }: RouteProps & CustomRouteProps) {
  const userAuthenticated = LocalStorageService.getValue(LOCAL_STORAGE_KEYS.session);

  if (userAuthenticated) {
    return isPrivate ? (
      <Fragment>
        <Navbar />
        <Route path={path} {...props} />
      </Fragment>
    ) : (
      <Redirect to={PATHS.home} />
    );
  }
  return isPrivate ? <Redirect to={PATHS.login} /> : <Route path={path} {...props} />;
}

export default CustomRoute;
