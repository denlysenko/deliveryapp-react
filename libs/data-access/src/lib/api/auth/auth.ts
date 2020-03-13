import { apiService } from '@deliveryapp/core';

import { AuthCredentials, AuthPayload } from '../../models/auth';

export function login(
  credentials: Partial<AuthCredentials>
): Promise<AuthPayload> {
  return apiService.post<AuthPayload>('/auth/login', credentials);
}

export function register(credentials: AuthCredentials): Promise<AuthPayload> {
  return apiService.post<AuthPayload>('/auth/register', credentials);
}
