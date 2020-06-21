import { apiClient } from '@deliveryapp/core';
import { address, bankDetails } from '@deliveryapp/testing';

import {
  createAddress,
  createBankDetails,
  getAddress,
  getBankDetails,
  updateAddress,
  updateBankDetails
} from '../settings';

describe('API Settings', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAddress', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'post')
        .mockResolvedValue({ data: { id: address.id } });
    });

    it('should send POST request', () => {
      createAddress(address);
      expect(apiClient.post).toBeCalledWith('/settings/address', address);
    });

    it('should return newly created address', async () => {
      expect(await createAddress(address)).toEqual({
        data: { id: address.id }
      });
    });

    it('should return error if creation failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'post')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await createAddress(address);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('createBankDetails', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'post')
        .mockResolvedValue({ data: { id: bankDetails.id } });
    });

    it('should send POST request', () => {
      createBankDetails(bankDetails);
      expect(apiClient.post).toBeCalledWith(
        '/settings/bank-details',
        bankDetails
      );
    });

    it('should return newly created bank details', async () => {
      expect(await createBankDetails(bankDetails)).toEqual({
        data: { id: bankDetails.id }
      });
    });

    it('should return error if creation failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'post')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await createBankDetails(bankDetails);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updateAddress', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'patch')
        .mockResolvedValue({ data: { id: address.id } });
    });

    it('should send PATCH request', () => {
      updateAddress(1, address);
      expect(apiClient.patch).toBeCalledWith('/settings/address/1', address);
    });

    it('should return updated address id', async () => {
      expect(await updateAddress(1, address)).toEqual({
        data: { id: address.id }
      });
    });

    it('should return error if updating failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await updateAddress(1, address);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updateBankDetails', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'patch')
        .mockResolvedValue({ data: { id: bankDetails.id } });
    });

    it('should send PATCH request', () => {
      updateBankDetails(1, bankDetails);
      expect(apiClient.patch).toBeCalledWith(
        '/settings/bank-details/1',
        bankDetails
      );
    });

    it('should return updated bank details id', async () => {
      expect(await updateBankDetails(1, bankDetails)).toEqual({
        data: { id: bankDetails.id }
      });
    });

    it('should return error if updating failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await updateBankDetails(1, bankDetails);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('getAddress', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'get').mockResolvedValue({ data: address });
    });

    it('should send GET request', () => {
      getAddress();
      expect(apiClient.get).toBeCalledWith('/settings/address');
    });

    it('should return address', async () => {
      expect(await getAddress()).toEqual({
        data: address
      });
    });
  });

  describe('getBankDetails', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'get').mockResolvedValue({ data: bankDetails });
    });

    it('should send GET request', () => {
      getBankDetails();
      expect(apiClient.get).toBeCalledWith('/settings/bank-details');
    });

    it('should return bank details', async () => {
      expect(await getBankDetails()).toEqual({
        data: bankDetails
      });
    });
  });
});
