import { apiClient } from '@deliveryapp/core';

import { BaseFilter } from '../models/base-filter';
import { ListResponse } from '../models/list-response';
import { Message } from '../models/message';

export function loadMessages(
  query: BaseFilter
): Promise<{ data: ListResponse<Message> }> {
  return apiClient.get('/messages', query);
}

export function markAsRead(id: string): Promise<void> {
  return apiClient.patch(`/messages/${id}`, {});
}

export function subscribeToMessages(token: string): Promise<void> {
  return apiClient.post('/messages/subscribe', { socketId: token });
}

export function unsubscribeFromMessages(token: string): Promise<void> {
  return apiClient.post('/messages/unsubscribe', { socketId: token });
}
