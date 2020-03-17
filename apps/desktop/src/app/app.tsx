import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Auth } from '@deliveryapp/pages/auth';
import { apiService } from '@deliveryapp/core';
import { AuthProvider } from '@deliveryapp/data-access';
import { AuthGuard, AnonymousGuard } from '@deliveryapp/guards';
import { Main } from '@deliveryapp/pages/main';

import { environment } from '../environments/environment';
import './app.scss';

apiService.setBaseUrl(environment.apiUrl);

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <AnonymousGuard exact path="/auth">
            <Auth />
          </AnonymousGuard>
          <AuthGuard path="/">
            <Main />
          </AuthGuard>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
