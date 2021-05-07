import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import 'scss/application.scss';
import Signup from 'screens/Signup';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/login">
            <h1>Login Page</h1>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Redirect to="/signup" />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
