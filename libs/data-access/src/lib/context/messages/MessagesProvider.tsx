import * as React from 'react';

import {
  MessagesDispatchContext,
  MessagesStateContext
} from './messages.context';
import { messagesReducer, initialMessagesState } from './messages.reducer';

type MessagesProviderProps = { children: React.ReactNode };

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const [state, dispatch] = React.useReducer(
    messagesReducer,
    initialMessagesState
  );

  return (
    <MessagesStateContext.Provider value={state}>
      <MessagesDispatchContext.Provider value={dispatch}>
        {children}
      </MessagesDispatchContext.Provider>
    </MessagesStateContext.Provider>
  );
};
