import { PaymentsFilter } from '../../models/payments-filter';

export enum PaymentsActionTypes {
  SELECT_PAYMENT = '[Payments] Select Payment',
  FILTER_CHANGE = '[Payments] Filter Change',
  SORTING_CHANGE = '[Payments] Sorting Change',
  PAGE_CHANGE = '[Payments] Page Change'
}

interface SelectPaymentAction {
  type: PaymentsActionTypes.SELECT_PAYMENT;
  payload: number;
}

interface FilterChangeAction {
  type: PaymentsActionTypes.FILTER_CHANGE;
  payload: PaymentsFilter['filter'];
}

interface SortingChangeAction {
  type: PaymentsActionTypes.SORTING_CHANGE;
  payload: PaymentsFilter['order'];
}

interface PageChangeAction {
  type: PaymentsActionTypes.PAGE_CHANGE;
  payload: {
    offset: number;
    limit: number;
  };
}

export type PaymentsAction =
  | SelectPaymentAction
  | FilterChangeAction
  | SortingChangeAction
  | PageChangeAction;

export type PaymentsDispatch = (action: PaymentsAction) => void;
