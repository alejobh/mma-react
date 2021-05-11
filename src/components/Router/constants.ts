import Home from 'screens/Home';
import Signup from 'screens/Signup';
import Login from 'screens/Login';

export const ROUTES = {
  home: '/book-list',
  login: '/login',
  signUp: '/signup'
};

export const routesList = [
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
