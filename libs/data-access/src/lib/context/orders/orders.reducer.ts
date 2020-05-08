import { DEFAULT_LIMIT } from '@deliveryapp/common';

import { OrdersFilter } from '../../models/orders-filter';
import { OrdersAction, OrdersActionTypes } from './orders.actions';

export interface OrdersState {
  filter: OrdersFilter['filter'];
  order: OrdersFilter['order'];
  offset?: number;
  limit?: number;
}

export const initialOrdersState: OrdersState = {
  filter: {},
  order: {
    id: 'desc'
  },
  offset: 0,
  limit: DEFAULT_LIMIT
};

export function ordersReducer(
  state: OrdersState,
  action: OrdersAction
): OrdersState {
  switch (action.type) {
    case OrdersActionTypes.FILTER_CHANGE:
      return {
        ...state,
        filter: action.payload,
        offset: 0
      };

    case OrdersActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        order: action.payload
      };
    }

    case OrdersActionTypes.PAGE_CHANGE: {
      return {
        ...state,
        offset: action.payload.offset,
        limit: action.payload.limit
      };
    }

    default:
      return state;
  }
}
