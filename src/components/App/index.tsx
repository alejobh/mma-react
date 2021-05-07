import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'scss/application.scss';
import Signup from 'screens/Signup';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Signup />;
    </QueryClientProvider>
  );
}

export default App;
