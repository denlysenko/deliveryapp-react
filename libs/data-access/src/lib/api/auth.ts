import { apiClient } from '@deliveryapp/core';

import { AuthCredentials, AuthPayload } from '../models/auth';

export function login(
  credentials: Pick<AuthCredentials, 'email' | 'password'>
): Promise<{ data: AuthPayload }> {
  return apiClient.post<{ data: AuthPayload }>('/auth/login', credentials);
}

export function register(
  credentials: AuthCredentials
): Promise<{ data: AuthPayload }> {
  return apiClient.post<{ data: AuthPayload }>('/auth/register', credentials);
}
