import { DEFAULT_LIMIT } from '@deliveryapp/common';

import { LogsFilter } from '../../models/logs-filter';
import { LogsAction, LogsActionTypes } from './logs.actions';

export interface LogsState {
  filter: LogsFilter['filter'];
  order: LogsFilter['order'];
  offset?: number;
  limit?: number;
}

export const initialLogsState: LogsState = {
  filter: {},
  order: {
    createdAt: 'desc'
  },
  offset: 0,
  limit: DEFAULT_LIMIT
};

export function logsReducer(state: LogsState, action: LogsAction): LogsState {
  switch (action.type) {
    case LogsActionTypes.FILTER_CHANGE:
      return {
        ...state,
        filter: action.payload,
        offset: 0
      };

    case LogsActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        order: action.payload
      };
    }

    case LogsActionTypes.PAGE_CHANGE: {
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
