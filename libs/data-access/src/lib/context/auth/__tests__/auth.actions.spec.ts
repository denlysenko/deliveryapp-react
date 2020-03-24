import { ACCESS_TOKEN } from '@deliveryapp/common';
import { apiClient } from '@deliveryapp/core';
import { user } from '@deliveryapp/testing';

import { me } from '../../../api/users';
import { AuthActionTypes, loadSelf } from '../auth.actions';

const dispatch = jest.fn();
const history = {
  push: jest.fn()
};

jest.mock('../../../api/users', () => ({
  me: jest.fn(() => Promise.resolve({ data: user }))
}));

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    removeAuthHeader: jest.fn()
  }
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('[Auth Context] Actions', () => {
  describe('loadMe', () => {
    describe('success', () => {
      it('should dispatch LOAD_SUCCESS', async () => {
        await loadSelf(dispatch, history);
        expect(dispatch).toBeCalledWith({
          type: AuthActionTypes.USER_LOADED,
          payload: user
        });
      });
    });

    describe('fail/logout', () => {
      beforeEach(() => {
        (me as jest.MockedFunction<typeof me>).mockImplementationOnce(() =>
          Promise.reject({})
        );
      });

      it('should dispatch LOGOUT', async () => {
        await loadSelf(dispatch, history);
        expect(dispatch).toBeCalledWith({
          type: AuthActionTypes.LOGOUT
        });
      });

      it('should remove ACCESS_TOKEN from localStorage', async () => {
        const localStorageSpy = jest.spyOn(
          window.localStorage.__proto__,
          'removeItem'
        );

        await loadSelf(dispatch, history);
        expect(localStorageSpy).toBeCalledWith(ACCESS_TOKEN);
      });

      it('should remove auth header', async () => {
        await loadSelf(dispatch, history);
        expect(apiClient.removeAuthHeader).toBeCalledTimes(1);
      });

      it('should redirect to auth', async () => {
        await loadSelf(dispatch, history);
        expect(history.push).toBeCalledWith('/auth');
      });
    });
  });
});
