import * as React from 'react';

import { UsersDispatch } from './users.actions';
import { UsersDispatchContext, UsersStateContext } from './users.context';
import { UsersState } from './users.reducer';

function useUsersState(): UsersState {
  const context = React.useContext(UsersStateContext);

  if (context === undefined) {
    throw new Error('useUsersState must be used within a UsersProvider');
  }

  return context;
}

function useUsersDispatch(): UsersDispatch {
  const context = React.useContext(UsersDispatchContext);

  if (context === undefined) {
    throw new Error('useUsersDispatch must be used within a UsersProvider');
  }

  return context;
}

export function useUsers(): [UsersState, UsersDispatch] {
  return [useUsersState(), useUsersDispatch()];
}
