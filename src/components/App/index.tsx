import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'scss/application.scss';
import CustomRouter from 'components/Router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomRouter />
    </QueryClientProvider>
  );
}

export default App;
