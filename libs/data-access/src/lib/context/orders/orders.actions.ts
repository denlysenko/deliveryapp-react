import { OrdersFilter } from '../../models/orders-filter';

export enum OrdersActionTypes {
  FILTER_CHANGE = '[Orders] Filter Change',
  SORTING_CHANGE = '[Orders] Sorting Change',
  PAGE_CHANGE = '[Orders] Page Change'
}

interface FilterChangeAction {
  type: OrdersActionTypes.FILTER_CHANGE;
  payload: OrdersFilter['filter'];
}

interface SortingChangeAction {
  type: OrdersActionTypes.SORTING_CHANGE;
  payload: OrdersFilter['order'];
}

interface PageChangeAction {
  type: OrdersActionTypes.PAGE_CHANGE;
  payload: {
    offset: number;
    limit: number;
  };
}

export type OrdersAction =
  | FilterChangeAction
  | SortingChangeAction
  | PageChangeAction;

export type OrdersDispatch = (action: OrdersAction) => void;
