import { apiService } from '@deliveryapp/core';

import { Order } from '../../models/order';

export function createOrderSelf(order: Order): Promise<{ data: Order }> {
  return apiService.post('/users/self/orders', order);
}
