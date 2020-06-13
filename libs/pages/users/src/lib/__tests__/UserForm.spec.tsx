import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ERRORS, Roles } from '@deliveryapp/common';
import {
  AuthProvider,
  usersClient,
  UsersProvider
} from '@deliveryapp/data-access';
import { user } from '@deliveryapp/testing';

import { UserForm } from '../UserForm/UserForm';

describe('UserForm', () => {
  beforeEach(() => {
    jest
      .spyOn(usersClient, 'createUser')
      .mockImplementation(() => Promise.resolve({ data: { id: user.id } }));

    jest
      .spyOn(usersClient, 'updateUser')
      .mockImplementation(() => Promise.resolve({ data: { id: user.id } }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <UsersProvider>
          <UserForm />
        </UsersProvider>
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  describe('Validations', () => {
    describe('email', () => {
      it('should display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <UsersProvider>
              <UserForm />
            </UsersProvider>
          </AuthProvider>
        );

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(container.querySelector('#email-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should display email error', async () => {
        const { container } = render(
          <AuthProvider>
            <UsersProvider>
              <UserForm />
            </UsersProvider>
          </AuthProvider>
        );

        fireEvent.change(screen.getByTestId('email'), {
          target: {
            value: 'test'
          }
        });

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(container.querySelector('#email-error')).toHaveTextContent(
            ERRORS.INVALID_EMAIL
          );
        });
      });

      it('should not display any errors', async () => {
        const { container } = render(
          <AuthProvider>
            <UsersProvider>
              <UserForm />
            </UsersProvider>
          </AuthProvider>
        );

        fireEvent.change(screen.getByTestId('email'), {
          target: {
            value: 'test@test.com'
          }
        });

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(
            container.querySelector('#email-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('password', () => {
      it('should display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <UsersProvider>
              <UserForm />
            </UsersProvider>
          </AuthProvider>
        );

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(container.querySelector('#password-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should not display any errors', async () => {
        const { container } = render(
          <AuthProvider>
            <UsersProvider>
              <UserForm />
            </UsersProvider>
          </AuthProvider>
        );

        fireEvent.change(screen.getByTestId('password'), {
          target: {
            value: 'password'
          }
        });

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(
            container.querySelector('#password-error')
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Submitting', () => {
    it('should create successfully', async () => {
      render(
        <AuthProvider>
          <UsersProvider>
            <UserForm />
          </UsersProvider>
        </AuthProvider>
      );

      fireEvent.change(screen.getByTestId('email'), {
        target: {
          value: 'test@test.com'
        }
      });

      fireEvent.change(screen.getByTestId('password'), {
        target: {
          value: 'password'
        }
      });

      fireEvent.submit(screen.getByTestId('save'));

      await waitFor(() => {
        expect(usersClient.createUser).toBeCalledTimes(1);
      });

      expect(usersClient.createUser).toBeCalledWith({
        email: 'test@test.com',
        firstName: null,
        lastName: null,
        password: 'password',
        phone: null,
        role: Roles.MANAGER
      });
    });

    it('should update successfully', async () => {
      const useUsersSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .spyOn(require('@deliveryapp/data-access'), 'useUsers')
        .mockImplementation(() => [{ selectedUser: 1 }, jest.fn()]);

      const getUserSpy = jest
        .spyOn(usersClient, 'getUser')
        .mockImplementation(() =>
          Promise.resolve({
            data: {
              id: user.id,
              email: user.email
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any)
        );

      render(
        <AuthProvider>
          <UsersProvider>
            <UserForm />
          </UsersProvider>
        </AuthProvider>
      );

      await waitFor(() => {
        expect(usersClient.getUser).toBeCalledTimes(1);
      });

      fireEvent.submit(screen.getByTestId('save'));

      await waitFor(() => {
        expect(usersClient.updateUser).toBeCalledTimes(1);
      });

      expect(usersClient.updateUser).toBeCalledWith(user.id, {
        email: 'test@test.com'
      });

      useUsersSpy.mockRestore();
      getUserSpy.mockRestore();
    });

    it('should have API error', async () => {
      const error = {
        errors: [{ path: 'email', message: ['Error'] }]
      };

      jest.spyOn(usersClient, 'createUser').mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: error
          }
        })
      );

      render(
        <AuthProvider>
          <UsersProvider>
            <UserForm />
          </UsersProvider>
        </AuthProvider>
      );

      fireEvent.change(screen.getByTestId('email'), {
        target: {
          value: 'test@test.com'
        }
      });

      fireEvent.change(screen.getByTestId('password'), {
        target: {
          value: 'password'
        }
      });

      fireEvent.submit(screen.getByTestId('save'));

      await waitFor(() => {
        expect(usersClient.createUser).toBeCalledTimes(1);
      });

      expect(
        await screen.findByText(error.errors[0].message[0])
      ).toBeInTheDocument();

      // should not allow to submit while error is not fixed
      jest.clearAllMocks();

      fireEvent.submit(screen.getByTestId('save'));

      await waitFor(() => {
        expect(usersClient.createUser).toBeCalledTimes(0);
      });

      fireEvent.change(screen.getByTestId('email'), {
        target: {
          value: 'test2@test.com'
        }
      });

      await waitFor(() => {
        expect(
          screen.queryByText(error.errors[0].message[0])
        ).not.toBeInTheDocument();
      });
    });
  });
});
