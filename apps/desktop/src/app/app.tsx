import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { apiService } from '@deliveryapp/core';
import { Auth } from '@deliveryapp/pages/auth';

import { environment } from '../environments/environment';
import './app.scss';

apiService.setBaseUrl(environment.apiUrl);

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
