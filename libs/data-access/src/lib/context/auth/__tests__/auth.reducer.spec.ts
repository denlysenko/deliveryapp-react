import { user } from '@deliveryapp/testing';

import { AuthActionTypes, AuthAction } from '../auth.actions';
import { authReducer, initialAuthState } from '../auth.reducer';

describe('[Auth Context] Reducer', () => {
  describe('LOAD_USER_SUCCESS', () => {
    it('should update state with user', () => {
      const action: AuthAction = {
        type: AuthActionTypes.USER_LOADED,
        payload: user
      };
      const updatedState = authReducer(initialAuthState, action);
      expect(updatedState.isLoggedIn).toBeTruthy();
      expect(updatedState.user).toEqual(user);
    });
  });

  describe('LOGOUT', () => {
    it('should update state with user', () => {
      const action: AuthAction = { type: AuthActionTypes.LOGOUT };
      const state = { isLoggedIn: true, user };
      const updatedState = authReducer(state, action);
      expect(updatedState.isLoggedIn).toBeFalsy();
      expect(updatedState.user).toBeNull();
    });
  });
});
