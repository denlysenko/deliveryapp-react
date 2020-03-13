import * as React from 'react';

import { AuthDispatchContext, AuthStateContext } from './auth.context';
import { authReducer, initialAuthState } from './auth.reducer';

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = React.useReducer(authReducer, initialAuthState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
