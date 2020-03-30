import { apiClient } from '@deliveryapp/core';

import { Order, CreateOrderDTO, UpdateOrderDTO } from '../models/order';
import { ListResponse } from '../models/list-response';
import { OrdersFilter } from '../models/orders-filter';

export function createOrderSelf(
  order: CreateOrderDTO
): Promise<{ data: Order }> {
  return apiClient.post('/users/self/orders', order);
}

export function getOrdersSelf(
  query: OrdersFilter
): Promise<{ data: ListResponse<Order> }> {
  return apiClient.get('/users/self/orders', query);
}

export function updateOrderSelf(
  id: number,
  order: UpdateOrderDTO
): Promise<{ data: Order }> {
  return apiClient.patch(`/users/self/orders/${id}`, order);
}
