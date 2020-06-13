import { DEFAULT_LIMIT, Roles } from '@deliveryapp/common';

import { UsersFilter } from '../../models/users-filter';
import { UsersAction, UsersActionTypes } from './users.actions';

export interface UsersState {
  selectedUser: number | null;
  usersFilter: {
    filter: UsersFilter['filter'];
    order: UsersFilter['order'];
    offset?: number;
    limit?: number;
  };
}

export const initialUsersState: UsersState = {
  selectedUser: null,
  usersFilter: {
    filter: {
      role: [Roles.MANAGER, Roles.ADMIN]
    },
    order: {
      id: 'desc'
    },
    offset: 0,
    limit: DEFAULT_LIMIT
  }
};

export function usersReducer(
  state: UsersState,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case UsersActionTypes.SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload
      };

    case UsersActionTypes.FILTER_CHANGE:
      return {
        ...state,
        usersFilter: {
          ...state.usersFilter,
          filter: {
            ...initialUsersState.usersFilter.filter,
            ...action.payload
          },
          offset: 0
        }
      };

    case UsersActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        usersFilter: {
          ...state.usersFilter,
          order: action.payload
        }
      };
    }

    case UsersActionTypes.PAGE_CHANGE: {
      return {
        ...state,
        usersFilter: {
          ...state.usersFilter,
          offset: action.payload.offset,
          limit: action.payload.limit
        }
      };
    }

    case UsersActionTypes.RELOAD: {
      return {
        ...state,
        usersFilter: {
          ...state.usersFilter
        }
      };
    }

    default:
      return state;
  }
}
