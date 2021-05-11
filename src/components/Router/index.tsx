import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import CustomRoute from './components/CustomRoute';
import { ROUTES, routesList } from './constants';

function CustomRouter() {
  const renderRoutes = () =>
    routesList.map(route => <CustomRoute key={route.path} isPrivate={route.private} {...route} />);

  return (
    <Router>
      <Switch>
        {renderRoutes()}
        <Redirect to={ROUTES.signUp} />
      </Switch>
    </Router>
  );
}

export default CustomRouter;
