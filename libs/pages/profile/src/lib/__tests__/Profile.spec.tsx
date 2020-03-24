import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';

import { ERRORS, Roles } from '@deliveryapp/common';
import { AuthProvider, usersClient, useAuth } from '@deliveryapp/data-access';
import { user } from '@deliveryapp/testing';

import { Profile } from '../Profile';

jest.mock('@deliveryapp/data-access', () => ({
  ...require.requireActual('@deliveryapp/data-access'),
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
    cleanup();
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
        const { getByTestId, container } = render(
          <AuthProvider>
            <Profile />
          </AuthProvider>
        );

        fireEvent.change(getByTestId('email'), {
          target: {
            value: ''
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('profile-form'));
        });

        expect(container.querySelector('#email-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });

      it('should display email error', async () => {
        const { getByTestId, container } = render(
          <AuthProvider>
            <Profile />
          </AuthProvider>
        );

        fireEvent.change(getByTestId('email'), {
          target: {
            value: 'test'
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('profile-form'));
        });

        expect(container.querySelector('#email-error')).toHaveTextContent(
          ERRORS.INVALID_EMAIL
        );
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(
          <AuthProvider>
            <Profile />
          </AuthProvider>
        );

        await wait(() => {
          fireEvent.submit(getByTestId('profile-form'));
        });

        expect(container.querySelector('#email-error')).not.toBeInTheDocument();
      });
    });
  });

  describe('Submitting', () => {
    it('should be successful', async () => {
      const firstName = 'John';
      const lastName = 'Doe';
      const country = 'Ukraine';
      const name = 'The Bank';

      const { getByTestId } = render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );

      fireEvent.change(getByTestId('firstName'), {
        target: {
          value: 'John'
        }
      });

      fireEvent.change(getByTestId('lastName'), {
        target: {
          value: 'Doe'
        }
      });

      fireEvent.change(getByTestId('country'), {
        target: {
          value: 'Ukraine'
        }
      });

      fireEvent.change(getByTestId('name'), {
        target: {
          value: 'The Bank'
        }
      });

      await wait(() => {
        fireEvent.submit(getByTestId('profile-form'));
      });

      const { id, role, ...rest } = user;

      expect(usersClient.updateProfile).toBeCalledTimes(1);
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

    it('should have error', async () => {
      const error = {
        errors: [{ path: 'email', message: 'Error' }]
      };

      jest.spyOn(usersClient, 'updateProfile').mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: error
          }
        })
      );

      const { getByTestId, container } = render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );

      await wait(() => {
        fireEvent.submit(getByTestId('profile-form'));
      });

      expect(container.querySelector('#email-error')).toHaveTextContent(
        error.errors[0].message
      );
    });
  });
});
