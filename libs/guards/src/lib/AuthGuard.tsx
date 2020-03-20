import React, { ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { Spinner } from '@deliveryapp/ui';

import { useLoadSelf } from './useLoadSelf';

export const AuthGuard: React.FC<RouteProps> = ({
  children,
  ...rest
}): ReactElement => {
  const { waiting, isLoggedIn } = useLoadSelf();

  return (
    <>
      {waiting ? (
        <Spinner />
      ) : (
        <Route {...rest}>
          {isLoggedIn ? children : <Redirect to="/auth" />}
        </Route>
      )}
    </>
  );
};
