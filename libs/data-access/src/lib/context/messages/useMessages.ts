import * as React from 'react';

import { MessagesDispatch } from './messages.actions';
import {
  MessagesDispatchContext,
  MessagesStateContext
} from './messages.context';
import { MessagesState } from './messages.reducer';

function useMessagesState(): MessagesState {
  const context = React.useContext(MessagesStateContext);

  if (context === undefined) {
    throw new Error('useMessagesState must be used within a MessagesProvider');
  }

  return context;
}

function useMessagesDispatch(): MessagesDispatch {
  const context = React.useContext(MessagesDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useMessagesDispatch must be used within a MessagesProvider'
    );
  }

  return context;
}

export function useMessages(): [MessagesState, MessagesDispatch] {
  return [useMessagesState(), useMessagesDispatch()];
}
