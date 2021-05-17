import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import api from 'config/api';
import CustomRouter from 'components/Router';
import withProvider from 'components/ProviderWrapper';
import { LOCAL_STORAGE_KEYS } from 'constants/general';
import { Context, reducer, INITIAL_STATE } from 'contexts/userContext';
import 'scss/application.scss';
import LocalStorageService from 'services/LocalStorageService';

const queryClient = new QueryClient();

api.setHeaders({
  client: LocalStorageService.getValue(LOCAL_STORAGE_KEYS.client),
  'access-token': LocalStorageService.getValue(LOCAL_STORAGE_KEYS.session),
  uid: LocalStorageService.getValue(LOCAL_STORAGE_KEYS.uid)
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomRouter />
    </QueryClientProvider>
  );
}

export default withProvider({ context: Context, reducer, initialState: INITIAL_STATE })(App);
