import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import Signup from 'screens/Signup';
import Home from 'screens/Home';
import Login from 'screens/Login';

import CustomRoute from './components/CustomRoute';
import { ROUTES } from './constants';

const routesList = [
  {
    component: Signup,
    path: ROUTES.signUp
  },
  {
    component: Home,
    path: ROUTES.home,
    private: true
  },
  {
    component: Login,
    path: ROUTES.login
  }
];

const renderRoutes = () =>
  routesList.map(route => <CustomRoute key={route.path} isPrivate={route.private} {...route} />);

function CustomRouter() {
  return (
    <Router>
      <Switch>
        {renderRoutes()}
        <Redirect to={ROUTES.login} />
      </Switch>
    </Router>
  );
}

export default CustomRouter;
