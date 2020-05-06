import { apiClient } from '@deliveryapp/core';
import {
  updateOrderDto,
  createOrderDto,
  savedOrder
} from '@deliveryapp/testing';

import { createOrder, updateOrder, getOrder } from '../orders';

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

  describe('getOrder', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'get').mockResolvedValue({ data: savedOrder });
    });

    it('should send GET request', () => {
      getOrder(1);
      expect(apiClient.get).toBeCalledWith('/orders/1');
    });

    it('should return order', async () => {
      expect(await getOrder(1)).toEqual({
        data: savedOrder
      });
    });

    it('should return error if updating failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'get')
        .mockImplementation(() => Promise.reject(error));

      try {
        await getOrder(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  // TODO: add tests for getOrders
});
