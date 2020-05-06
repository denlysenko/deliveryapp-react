import { apiClient } from '@deliveryapp/core';

import { Order, CreateOrderDTO, UpdateOrderDTO } from '../models/order';
import { ListResponse } from '../models/list-response';
import { OrdersFilter } from '../models/orders-filter';

export function createOrder(
  order: CreateOrderDTO
): Promise<{ data: { id: number } }> {
  return apiClient.post('/orders', order);
}

export function getOrders(
  query: OrdersFilter
): Promise<{ data: ListResponse<Order> }> {
  return apiClient.get('/orders', query);
}

export function getOrder(id: number): Promise<{ data: Order }> {
  return apiClient.get(`/orders/${id}`);
}

export function updateOrder(
  id: number,
  order: UpdateOrderDTO
): Promise<{ data: { id: number } }> {
  return apiClient.patch(`/orders/${id}`, order);
}
