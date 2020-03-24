import { apiClient } from '@deliveryapp/core';
import { user } from '@deliveryapp/testing';

import { me, updateProfile, updatePassword } from '../users';

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    get: jest.fn(() => Promise.resolve(user)),
    patch: jest.fn()
  }
}));

describe('API Users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('me', () => {
    it('should send correct request', () => {
      me();
      expect(apiClient.get).toBeCalledWith('/users/self');
    });

    it('should return user', async () => {
      expect(await me()).toEqual(user);
    });
  });

  describe('updateProfile', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'patch')
        .mockImplementation(() => Promise.resolve(user));
    });

    it('should send correct request', () => {
      const profile = { firstName: 'test' };
      updateProfile(profile);
      expect(apiClient.patch).toBeCalledWith('/users/self', profile);
    });

    it('should return user', async () => {
      const profile = { firstName: 'test' };
      expect(await updateProfile(profile)).toEqual(user);
    });

    it('should return error', async () => {
      const profile = { firstName: 'test' };
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementation(() => Promise.reject(error));

      try {
        await updateProfile(profile);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updatePassword', () => {
    it('should send correct request', () => {
      jest
        .spyOn(apiClient, 'patch')
        .mockImplementation(() => Promise.resolve({}));

      const payload = { oldPassword: 'test', newPassword: 'test1' };
      updatePassword(payload);
      expect(apiClient.patch).toBeCalledWith('/users/self/password', payload);
    });

    it('should return error', async () => {
      const payload = { oldPassword: 'test', newPassword: 'test1' };
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementation(() => Promise.reject(error));

      try {
        await updatePassword(payload);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
