import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import PATHS from 'constants/paths';

import CustomRoute from './components/CustomRoute';
import { routesList } from './constants';

function CustomRouter() {
  const renderRoutes = () =>
    routesList.map(route => <CustomRoute key={route.path} isPrivate={route.private} {...route} />);

  return (
    <Router>
      <Switch>
        {renderRoutes()}
        <Redirect to={PATHS.login} />
      </Switch>
    </Router>
  );
}

export default CustomRouter;
