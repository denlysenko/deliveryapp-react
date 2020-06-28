import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Auth } from '@deliveryapp/pages/auth';
import { apiClient } from '@deliveryapp/core';
import { AuthProvider, MessagesProvider } from '@deliveryapp/data-access';
import { AuthGuard, AnonymousGuard } from '@deliveryapp/guards';
import { Main } from '@deliveryapp/pages/main';

import { environment } from '../environments/environment';
import './app.scss';

apiClient.setBaseUrl(environment.apiUrl);

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <AnonymousGuard exact path="/auth">
            <Auth />
          </AnonymousGuard>
          <AuthGuard path="/">
            <MessagesProvider>
              <Main />
            </MessagesProvider>
          </AuthGuard>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
