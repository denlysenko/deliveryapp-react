import { OrdersAction, OrdersActionTypes } from '../orders.actions';
import { initialOrdersState, ordersReducer } from '../orders.reducer';

describe('[Orders Context] Reducer', () => {
  describe('Unknown type', () => {
    it('should return passed state', () => {
      const action = {} as OrdersAction;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const state: any = { type: 'UNKNOWN' };
      const updatedState = ordersReducer(state, action);
      expect(updatedState).toBe(state);
    });
  });

  describe('FILTER_CHANGE', () => {
    const filter = {
      cargoName: 'test'
    };

    it('should update state with new filter', () => {
      const action: OrdersAction = {
        type: OrdersActionTypes.FILTER_CHANGE,
        payload: filter
      };
      const updatedState = ordersReducer(initialOrdersState, action);
      expect(updatedState.filter).toEqual(filter);
    });

    it('should reset offset to 0', () => {
      const action: OrdersAction = {
        type: OrdersActionTypes.FILTER_CHANGE,
        payload: filter
      };
      const updatedState = ordersReducer(
        { ...initialOrdersState, offset: 10 },
        action
      );
      expect(updatedState.offset).toEqual(0);
    });
  });

  describe('SORTING_CHANGE', () => {
    const order = {
      cargoName: 'desc' as 'desc'
    };

    it('should update state with new order', () => {
      const action: OrdersAction = {
        type: OrdersActionTypes.SORTING_CHANGE,
        payload: order
      };
      const updatedState = ordersReducer(initialOrdersState, action);
      expect(updatedState.order).toEqual(order);
    });
  });

  describe('PAGE_CHANGE', () => {
    const payload = {
      offset: 10,
      limit: 10
    };

    it('should update state with new offset and limit', () => {
      const action: OrdersAction = {
        type: OrdersActionTypes.PAGE_CHANGE,
        payload
      };
      const updatedState = ordersReducer(initialOrdersState, action);
      expect(updatedState.limit).toEqual(payload.limit);
      expect(updatedState.offset).toEqual(payload.offset);
    });
  });
});
