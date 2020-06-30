import { ACCESS_TOKEN } from '@deliveryapp/common';
import { apiClient, fcmMessaging } from '@deliveryapp/core';
import { user } from '@deliveryapp/testing';

import { AuthActionTypes, loadSelf } from '../auth.actions';

const dispatch = jest.fn();
const history = {
  push: jest.fn()
};
const socketId = 'socketId';

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    removeAuthHeader: jest.fn(),
    get: jest.fn(() => Promise.resolve({ data: user })),
    post: jest.fn().mockResolvedValue({})
  },
  fcmMessaging: {
    getToken: jest.fn().mockResolvedValue('socketId'),
    messaging: {
      deleteToken: jest.fn().mockResolvedValue({})
    },
    unsubscribe: jest.fn()
  }
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('[Auth Context] Actions', () => {
  let localStorageSpy: jest.SpyInstance;

  beforeEach(() => {
    localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'removeItem');
  });

  describe('loadSelf', () => {
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
        jest.spyOn(apiClient, 'get').mockRejectedValueOnce({});
      });

      it('should unsubscribe from notifications', async () => {
        await loadSelf(dispatch, history);
        expect(apiClient.post).toBeCalledWith('/messages/unsubscribe', {
          socketId
        });
        expect(fcmMessaging.messaging?.deleteToken).toBeCalledWith(socketId);
        expect(fcmMessaging.unsubscribe).toBeCalledTimes(1);
      });

      it('should remove ACCESS_TOKEN from localStorage', async () => {
        await loadSelf(dispatch, history);
        expect(localStorageSpy).toBeCalledWith(ACCESS_TOKEN);
      });

      it('should remove auth header', async () => {
        await loadSelf(dispatch, history);
        expect(apiClient.removeAuthHeader).toBeCalledTimes(1);
      });

      it('should dispatch LOGOUT', async () => {
        await loadSelf(dispatch, history);
        expect(dispatch).toBeCalledWith({
          type: AuthActionTypes.LOGOUT
        });
      });

      it('should redirect to auth', async () => {
        await loadSelf(dispatch, history);
        expect(history.push).toBeCalledWith('/auth');
      });
    });
  });
});
