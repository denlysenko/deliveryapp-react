import { apiService } from '@deliveryapp/core';
import { user } from '@deliveryapp/testing';

import { me } from './users';

jest.mock('@deliveryapp/core', () => ({
  apiService: {
    get: jest.fn(() => Promise.resolve(user))
  }
}));

describe('API Users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('me', () => {
    it('should send correct request', () => {
      me();
      expect(apiService.get).toBeCalledWith('/users/self');
    });

    it('should return user', async () => {
      expect(await me()).toEqual(user);
    });
  });
});
