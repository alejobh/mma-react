import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import PATHS from 'constants/paths';
import { routesList } from 'components/Router/constants';
import Navbar from 'components/Navbar';

const renderRoutes = () =>
  routesList
    .filter(route => route.private)
    .map(route => <Route key={route.path} path={route.path} component={route.component} />);

function Dashboard() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {renderRoutes()}
        <Redirect to={PATHS.home} />
      </Switch>
    </Router>
  );
}

export default Dashboard;
