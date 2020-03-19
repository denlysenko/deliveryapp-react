import { apiService } from '@deliveryapp/core';

import { User, PasswordPayload } from '../../models/user';

export function me(): Promise<{ data: User }> {
  return apiService.get('/users/self');
}

export function updateProfile(profile: Partial<User>): Promise<{ data: User }> {
  return apiService.patch('/users/self', profile);
}

export function updatePassword(
  passwordPayload: PasswordPayload
): Promise<void> {
  return apiService.patch('/users/self/password', passwordPayload);
}
