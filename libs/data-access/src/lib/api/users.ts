import { apiClient } from '@deliveryapp/core';

import { User, PasswordPayload } from '../models/user';

export function me(): Promise<{ data: User }> {
  return apiClient.get('/users/self');
}

export function updateProfile(profile: Partial<User>): Promise<{ data: User }> {
  return apiClient.patch('/users/self', profile);
}

export function updatePassword(
  passwordPayload: PasswordPayload
): Promise<void> {
  return apiClient.patch('/users/self/password', passwordPayload);
}
