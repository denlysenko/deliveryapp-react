import { apiClient } from '@deliveryapp/core';
import { order } from '@deliveryapp/testing';

import { createOrderSelf, updateOrderSelf } from '../orders';

describe('API Orders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrderSelf', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'post').mockResolvedValue({ data: order });
    });

    it('should send POST request', () => {
      createOrderSelf(order);
      expect(apiClient.post).toBeCalledWith('/users/self/orders', order);
    });

    it('should return newly created order', async () => {
      expect(await createOrderSelf(order)).toEqual({ data: order });
    });

    it('should return error if creation failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'post')
        .mockImplementation(() => Promise.reject(error));

      try {
        await createOrderSelf(order);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updateOrderSelf', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'patch').mockResolvedValue({ data: order });
    });

    it('should send PATCH request', () => {
      updateOrderSelf(1, order);
      expect(apiClient.patch).toBeCalledWith('/users/self/orders/1', order);
    });

    it('should return updated order', async () => {
      expect(await updateOrderSelf(1, order)).toEqual({ data: order });
    });

    it('should return error if updating failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementation(() => Promise.reject(error));

      try {
        await updateOrderSelf(1, order);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  // TODO: add tests for getOrdersSelf
});
