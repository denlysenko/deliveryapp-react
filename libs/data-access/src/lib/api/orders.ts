import { apiClient } from '@deliveryapp/core';

import { Order } from '../models/order';

export function createOrderSelf(order: Order): Promise<{ data: Order }> {
  return apiClient.post('/users/self/orders', order);
}
