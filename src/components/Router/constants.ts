import Signup from 'screens/Signup';
import Home from 'screens/Home';
import Login from 'screens/Login';
import PATHS from 'constants/paths';

export const routesList = [
  {
    component: Signup,
    path: PATHS.signUp
  },
  {
    component: Home,
    path: PATHS.home,
    private: true
  },
  {
    component: Login,
    path: PATHS.login
  },
  {
    component: Home,
    path: PATHS.bookDetail,
    private: true
  }
];
