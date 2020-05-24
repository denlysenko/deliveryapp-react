import * as React from 'react';

import { PaymentsDispatch } from './payments.actions';
import { PaymentsState } from './payments.reducer';

export const PaymentsStateContext = React.createContext<
  PaymentsState | undefined
>(undefined);
export const PaymentsDispatchContext = React.createContext<
  PaymentsDispatch | undefined
>(undefined);
