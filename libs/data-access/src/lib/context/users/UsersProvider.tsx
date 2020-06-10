import * as React from 'react';

import { initialUsersState, usersReducer } from './users.reducer';
import { UsersDispatchContext, UsersStateContext } from './users.context';

type UsersProviderProps = { children: React.ReactNode };

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [state, dispatch] = React.useReducer(usersReducer, initialUsersState);

  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
};
