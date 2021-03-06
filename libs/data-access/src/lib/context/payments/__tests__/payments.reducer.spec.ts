import { PaymentsFilter } from '../../../models/payments-filter';
import { PaymentsAction, PaymentsActionTypes } from '../payments.actions';
import { initialPaymentsState, paymentsReducer } from '../payments.reducer';

describe('[Payments Context] Reducer', () => {
  describe('Unknown type', () => {
    it('should return passed state', () => {
      const action = {} as PaymentsAction;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const state: any = { type: 'UNKNOWN' };
      const updatedState = paymentsReducer(state, action);
      expect(updatedState).toBe(state);
    });
  });

  describe('SELECT_PAYMENT', () => {
    const payload = 1;

    it('should update state with new selected payment', () => {
      const action: PaymentsAction = {
        type: PaymentsActionTypes.SELECT_PAYMENT,
        payload
      };
      const updatedState = paymentsReducer(initialPaymentsState, action);
      expect(updatedState.selectedPayment).toEqual(payload);
    });
  });

  describe('FILTER_CHANGE', () => {
    const filter = {
      id: 1
    };

    it('should update state with new filter', () => {
      const action: PaymentsAction = {
        type: PaymentsActionTypes.FILTER_CHANGE,
        payload: filter
      };
      const updatedState = paymentsReducer(initialPaymentsState, action);
      expect(updatedState.paymentsFilter.filter).toEqual(filter);
    });

    it('should reset offset to 0', () => {
      const action: PaymentsAction = {
        type: PaymentsActionTypes.FILTER_CHANGE,
        payload: filter
      };
      const updatedState = paymentsReducer(
        {
          ...initialPaymentsState,
          paymentsFilter: { ...initialPaymentsState.paymentsFilter, offset: 10 }
        },
        action
      );
      expect(updatedState.paymentsFilter.offset).toEqual(0);
    });
  });

  describe('SORTING_CHANGE', () => {
    const order: PaymentsFilter['order'] = {
      status: 'desc'
    };

    it('should update state with new order', () => {
      const action: PaymentsAction = {
        type: PaymentsActionTypes.SORTING_CHANGE,
        payload: order
      };
      const updatedState = paymentsReducer(initialPaymentsState, action);
      expect(updatedState.paymentsFilter.order).toEqual(order);
    });
  });

  describe('PAGE_CHANGE', () => {
    const payload = {
      offset: 10,
      limit: 10
    };

    it('should update state with new offset and limit', () => {
      const action: PaymentsAction = {
        type: PaymentsActionTypes.PAGE_CHANGE,
        payload
      };
      const updatedState = paymentsReducer(initialPaymentsState, action);
      expect(updatedState.paymentsFilter.limit).toEqual(payload.limit);
      expect(updatedState.paymentsFilter.offset).toEqual(payload.offset);
    });
  });
});
