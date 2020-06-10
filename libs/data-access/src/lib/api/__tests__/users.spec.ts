import { apiClient } from '@deliveryapp/core';
import { createUserDto, user } from '@deliveryapp/testing';

import {
  createUser,
  getUser,
  getUsers,
  me,
  updatePassword,
  updateProfile,
  updateUser
} from '../users';

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    get: jest.fn(() => Promise.resolve(user)),
    patch: jest.fn(),
    post: jest.fn()
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
        .mockImplementation(() => Promise.resolve({ data: { id: user.id } }));
    });

    it('should send correct request', () => {
      const profile = { firstName: 'test' };
      updateProfile(profile);
      expect(apiClient.patch).toBeCalledWith('/users/self', profile);
    });

    it('should return user id', async () => {
      const profile = { firstName: 'test' };
      expect(await updateProfile(profile)).toEqual({ data: { id: user.id } });
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

  describe('createUser', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'post')
        .mockResolvedValue({ data: { id: user.id } });
    });

    it('should send POST request', () => {
      createUser(createUserDto);
      expect(apiClient.post).toBeCalledWith('/users', createUserDto);
    });

    it('should return newly created user id', async () => {
      expect(await createUser(createUserDto)).toEqual({
        data: { id: user.id }
      });
    });

    it('should return error if creation failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'post')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await createUser(createUserDto);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updateUser', () => {
    beforeEach(() => {
      jest
        .spyOn(apiClient, 'patch')
        .mockResolvedValue({ data: { id: user.id } });
    });

    it('should send PATCH request', () => {
      updateUser(1, createUserDto);
      expect(apiClient.patch).toBeCalledWith('/users/1', createUserDto);
    });

    it('should return updated user id', async () => {
      expect(await updateUser(1, createUserDto)).toEqual({
        data: { id: user.id }
      });
    });

    it('should return error if updating failed', async () => {
      const error = { message: 'Error' };

      jest
        .spyOn(apiClient, 'patch')
        .mockImplementationOnce(() => Promise.reject(error));

      try {
        await updateUser(1, createUserDto);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
});
