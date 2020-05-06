import { apiClient } from '@deliveryapp/core';
import {
  updateOrderDto,
  createOrderDto,
  savedOrder
} from '@deliveryapp/testing';

import { createOrder, updateOrder } from '../orders';

describe('API Orders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'post')
        .mockResolvedValue({ data: { id: savedOrder.id } });
    });

    it('should send POST request', () => {
      createOrder(createOrderDto);
      expect(apiClient.post).toBeCalledWith('/orders', createOrderDto);
    });

    it('should return newly created order', async () => {
      expect(await createOrder(createOrderDto)).toEqual({
        data: { id: savedOrder.id }
      });
    });

    it('should return error if creation failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'post')
        .mockImplementation(() => Promise.reject(error));

      try {
        await createOrder(createOrderDto);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updateOrder', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'patch')
        .mockResolvedValue({ data: { id: savedOrder.id } });
    });

    it('should send PATCH request', () => {
      updateOrder(1, updateOrderDto);
      expect(apiClient.patch).toBeCalledWith('/orders/1', updateOrderDto);
    });

    it('should return updated order', async () => {
      expect(await updateOrder(1, updateOrderDto)).toEqual({
        data: { id: savedOrder.id }
      });
    });

    it('should return error if updating failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementation(() => Promise.reject(error));

      try {
        await updateOrder(1, updateOrderDto);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  // TODO: add tests for getOrdersSelf
});
