import { apiClient } from '@deliveryapp/core';
import { message } from '@deliveryapp/testing';

import { BaseFilter } from '../../models/base-filter';
import {
  loadMessages,
  markAsRead,
  subscribeToMessages,
  unsubscribeFromMessages
} from '../messages';

describe('API Messages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadMessages', () => {
    const query: BaseFilter = {
      limit: 10,
      offset: 0
    };

    beforeEach(() => {
      jest
        .spyOn(apiClient, 'get')
        .mockResolvedValue({ data: { count: 1, rows: [message] } });
    });

    it('should send GET request', () => {
      loadMessages(query);
      expect(apiClient.get).toBeCalledWith('/messages', query);
    });

    it('should return count and messages', async () => {
      expect(await loadMessages(query)).toEqual({
        data: { count: 1, rows: [message] }
      });
    });
  });

  describe('markAsRead', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'patch').mockResolvedValue({});
    });

    it('should send PATCH request', () => {
      markAsRead(message._id);
      expect(apiClient.patch).toBeCalledWith(`/messages/${message._id}`, {});
    });
  });

  describe('subscribeToMessages', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'post').mockResolvedValue({});
    });

    it('should send POST request', () => {
      const token = 'token';

      subscribeToMessages(token);
      expect(apiClient.post).toBeCalledWith('/messages/subscribe', {
        socketId: token
      });
    });
  });

  describe('unsubscribeFromMessages', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'post').mockResolvedValue({});
    });

    it('should send POST request', () => {
      const token = 'token';

      unsubscribeFromMessages(token);
      expect(apiClient.post).toBeCalledWith('/messages/unsubscribe', {
        socketId: token
      });
    });
  });
});
