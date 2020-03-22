import { apiService } from '@deliveryapp/core';
import { order } from '@deliveryapp/testing';

import { createOrderSelf } from './orders';

jest.mock('@deliveryapp/core', () => ({
  apiService: {
    post: jest.fn(() => Promise.resolve({ data: order }))
  }
}));

describe('API Orders', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrderSelf', () => {
    it('should send POST request', () => {
      createOrderSelf(order);
      expect(apiService.post).toBeCalledWith('/users/self/orders', order);
    });

    it('should return newly created order', async () => {
      expect(await createOrderSelf(order)).toEqual({ data: order });
    });

    it('should return error if creation failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiService, 'post')
        .mockImplementation(() => Promise.reject(error));

      try {
        await createOrderSelf(order);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
