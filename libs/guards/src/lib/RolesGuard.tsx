import React, { ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { isNil } from 'lodash-es';

import { User } from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';

import { useLoadSelf } from './useLoadSelf';

interface Props extends RouteProps {
  roles: number[];
}

export const RolesGuard: React.FC<Props> = ({
  children,
  roles,
  ...rest
}): ReactElement => {
  const { waiting, isLoggedIn, user } = useLoadSelf();

  const hasRights = (user: User | null) =>
    !isNil(user) && roles.includes(user.role);

  return (
    <>
      {waiting ? (
        <FullPageSpinner />
      ) : (
        <Route {...rest}>
          {isLoggedIn && hasRights(user) ? children : <Redirect to="/" />}
        </Route>
      )}
    </>
  );
};
