import * as React from 'react';

import { OrdersDispatch } from './orders.actions';
import { OrdersDispatchContext, OrdersStateContext } from './orders.context';
import { OrdersState } from './orders.reducer';

function useOrdersState(): OrdersState {
  const context = React.useContext(OrdersStateContext);

  if (context === undefined) {
    throw new Error('useOrdersState must be used within a OrdersProvider');
  }

  return context;
}

function useOrdersDispatch(): OrdersDispatch {
  const context = React.useContext(OrdersDispatchContext);

  if (context === undefined) {
    throw new Error('useOrdersDispatch must be used within a OrdersProvider');
  }

  return context;
}

export function useOrders(): [OrdersState, OrdersDispatch] {
  return [useOrdersState(), useOrdersDispatch()];
}
