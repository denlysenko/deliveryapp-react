import * as React from 'react';

import { initialPaymentsState, paymentsReducer } from './payments.reducer';
import {
  PaymentsDispatchContext,
  PaymentsStateContext
} from './payments.context';

type PaymentsProviderProps = { children: React.ReactNode };

export const PaymentsProvider = ({ children }: PaymentsProviderProps) => {
  const [state, dispatch] = React.useReducer(
    paymentsReducer,
    initialPaymentsState
  );

  return (
    <PaymentsStateContext.Provider value={state}>
      <PaymentsDispatchContext.Provider value={dispatch}>
        {children}
      </PaymentsDispatchContext.Provider>
    </PaymentsStateContext.Provider>
  );
};
