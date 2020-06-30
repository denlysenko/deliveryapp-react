import { apiClient, fcmMessaging } from '@deliveryapp/core';

import {
  subscribeToNotifications,
  unsubscribeFromNotifications
} from '../messages.actions';

const socketId = 'socketId';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function MockNotification() {}

MockNotification.requestPermission = jest.fn().mockResolvedValue('granted');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).Notification = MockNotification;

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
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

describe('[Messages Context] Actions', () => {
  describe('subscribeToNotifications', () => {
    describe('granted', () => {
      it('should subscribe to notifications', async () => {
        await subscribeToNotifications();
        expect(apiClient.post).toBeCalledWith('/messages/subscribe', {
          socketId
        });
      });
    });

    describe('not granted', () => {
      beforeEach(() => {
        jest
          .spyOn(MockNotification, 'requestPermission')
          .mockResolvedValueOnce('blocked');
      });

      it('should unsubscribe from notifications', async () => {
        await subscribeToNotifications();
        expect(apiClient.post).toBeCalledTimes(0);
      });
    });
  });

  describe('unsubscribeFromNotifications', () => {
    it('should unsubscribe from notifications', async () => {
      await unsubscribeFromNotifications();
      expect(apiClient.post).toBeCalledWith('/messages/unsubscribe', {
        socketId
      });
      expect(fcmMessaging.messaging?.deleteToken).toBeCalledWith(socketId);
      expect(fcmMessaging.unsubscribe).toBeCalledTimes(1);
    });
  });
});
