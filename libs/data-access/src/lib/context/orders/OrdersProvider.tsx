import * as React from 'react';

import { OrdersDispatchContext, OrdersStateContext } from './orders.context';
import { initialOrdersState, ordersReducer } from './orders.reducer';

type OrdersProviderProps = { children: React.ReactNode };

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [state, dispatch] = React.useReducer(ordersReducer, initialOrdersState);

  return (
    <OrdersStateContext.Provider value={state}>
      <OrdersDispatchContext.Provider value={dispatch}>
        {children}
      </OrdersDispatchContext.Provider>
    </OrdersStateContext.Provider>
  );
};
