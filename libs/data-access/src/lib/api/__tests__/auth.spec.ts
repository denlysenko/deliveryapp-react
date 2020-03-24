import { apiClient } from '@deliveryapp/core';
import { authPayload } from '@deliveryapp/testing';

import { AuthCredentials } from '../../models/auth';
import { login, register } from '../auth';

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    get: jest.fn(() => Promise.resolve({ data: authPayload })),
    post: jest.fn(() => Promise.resolve({ data: authPayload }))
  }
}));

describe('API Auth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    let loginCredentials: Pick<AuthCredentials, 'email' | 'password'>;

    beforeEach(() => {
      loginCredentials = {
        email: 'test@test.com',
        password: 'password'
      };
    });

    it('should login with credentials', () => {
      login(loginCredentials);
      expect(apiClient.post).toBeCalledWith('/auth/login', loginCredentials);
    });

    it('should return auth token', async () => {
      expect(await login(loginCredentials)).toEqual({ data: authPayload });
    });
  });

  describe('register', () => {
    let registerCredentials: AuthCredentials;

    beforeEach(() => {
      registerCredentials = {
        email: 'test@test.com',
        password: 'password',
        firstName: 'test',
        lastName: 'test',
        company: 'test',
        phone: '12345566'
      };
    });

    it('should register with credentials', () => {
      register(registerCredentials);
      expect(apiClient.post).toBeCalledWith(
        '/auth/register',
        registerCredentials
      );
    });

    it('should return auth token', async () => {
      expect(await register(registerCredentials)).toEqual({
        data: authPayload
      });
    });
  });
});
