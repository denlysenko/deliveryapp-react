import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DEFAULT_LIMIT, Roles } from '@deliveryapp/common';
import {
  AuthProvider,
  User,
  usersClient,
  UsersProvider
} from '@deliveryapp/data-access';
import { user } from '@deliveryapp/testing';

import { UsersList } from '../UsersList/UsersList';

const users: User[] = [];

for (let i = 0; i < 12; i++) {
  users.push({ ...user, id: i + 1 });
}

describe('UsersList', () => {
  beforeEach(() => {
    jest.spyOn(usersClient, 'getUsers').mockResolvedValue({
      data: { rows: users, count: 11 }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(
      <AuthProvider>
        <UsersProvider>
          <UsersList />
        </UsersProvider>
      </AuthProvider>
    );
    await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));
    expect(baseElement).toBeTruthy();
  });

  it('should get users with default filter', async () => {
    render(
      <AuthProvider>
        <UsersProvider>
          <UsersList />
        </UsersProvider>
      </AuthProvider>
    );

    await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

    expect(usersClient.getUsers).toBeCalledWith({
      filter: {
        role: [Roles.MANAGER, Roles.ADMIN]
      },
      limit: DEFAULT_LIMIT,
      offset: 0,
      order: {
        id: 'desc'
      }
    });
  });

  describe('filtering', () => {
    it('should filter users', async () => {
      render(
        <AuthProvider>
          <UsersProvider>
            <UsersList />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.change(screen.getByPlaceholderText(/search/i), {
        target: {
          value: '2'
        }
      });

      await waitFor(() => {
        expect(usersClient.getUsers).toBeCalledWith({
          filter: {
            id: '2',
            role: [Roles.MANAGER, Roles.ADMIN]
          },
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            id: 'desc'
          }
        });
      });
    });
  });

  describe('sorting', () => {
    it('should sort users by id', async () => {
      render(
        <AuthProvider>
          <UsersProvider>
            <UsersList />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('ID', { selector: '.p-column-title' }));

      await waitFor(() => {
        expect(usersClient.getUsers).toBeCalledWith({
          filter: {
            role: [Roles.MANAGER, Roles.ADMIN]
          },
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            id: 'asc'
          }
        });
      });
    });

    it('should sort users by email', async () => {
      render(
        <AuthProvider>
          <UsersProvider>
            <UsersList />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(
        screen.getByText('Email', { selector: '.p-column-title' })
      );

      await waitFor(() => {
        expect(usersClient.getUsers).toBeCalledWith({
          filter: {
            role: [Roles.MANAGER, Roles.ADMIN]
          },
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            email: 'asc'
          }
        });
      });
    });

    it('should sort users by firstName', async () => {
      render(
        <AuthProvider>
          <UsersProvider>
            <UsersList />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(
        screen.getByText('First Name', { selector: '.p-column-title' })
      );

      await waitFor(() => {
        expect(usersClient.getUsers).toBeCalledWith({
          filter: {
            role: [Roles.MANAGER, Roles.ADMIN]
          },
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            firstName: 'asc'
          }
        });
      });
    });

    it('should sort users by lastName', async () => {
      render(
        <AuthProvider>
          <UsersProvider>
            <UsersList />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(
        screen.getByText('Last Name', { selector: '.p-column-title' })
      );

      await waitFor(() => {
        expect(usersClient.getUsers).toBeCalledWith({
          filter: {
            role: [Roles.MANAGER, Roles.ADMIN]
          },
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            lastName: 'asc'
          }
        });
      });
    });

    it('should sort users by createdAt', async () => {
      render(
        <AuthProvider>
          <UsersProvider>
            <UsersList />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('Created At'));

      await waitFor(() => {
        expect(usersClient.getUsers).toBeCalledWith({
          filter: {
            role: [Roles.MANAGER, Roles.ADMIN]
          },
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            createdAt: 'asc'
          }
        });
      });
    });
  });

  describe('pagination', () => {
    it('should paginate users', async () => {
      render(
        <AuthProvider>
          <UsersProvider>
            <UsersList />
          </UsersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(usersClient.getUsers).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('2', { selector: '.p-paginator-page' }));

      await waitFor(() => {
        expect(usersClient.getUsers).toBeCalledWith({
          filter: {
            role: [Roles.MANAGER, Roles.ADMIN]
          },
          limit: DEFAULT_LIMIT,
          offset: 10,
          order: {
            id: 'desc'
          }
        });
      });
    });
  });
});
