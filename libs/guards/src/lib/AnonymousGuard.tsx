import React, { ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { isNil } from 'lodash-es';

import { ACCESS_TOKEN } from '@deliveryapp/common';
import { useAuth } from '@deliveryapp/data-access';

export const AnonymousGuard: React.FC<RouteProps> = ({
  children,
  ...rest
}): ReactElement => {
  const [state] = useAuth();

  const hasToken = !isNil(localStorage.getItem(ACCESS_TOKEN));

  return (
    <Route {...rest}>
      {state.isLoggedIn || hasToken ? <Redirect to="/" /> : children}
    </Route>
  );
};
