import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ACCESS_TOKEN } from '@deliveryapp/common';
import { apiClient } from '@deliveryapp/core';
import { authClient } from '@deliveryapp/data-access';
import { authPayload, useHistoryMock } from '@deliveryapp/testing';

import { Auth } from '../Auth';

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    setAuthHeader: jest.fn(),
    post: jest.fn().mockResolvedValue({})
  },
  fcmMessaging: {
    getToken: jest.fn().mockResolvedValue('socketId'),
    messaging: {
      deleteToken: jest.fn().mockResolvedValue({})
    },
    unsubscribe: jest.fn()
  }
}));

const email = 'test@test.com';
const password = 'password';
const socketId = 'socketId';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function MockNotification() {}

MockNotification.requestPermission = jest.fn().mockResolvedValue('granted');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).Notification = MockNotification;

const fillForm = () => {
  fireEvent.change(screen.getByTestId('email'), {
    target: {
      value: email
    }
  });

  fireEvent.change(screen.getByTestId('password'), {
    target: {
      value: password
    }
  });
};

jest.mock('react-router-dom', () => ({
  useHistory: () => useHistoryMock
}));

describe('Auth Page', () => {
  beforeEach(() => {
    jest.spyOn(authClient, 'login').mockResolvedValue({ data: authPayload });
    jest.spyOn(authClient, 'register').mockResolvedValue({ data: authPayload });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Login', () => {
    it('should render login form', () => {
      const { baseElement } = render(<Auth />);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render correct title', () => {
      render(<Auth />);
      expect(screen.getByTestId('title')).toHaveTextContent('Login');
    });

    it('should render correct toggler', () => {
      render(<Auth />);
      expect(screen.getByTestId('mode-toggler')).toHaveTextContent('Register');
    });
  });

  describe('Register', () => {
    it('should render register form', () => {
      const { baseElement } = render(<Auth />);
      fireEvent.click(screen.getByTestId('mode-toggler'));
      expect(baseElement).toMatchSnapshot();
    });

    it('should render correct title', () => {
      render(<Auth />);
      fireEvent.click(screen.getByTestId('mode-toggler'));
      expect(screen.getByTestId('title')).toHaveTextContent('Register');
    });

    it('should render correct toggler', () => {
      render(<Auth />);
      fireEvent.click(screen.getByTestId('mode-toggler'));
      expect(screen.getByTestId('mode-toggler')).toHaveTextContent('Login');
    });
  });

  describe('Submitting', () => {
    it('should login', async () => {
      render(<Auth />);

      fillForm();

      fireEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(authClient.login).toBeCalledTimes(1);
      });

      expect(authClient.login).toBeCalledWith({ email, password });
    });

    it('should register', async () => {
      render(<Auth />);

      fireEvent.click(screen.getByTestId('mode-toggler'));

      fillForm();

      fireEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(authClient.register).toBeCalledTimes(1);
      });

      expect(authClient.register).toBeCalledWith({
        email,
        password,
        company: '',
        phone: '',
        firstName: '',
        lastName: ''
      });
    });

    it('should save token to localStorage', async () => {
      const localStorageSpy = jest.spyOn(
        window.localStorage.__proto__,
        'setItem'
      );

      render(<Auth />);

      fillForm();

      fireEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(localStorageSpy).toBeCalledTimes(1);
      });

      expect(localStorageSpy).toBeCalledWith(ACCESS_TOKEN, authPayload.token);
    });

    it('should set auth header and subscribe to notifications', async () => {
      render(<Auth />);

      fillForm();

      fireEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(apiClient.setAuthHeader).toBeCalledTimes(1);
      });

      expect(apiClient.post).toBeCalledWith('/messages/subscribe', {
        socketId
      });
    });

    it('should redirect to /', async () => {
      render(<Auth />);

      fillForm();

      fireEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(useHistoryMock.push).toBeCalledTimes(1);
      });

      expect(useHistoryMock.push).toBeCalledWith('/');
    });

    it('should show server errors', async () => {
      const errorMessage = 'Error message';

      jest.spyOn(authClient, 'login').mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              message: errorMessage
            }
          }
        })
      );

      render(<Auth />);

      fillForm();

      fireEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
});
