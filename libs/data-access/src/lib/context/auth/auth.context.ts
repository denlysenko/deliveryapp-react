import * as React from 'react';

import { AuthDispatch } from './auth.actions';
import { AuthState } from './auth.reducer';

export const AuthStateContext = React.createContext<AuthState | undefined>(
  undefined
);
export const AuthDispatchContext = React.createContext<
  AuthDispatch | undefined
>(null);
