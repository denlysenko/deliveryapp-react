import { apiService } from '@deliveryapp/core';

import { AuthCredentials, AuthPayload } from '../../models/auth';

export function login(
  credentials: Partial<AuthCredentials>
): Promise<{ data: AuthPayload }> {
  return apiService.post<{ data: AuthPayload }>('/auth/login', credentials);
}

export function register(
  credentials: AuthCredentials
): Promise<{ data: AuthPayload }> {
  return apiService.post<{ data: AuthPayload }>('/auth/register', credentials);
}
