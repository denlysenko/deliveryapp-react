import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import {
  AuthProvider,
  usersClient,
  UsersProvider
} from '@deliveryapp/data-access';
import { user } from '@deliveryapp/testing';

import { Users } from '../Users';

describe('Users', () => {
  beforeEach(() => {
    jest.spyOn(usersClient, 'getUsers').mockResolvedValue({
      data: { rows: [user], count: 1 }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(
      <AuthProvider>
        <UsersProvider>
          <Users />
        </UsersProvider>
      </AuthProvider>
    );
    await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

    expect(baseElement).toBeTruthy();
  });

  describe('selectUser', () => {
    beforeEach(() => {
      jest.spyOn(usersClient, 'getUser').mockResolvedValue({
        data: user
      });
    });

    it('should get user by id', async () => {
      const { container } = render(
        <AuthProvider>
          <UsersProvider>
            <Users />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      fireEvent.click(container.querySelectorAll('.p-datatable-row')[0]);

      await waitFor(() => {
        expect(usersClient.getUser).toBeCalledTimes(1);
      });

      expect(usersClient.getUser).toBeCalledWith(1);
      expect(screen.getByTestId('id')).toHaveValue(user.id.toString());
    });

    it('should reset user form', async () => {
      const { container } = render(
        <AuthProvider>
          <UsersProvider>
            <Users />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      fireEvent.click(container.querySelectorAll('.p-datatable-row')[0]);

      await waitFor(() => {
        expect(usersClient.getUser).toBeCalledTimes(1);
      });

      expect(screen.getByTestId('id')).toHaveValue(user.id.toString());

      fireEvent.click(screen.getByRole('button', { name: 'Create user' }));

      expect(screen.getByTestId('id')).toHaveValue('');
    });
  });
});
