import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import { ERRORS, Roles } from '@deliveryapp/common';
import { AuthProvider, usersClient, useAuth } from '@deliveryapp/data-access';
import { user } from '@deliveryapp/testing';

import { Profile } from '../Profile';

jest.mock('@deliveryapp/data-access', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...jest.requireActual<any>('@deliveryapp/data-access'),
  useAuth: jest.fn().mockImplementation(() => [{ user }, jest.fn()])
}));

describe('Profile page', () => {
  beforeEach(() => {
    jest
      .spyOn(usersClient, 'updateProfile')
      .mockImplementation(() => Promise.resolve({ data: user }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should not render address & bankDetails', () => {
    (useAuth as jest.MockedFunction<
      typeof useAuth
    >).mockImplementationOnce(() => [
      { user: { ...user, role: Roles.ADMIN }, isLoggedIn: true },
      jest.fn()
    ]);

    const { baseElement } = render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  describe('Validations', () => {
    describe('email', () => {
      it('should display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <Profile />
          </AuthProvider>
        );

        fireEvent.change(screen.getByTestId('email'), {
          target: {
            value: ''
          }
        });

        fireEvent.submit(screen.getByTestId('profile-form'));

        await waitFor(() => {
          expect(container.querySelector('#email-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should display email error', async () => {
        const { container } = render(
          <AuthProvider>
            <Profile />
          </AuthProvider>
        );

        fireEvent.change(screen.getByTestId('email'), {
          target: {
            value: 'test'
          }
        });

        fireEvent.submit(screen.getByTestId('profile-form'));

        await waitFor(() => {
          expect(container.querySelector('#email-error')).toHaveTextContent(
            ERRORS.INVALID_EMAIL
          );
        });
      });

      it('should not display any errors', async () => {
        const { container } = render(
          <AuthProvider>
            <Profile />
          </AuthProvider>
        );

        fireEvent.submit(screen.getByTestId('profile-form'));

        await waitFor(() => {
          expect(
            container.querySelector('#email-error')
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Submitting', () => {
    it('should be successful', async () => {
      const firstName = 'John';
      const lastName = 'Doe';
      const country = 'Ukraine';
      const name = 'The Bank';

      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );

      fireEvent.change(screen.getByTestId('firstName'), {
        target: {
          value: 'John'
        }
      });

      fireEvent.change(screen.getByTestId('lastName'), {
        target: {
          value: 'Doe'
        }
      });

      fireEvent.change(screen.getByTestId('country'), {
        target: {
          value: 'Ukraine'
        }
      });

      fireEvent.change(screen.getByTestId('name'), {
        target: {
          value: 'The Bank'
        }
      });

      fireEvent.submit(screen.getByTestId('profile-form'));

      const { id, role, createdAt, ...rest } = user;

      await waitFor(() => {
        expect(usersClient.updateProfile).toBeCalledTimes(1);
      });

      expect(usersClient.updateProfile).toBeCalledWith({
        ...rest,
        firstName,
        lastName,
        address: {
          city: '',
          country,
          house: '',
          street: ''
        },
        bankDetails: {
          accountNumber: '',
          bin: '',
          name,
          swift: ''
        }
      });
    });

    it('should have API error', async () => {
      const error = {
        errors: [{ path: 'email', message: ['Error'] }]
      };

      jest.spyOn(usersClient, 'updateProfile').mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: error
          }
        })
      );

      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );

      fireEvent.submit(screen.getByTestId('profile-form'));

      expect(
        await screen.findByText(error.errors[0].message[0])
      ).toBeInTheDocument();

      fireEvent.change(screen.getByTestId('email'), {
        target: {
          value: 'fixed@test.com'
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
