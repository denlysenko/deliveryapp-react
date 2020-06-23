import * as React from 'react';

import { LogsDispatch } from './logs.actions';
import { LogsState } from './logs.reducer';

export const LogsStateContext = React.createContext<LogsState | undefined>(
  undefined
);
export const LogsDispatchContext = React.createContext<
  LogsDispatch | undefined
>(undefined);
