import { LogsFilter } from '../../models/logs-filter';

export enum LogsActionTypes {
  FILTER_CHANGE = '[Logs] Filter Change',
  SORTING_CHANGE = '[Logs] Sorting Change',
  PAGE_CHANGE = '[Logs] Page Change'
}

interface FilterChangeAction {
  type: LogsActionTypes.FILTER_CHANGE;
  payload: LogsFilter['filter'];
}

interface SortingChangeAction {
  type: LogsActionTypes.SORTING_CHANGE;
  payload: LogsFilter['order'];
}

interface PageChangeAction {
  type: LogsActionTypes.PAGE_CHANGE;
  payload: {
    offset: number;
    limit: number;
  };
}

export type LogsAction =
  | FilterChangeAction
  | SortingChangeAction
  | PageChangeAction;

export type LogsDispatch = (action: LogsAction) => void;
