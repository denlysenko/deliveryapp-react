import * as React from 'react';

import { OrdersDispatch } from './orders.actions';
import { OrdersState } from './orders.reducer';

export const OrdersStateContext = React.createContext<OrdersState | undefined>(
  undefined
);
export const OrdersDispatchContext = React.createContext<
  OrdersDispatch | undefined
>(undefined);
