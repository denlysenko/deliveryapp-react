import { apiClient } from '@deliveryapp/core';
import {
  createOrderDto,
  savedOrder,
  updateOrderDto
} from '@deliveryapp/testing';

import { createOrder, getOrder, getOrders, updateOrder } from '../orders';

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
        .mockImplementationOnce(() => Promise.reject(error));

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
        .mockImplementationOnce(() => Promise.reject(error));

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

    it('should return error if order not found', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'get')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await getOrder(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('getOrders', () => {
    const query = {
      limit: 10,
      offset: 0,
      order: { id: 'asc' as 'asc' }
    };

    beforeEach(() => {
      jest
        .spyOn(apiClient, 'get')
        .mockResolvedValue({ data: { count: 1, rows: [savedOrder] } });
    });

    it('should send GET request', () => {
      getOrders(query);
      expect(apiClient.get).toBeCalledWith('/orders', query);
    });

    it('should return count and orders', async () => {
      expect(await getOrders(query)).toEqual({
        data: { count: 1, rows: [savedOrder] }
      });
    });
  });
});
