import { apiClient } from '@deliveryapp/core';
import { updateOrder, createOrder } from '@deliveryapp/testing';

import { createOrderSelf, updateOrderSelf } from '../orders';

describe('API Orders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrderSelf', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'post').mockResolvedValue({ data: createOrder });
    });

    it('should send POST request', () => {
      createOrderSelf(createOrder);
      expect(apiClient.post).toBeCalledWith('/users/self/orders', createOrder);
    });

    it('should return newly created order', async () => {
      expect(await createOrderSelf(createOrder)).toEqual({ data: createOrder });
    });

    it('should return error if creation failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'post')
        .mockImplementation(() => Promise.reject(error));

      try {
        await createOrderSelf(createOrder);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updateOrderSelf', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'patch').mockResolvedValue({ data: updateOrder });
    });

    it('should send PATCH request', () => {
      updateOrderSelf(1, updateOrder);
      expect(apiClient.patch).toBeCalledWith(
        '/users/self/orders/1',
        updateOrder
      );
    });

    it('should return updated order', async () => {
      expect(await updateOrderSelf(1, updateOrder)).toEqual({
        data: updateOrder
      });
    });

    it('should return error if updating failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementation(() => Promise.reject(error));

      try {
        await updateOrderSelf(1, updateOrder);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  // TODO: add tests for getOrdersSelf
});
