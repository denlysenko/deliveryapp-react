import { apiService } from '@deliveryapp/core';

import { User } from '../../models/user';

export function me(): Promise<User> {
  return apiService.get('/users/self');
}
