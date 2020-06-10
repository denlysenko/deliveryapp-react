import { UsersFilter } from '../../models/users-filter';

export enum UsersActionTypes {
  SELECT_USER = '[Users] Select User',
  FILTER_CHANGE = '[Users] Filter Change',
  SORTING_CHANGE = '[Users] Sorting Change',
  PAGE_CHANGE = '[Users] Page Change',
  RELOAD = '[Users] Reload'
}

interface SelectUserAction {
  type: UsersActionTypes.SELECT_USER;
  payload: number | null;
}

interface FilterChangeAction {
  type: UsersActionTypes.FILTER_CHANGE;
  payload: UsersFilter['filter'];
}

interface SortingChangeAction {
  type: UsersActionTypes.SORTING_CHANGE;
  payload: UsersFilter['order'];
}

interface PageChangeAction {
  type: UsersActionTypes.PAGE_CHANGE;
  payload: {
    offset: number;
    limit: number;
  };
}

interface Reload {
  type: UsersActionTypes.RELOAD;
}

export type UsersAction =
  | SelectUserAction
  | FilterChangeAction
  | SortingChangeAction
  | PageChangeAction
  | Reload;

export type UsersDispatch = (action: UsersAction) => void;
