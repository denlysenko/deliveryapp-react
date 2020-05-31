import { DEFAULT_LIMIT } from '@deliveryapp/common';

import { PaymentsFilter } from '../../models/payments-filter';
import { PaymentsAction, PaymentsActionTypes } from './payments.actions';

export interface PaymentsState {
  selectedPayment: number | null;
  paymentsFilter: {
    filter: PaymentsFilter['filter'];
    order: PaymentsFilter['order'];
    offset?: number;
    limit?: number;
  };
}

export const initialPaymentsState: PaymentsState = {
  selectedPayment: null,
  paymentsFilter: {
    filter: {},
    order: {
      id: 'desc'
    },
    offset: 0,
    limit: DEFAULT_LIMIT
  }
};

export function paymentsReducer(
  state: PaymentsState,
  action: PaymentsAction
): PaymentsState {
  switch (action.type) {
    case PaymentsActionTypes.SELECT_PAYMENT:
      return {
        ...state,
        selectedPayment: action.payload
      };

    case PaymentsActionTypes.FILTER_CHANGE:
      return {
        ...state,
        paymentsFilter: {
          ...state.paymentsFilter,
          filter: action.payload,
          offset: 0
        }
      };

    case PaymentsActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        paymentsFilter: {
          ...state.paymentsFilter,
          order: action.payload
        }
      };
    }

    case PaymentsActionTypes.PAGE_CHANGE: {
      return {
        ...state,
        paymentsFilter: {
          ...state.paymentsFilter,
          offset: action.payload.offset,
          limit: action.payload.limit
        }
      };
    }

    case PaymentsActionTypes.RELOAD: {
      return {
        ...state,
        paymentsFilter: {
          ...state.paymentsFilter
        }
      };
    }

    default:
      return state;
  }
}
