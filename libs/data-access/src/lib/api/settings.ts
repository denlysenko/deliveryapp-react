import { apiClient } from '@deliveryapp/core';

import { Address } from '../models/address';
import { BankDetails } from '../models/bank-details';

export function getAddress(): Promise<{ data: Address }> {
  return apiClient.get('/settings/address');
}

export function getBankDetails(): Promise<{ data: BankDetails }> {
  return apiClient.get('/settings/bank-details');
}

export function createAddress(
  address: Address
): Promise<{ data: { id: number } }> {
  return apiClient.post('/settings/address', address);
}

export function createBankDetails(
  bankDetails: BankDetails
): Promise<{ data: { id: number } }> {
  return apiClient.post('/settings/bank-details', bankDetails);
}

export function updateAddress(
  id: number,
  address: Address
): Promise<{ data: { id: number } }> {
  return apiClient.patch(`/settings/address/${id}`, address);
}

export function updateBankDetails(
  id: number,
  bankDetails: BankDetails
): Promise<{ data: { id: number } }> {
  return apiClient.patch(`/settings/bank-details/${id}`, bankDetails);
}
