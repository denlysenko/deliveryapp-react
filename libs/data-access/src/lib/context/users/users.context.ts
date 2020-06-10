import * as React from 'react';

import { UsersDispatch } from './users.actions';
import { UsersState } from './users.reducer';

export const UsersStateContext = React.createContext<UsersState | undefined>(
  undefined
);
export const UsersDispatchContext = React.createContext<
  UsersDispatch | undefined
>(undefined);
