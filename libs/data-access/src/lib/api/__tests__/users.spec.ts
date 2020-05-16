import { apiClient } from '@deliveryapp/core';
import { user } from '@deliveryapp/testing';

import { getUser, getUsers, me, updatePassword, updateProfile } from '../users';

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

  describe('getUsers', () => {
    const query = {
      limit: 10,
      offset: 0,
      order: { id: 'asc' as 'asc' }
    };

    beforeEach(() => {
      jest
        .spyOn(apiClient, 'get')
        .mockResolvedValue({ data: { count: 1, rows: [user] } });
    });

    it('should send GET request', () => {
      getUsers(query);
      expect(apiClient.get).toBeCalledWith('/users', query);
    });

    it('should return count and users', async () => {
      expect(await getUsers(query)).toEqual({
        data: { count: 1, rows: [user] }
      });
    });
  });

  describe('getUser', () => {
    beforeEach(() => {
      jest.spyOn(apiClient, 'get').mockResolvedValue({ data: user });
    });

    it('should send GET request', () => {
      getUser(1);
      expect(apiClient.get).toBeCalledWith('/users/1');
    });

    it('should return user', async () => {
      expect(await getUser(1)).toEqual({
        data: user
      });
    });

    it('should return error if user not found', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'get')
        .mockImplementation(() => Promise.reject(error));

      try {
        await getUser(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
