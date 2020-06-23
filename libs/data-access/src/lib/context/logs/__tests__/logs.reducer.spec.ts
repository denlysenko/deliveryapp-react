import { LogsFilter } from '../../../models/logs-filter';
import { LogsAction, LogsActionTypes } from '../logs.actions';
import { initialLogsState, logsReducer } from '../logs.reducer';

describe('[Logs Context] Reducer', () => {
  describe('Unknown type', () => {
    it('should return passed state', () => {
      const action = {} as LogsAction;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const state: any = { type: 'UNKNOWN' };
      const updatedState = logsReducer(state, action);
      expect(updatedState).toBe(state);
    });
  });

  describe('FILTER_CHANGE', () => {
    const filter = {
      action: 1
    };

    it('should update state with new filter', () => {
      const action: LogsAction = {
        type: LogsActionTypes.FILTER_CHANGE,
        payload: filter
      };
      const updatedState = logsReducer(initialLogsState, action);
      expect(updatedState.filter).toEqual(filter);
    });

    it('should reset offset to 0', () => {
      const action: LogsAction = {
        type: LogsActionTypes.FILTER_CHANGE,
        payload: filter
      };
      const updatedState = logsReducer(initialLogsState, action);
      expect(updatedState.offset).toEqual(0);
    });
  });

  describe('SORTING_CHANGE', () => {
    const order: LogsFilter['order'] = {
      createdAt: 'asc'
    };

    it('should update state with new order', () => {
      const action: LogsAction = {
        type: LogsActionTypes.SORTING_CHANGE,
        payload: order
      };
      const updatedState = logsReducer(initialLogsState, action);
      expect(updatedState.order).toEqual(order);
    });
  });

  describe('PAGE_CHANGE', () => {
    const payload = {
      offset: 10,
      limit: 10
    };

    it('should update state with new offset and limit', () => {
      const action: LogsAction = {
        type: LogsActionTypes.PAGE_CHANGE,
        payload
      };
      const updatedState = logsReducer(initialLogsState, action);
      expect(updatedState.limit).toEqual(payload.limit);
      expect(updatedState.offset).toEqual(payload.offset);
    });
  });
});
