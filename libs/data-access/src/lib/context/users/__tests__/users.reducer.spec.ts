import { Roles } from '@deliveryapp/common';

import { UsersFilter } from '../../../models/users-filter';
import { UsersAction, UsersActionTypes } from '../users.actions';
import { initialUsersState, usersReducer } from '../users.reducer';

describe('[Users Context] Reducer', () => {
  describe('Unknown type', () => {
    it('should return passed state', () => {
      const action = {} as UsersAction;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const state: any = { type: 'UNKNOWN' };
      const updatedState = usersReducer(state, action);
      expect(updatedState).toBe(state);
    });
  });

  describe('SELECT_USER', () => {
    const payload = 1;

    it('should update state with new selected user', () => {
      const action: UsersAction = {
        type: UsersActionTypes.SELECT_USER,
        payload
      };
      const updatedState = usersReducer(initialUsersState, action);
      expect(updatedState.selectedUser).toEqual(payload);
    });
  });

  describe('FILTER_CHANGE', () => {
    const filter = {
      id: 1
    };

    it('should update state with new filter', () => {
      const action: UsersAction = {
        type: UsersActionTypes.FILTER_CHANGE,
        payload: filter
      };
      const updatedState = usersReducer(initialUsersState, action);
      expect(updatedState.usersFilter.filter).toEqual({
        ...filter,
        role: [Roles.MANAGER, Roles.ADMIN]
      });
    });

    it('should reset offset to 0', () => {
      const action: UsersAction = {
        type: UsersActionTypes.FILTER_CHANGE,
        payload: filter
      };
      const updatedState = usersReducer(
        {
          ...initialUsersState,
          usersFilter: { ...initialUsersState.usersFilter, offset: 10 }
        },
        action
      );
      expect(updatedState.usersFilter.offset).toEqual(0);
    });
  });

  describe('SORTING_CHANGE', () => {
    const order: UsersFilter['order'] = {
      email: 'desc'
    };

    it('should update state with new order', () => {
      const action: UsersAction = {
        type: UsersActionTypes.SORTING_CHANGE,
        payload: order
      };
      const updatedState = usersReducer(initialUsersState, action);
      expect(updatedState.usersFilter.order).toEqual(order);
    });
  });

  describe('PAGE_CHANGE', () => {
    const payload = {
      offset: 10,
      limit: 10
    };

    it('should update state with new offset and limit', () => {
      const action: UsersAction = {
        type: UsersActionTypes.PAGE_CHANGE,
        payload
      };
      const updatedState = usersReducer(initialUsersState, action);
      expect(updatedState.usersFilter.limit).toEqual(payload.limit);
      expect(updatedState.usersFilter.offset).toEqual(payload.offset);
    });
  });
});
