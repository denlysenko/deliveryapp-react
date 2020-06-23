import * as React from 'react';

import { LogsDispatch } from './logs.actions';
import { LogsDispatchContext, LogsStateContext } from './logs.context';
import { LogsState } from './logs.reducer';

function useLogsState(): LogsState {
  const context = React.useContext(LogsStateContext);

  if (context === undefined) {
    throw new Error('useLogsState must be used within a LogsProvider');
  }

  return context;
}

function useLogsDispatch(): LogsDispatch {
  const context = React.useContext(LogsDispatchContext);

  if (context === undefined) {
    throw new Error('useLogsDispatch must be used within a LogsProvider');
  }

  return context;
}

export function useLogs(): [LogsState, LogsDispatch] {
  return [useLogsState(), useLogsDispatch()];
}
