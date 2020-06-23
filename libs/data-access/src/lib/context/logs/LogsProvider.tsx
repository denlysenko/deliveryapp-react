import * as React from 'react';

import { initialLogsState, logsReducer } from './logs.reducer';
import { LogsDispatchContext, LogsStateContext } from './logs.context';

type LogsProviderProps = { children: React.ReactNode };

export const LogsProvider = ({ children }: LogsProviderProps) => {
  const [state, dispatch] = React.useReducer(logsReducer, initialLogsState);

  return (
    <LogsStateContext.Provider value={state}>
      <LogsDispatchContext.Provider value={dispatch}>
        {children}
      </LogsDispatchContext.Provider>
    </LogsStateContext.Provider>
  );
};
