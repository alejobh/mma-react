import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import CustomRoute from 'components/Routes';
import { routesList, ROUTES } from 'components/Routes/constants';

import 'scss/application.scss';

const queryClient = new QueryClient();

function App() {
  const renderRoutes = () =>
    routesList.map(route => (
      <CustomRoute key={route.path} component={route.component} path={route.path} isPrivate={route.private} />
    ));

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          {renderRoutes()}
          <Route path="/">
            <Redirect to={ROUTES.LOGIN} />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
