import * as React from 'react';

import { MessagesDispatch } from './messages.actions';
import { MessagesState } from './messages.reducer';

export const MessagesStateContext = React.createContext<
  MessagesState | undefined
>(undefined);
export const MessagesDispatchContext = React.createContext<
  MessagesDispatch | undefined
>(undefined);
