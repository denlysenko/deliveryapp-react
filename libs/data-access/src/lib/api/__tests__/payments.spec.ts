import { apiClient } from '@deliveryapp/core';
import {
  createPaymentDto,
  savedPayment,
  updatePaymentDto
} from '@deliveryapp/testing';

import { PaymentsFilter } from '../../models/payments-filter';
import {
  createPayment,
  getPayment,
  getPayments,
  updatePayment
} from '../payments';

describe('API Payments', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPayment', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'post')
        .mockResolvedValue({ data: { id: savedPayment.id } });
    });

    it('should send POST request', () => {
      createPayment(createPaymentDto);
      expect(apiClient.post).toBeCalledWith('/payments', createPaymentDto);
    });

    it('should return newly created payment', async () => {
      expect(await createPayment(createPaymentDto)).toEqual({
        data: { id: savedPayment.id }
      });
    });

    it('should return error if creation failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'post')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await createPayment(createPaymentDto);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updatePayment', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'patch')
        .mockResolvedValue({ data: { id: savedPayment.id } });
    });

    it('should send PATCH request', () => {
      updatePayment(1, updatePaymentDto);
      expect(apiClient.patch).toBeCalledWith('/payments/1', updatePaymentDto);
    });

    it('should return updated payment id', async () => {
      expect(await updatePayment(1, updatePaymentDto)).toEqual({
        data: { id: savedPayment.id }
      });
    });

    it('should return error if updating failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await updatePayment(1, updatePaymentDto);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('getPayment', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'get').mockResolvedValue({ data: savedPayment });
    });

    it('should send GET request', () => {
      getPayment(1);
      expect(apiClient.get).toBeCalledWith('/payments/1');
    });

    it('should return payment', async () => {
      expect(await getPayment(1)).toEqual({
        data: savedPayment
      });
    });

    it('should return error if payment not found', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'get')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await getPayment(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('getPayments', () => {
    const query: PaymentsFilter = {
      limit: 10,
      offset: 0,
      order: { status: 'asc' }
    };

    beforeEach(() => {
      jest
        .spyOn(apiClient, 'get')
        .mockResolvedValue({ data: { count: 1, rows: [savedPayment] } });
    });

    it('should send GET request', () => {
      getPayments(query);
      expect(apiClient.get).toBeCalledWith('/payments', query);
    });

    it('should return count and payments', async () => {
      expect(await getPayments(query)).toEqual({
        data: { count: 1, rows: [savedPayment] }
      });
    });
  });
});
