import * as React from 'react';

import { PaymentsDispatch } from './payments.actions';
import {
  PaymentsDispatchContext,
  PaymentsStateContext
} from './payments.context';
import { PaymentsState } from './payments.reducer';

function usePaymentsState(): PaymentsState {
  const context = React.useContext(PaymentsStateContext);

  if (context === undefined) {
    throw new Error('usePaymentsState must be used within a PaymentsProvider');
  }

  return context;
}

function usePaymentsDispatch(): PaymentsDispatch {
  const context = React.useContext(PaymentsDispatchContext);

  if (context === undefined) {
    throw new Error(
      'usePaymentsDispatch must be used within a PaymentsProvider'
    );
  }

  return context;
}

export function usePayments(): [PaymentsState, PaymentsDispatch] {
  return [usePaymentsState(), usePaymentsDispatch()];
}
