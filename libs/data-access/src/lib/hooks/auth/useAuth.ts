import * as React from 'react';

import { AuthDispatch } from '../../context/auth/auth.actions';
import {
  AuthDispatchContext,
  AuthStateContext
} from '../../context/auth/auth.context';
import { AuthState } from '../../context/auth/auth.reducer';

function useAuthState(): AuthState {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

function useAuthDispatch(): AuthDispatch {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
}

export function useAuth(): [AuthState, AuthDispatch] {
  return [useAuthState(), useAuthDispatch()];
}
