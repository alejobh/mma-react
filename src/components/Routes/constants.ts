/* eslint-disable @typescript-eslint/naming-convention */
import Home from 'screens/Home';
import Login from 'screens/Login';
import Signup from 'screens/Signup';

export const ROUTES = {
  HOME: '/book-list',
  LOGIN: '/login',
  SIGNUP: '/signup'
};

export const routesList = [
  {
    component: Signup,
    path: ROUTES.SIGNUP
  },
  {
    component: Home,
    path: ROUTES.HOME,
    private: true
  },
  {
    component: Login,
    path: ROUTES.LOGIN
  }
];
