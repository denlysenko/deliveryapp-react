import React from 'react';

import { apiService } from '@deliveryapp/core';

import { environment } from '../environments/environment';

apiService.setBaseUrl(environment.apiUrl);

export const App = () => {
  return (
    <header>
      <h1>Welcome to desktop!</h1>
    </header>
  );
};

export default App;
