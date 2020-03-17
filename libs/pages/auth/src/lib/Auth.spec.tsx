import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  wait,
  queryByAttribute,
  Matcher,
  MatcherOptions
} from '@testing-library/react';

import { authPayload, useHistoryMock } from '@deliveryapp/testing';
import { ACCESS_TOKEN } from '@deliveryapp/common';
import { login, register } from '@deliveryapp/data-access';

import { Auth } from './Auth';

type GetByTestId = (
  text: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement;

const email = 'test@test.com';
const password = 'password';

const fillFormAndSubmit = (getByTestId: GetByTestId) => {
  fireEvent.change(getByTestId('email'), {
    target: {
      value: email
    }
  });

  fireEvent.change(getByTestId('password'), {
    target: {
      value: password
    }
  });

  fireEvent.click(getByTestId('submit'));
};

jest.mock('react-router-dom', () => ({
  useHistory: () => useHistoryMock
}));

jest.mock('@deliveryapp/data-access', () => ({
  login: jest.fn().mockResolvedValue({ data: authPayload }),
  register: jest.fn().mockResolvedValue({ data: authPayload })
}));

describe('Auth Page', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('Login', () => {
    it('should render login form', () => {
      const { baseElement } = render(<Auth />);
      expect(baseElement).toMatchSnapshot();
    });

    it('should render correct title', () => {
      const { getByTestId } = render(<Auth />);
      expect(getByTestId('title')).toHaveTextContent('Login');
    });

    it('should render correct toggler', () => {
      const { getByTestId } = render(<Auth />);
      expect(getByTestId('mode-toggler')).toHaveTextContent('Register');
    });
  });

  describe('Register', () => {
    it('should render register form', () => {
      const { baseElement, getByTestId } = render(<Auth />);
      fireEvent.click(getByTestId('mode-toggler'));
      expect(baseElement).toMatchSnapshot();
    });

    it('should render correct title', () => {
      const { getByTestId } = render(<Auth />);
      fireEvent.click(getByTestId('mode-toggler'));
      expect(getByTestId('title')).toHaveTextContent('Register');
    });

    it('should render correct toggler', () => {
      const { getByTestId } = render(<Auth />);
      fireEvent.click(getByTestId('mode-toggler'));
      expect(getByTestId('mode-toggler')).toHaveTextContent('Login');
    });
  });

  describe('Submitting', () => {
    it('should login', async () => {
      const { getByTestId } = render(<Auth />);

      await wait(() => {
        fillFormAndSubmit(getByTestId);
      });

      expect(login).toBeCalledTimes(1);
      expect(login).toBeCalledWith({ email, password });
    });

    it('should register', async () => {
      const { getByTestId } = render(<Auth />);

      fireEvent.click(getByTestId('mode-toggler'));

      await wait(() => {
        fillFormAndSubmit(getByTestId);
      });

      expect(register).toBeCalledTimes(1);
      expect(register).toBeCalledWith({
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

      const { getByTestId } = render(<Auth />);

      await wait(() => {
        fillFormAndSubmit(getByTestId);
      });

      expect(localStorageSpy).toBeCalledTimes(1);
      expect(localStorageSpy).toBeCalledWith(ACCESS_TOKEN, authPayload.token);
    });

    it('should redirect to /', async () => {
      const { getByTestId } = render(<Auth />);

      await wait(() => {
        fillFormAndSubmit(getByTestId);
      });

      expect(useHistoryMock.push).toBeCalledTimes(1);
      expect(useHistoryMock.push).toBeCalledWith('/');
    });

    it('should show server errors', async () => {
      const errorMessage = 'Error message';

      (login as jest.MockedFunction<typeof login>).mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              message: errorMessage
            }
          }
        })
      );

      const { getByTestId, container } = render(<Auth />);

      await wait(() => {
        fillFormAndSubmit(getByTestId);
      });

      expect(
        queryByAttribute('id', container, 'error-message')
      ).toHaveTextContent(errorMessage);
    });
  });
});
