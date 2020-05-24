import { apiClient } from '@deliveryapp/core';

import { ListResponse } from '../models/list-response';
import { Payment, PaymentDTO } from '../models/payment';
import { PaymentsFilter } from '../models/payments-filter';

export function createPayment(
  payment: PaymentDTO
): Promise<{ data: { id: number } }> {
  return apiClient.post('/payments', payment);
}

export function getPayments(
  query: PaymentsFilter
): Promise<{ data: ListResponse<Payment> }> {
  return apiClient.get('/payments', query);
}

export function getPayment(id: number): Promise<{ data: Payment }> {
  return apiClient.get(`/payments/${id}`);
}

export function updatePayment(
  id: number,
  payment: Partial<PaymentDTO>
): Promise<{ data: { id: number } }> {
  return apiClient.patch(`/payments/${id}`, payment);
}
