import { apiClient } from '@deliveryapp/core';

import { ListResponse } from '../models/list-response';
import { PasswordPayload, User, UserDTO } from '../models/user';
import { UsersFilter } from '../models/users-filter';

export function me(): Promise<{ data: User }> {
  return apiClient.get('/users/self');
}

export function updateProfile(
  profile: Partial<UserDTO>
): Promise<{ data: { id: number } }> {
  return apiClient.patch('/users/self', profile);
}

export function updatePassword(
  passwordPayload: PasswordPayload
): Promise<void> {
  return apiClient.patch('/users/self/password', passwordPayload);
}

export function getUsers(
  query: UsersFilter
): Promise<{ data: ListResponse<User> }> {
  return apiClient.get('/users', query);
}

export function getUser(id: number): Promise<{ data: User }> {
  return apiClient.get(`/users/${id}`);
}

export function createUser(user: UserDTO): Promise<{ data: { id: number } }> {
  return apiClient.post('/users', user);
}

export function updateUser(
  id: number,
  user: Partial<UserDTO>
): Promise<{ data: { id: number } }> {
  return apiClient.patch(`/users/${id}`, user);
}
