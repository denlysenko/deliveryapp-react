import { apiService } from '@deliveryapp/core';

import { me } from './users';
import { User } from '../../models/user';

const user: User = {
  id: 1,
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'Test',
  company: 'company',
  phone: '1234567',
  role: 1,
  address: null,
  bankDetails: null
};

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
