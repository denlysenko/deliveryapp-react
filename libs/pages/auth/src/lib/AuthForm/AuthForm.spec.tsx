import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  queryByAttribute,
  wait
} from '@testing-library/react';

import { ERRORS } from '@deliveryapp/common';
import { ValidationError } from '@deliveryapp/data-access';

import { AuthForm } from './AuthForm';

const email = 'test@test.com';
const password = 'password';

const props = {
  isLoggingIn: true,
  loading: false,
  error: null,
  onFormSubmit: jest.fn()
};

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('AuthForm', () => {
  describe('Login', () => {
    it('should render login form', () => {
      const { baseElement } = render(<AuthForm {...props} />);
      expect(baseElement).toMatchSnapshot();
    });

    it('should have Login label on submit button', () => {
      const { getByTestId } = render(<AuthForm {...props} />);
      expect(getByTestId('submit')).toHaveTextContent('Login');
    });

    it('should show error message when error prop passed', async () => {
      const { container, rerender, getByTestId } = render(
        <AuthForm {...props} />
      );

      await wait(() => {
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
      });

      const errorMessage = 'Error message';

      rerender(<AuthForm {...props} error={{ message: errorMessage }} />);

      await wait(() =>
        expect(
          queryByAttribute('id', container, 'error-message')
        ).toHaveTextContent(errorMessage)
      );
    });
  });

  describe('Register', () => {
    it('should render register form', () => {
      const { baseElement } = render(
        <AuthForm {...props} isLoggingIn={false} />
      );
      expect(baseElement).toMatchSnapshot();
    });

    it('should have Register label on submit button', () => {
      const { getByTestId } = render(
        <AuthForm {...props} isLoggingIn={false} />
      );
      expect(getByTestId('submit')).toHaveTextContent('Register');
    });

    it('should show error messages when error prop passed', async () => {
      const emailErrorMessage = 'Email error';
      const passwordErrorMessage = 'Password error';

      const error = {
        errors: [
          { path: 'email', message: emailErrorMessage },
          { path: 'password', message: passwordErrorMessage }
        ]
      } as ValidationError;

      const { container, getByTestId, rerender } = render(
        <AuthForm {...props} isLoggingIn={false} />
      );

      await wait(() => {
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
      });

      rerender(<AuthForm {...props} isLoggingIn={false} error={error} />);

      await wait(() => {
        expect(
          queryByAttribute('id', container, 'email-error')
        ).toHaveTextContent(emailErrorMessage);
        expect(
          queryByAttribute('id', container, 'password-error')
        ).toHaveTextContent(passwordErrorMessage);
      });
    });
  });

  describe('Validations', () => {
    describe('email', () => {
      it('should display required error', async () => {
        const { getByTestId, container } = render(<AuthForm {...props} />);

        fireEvent.click(getByTestId('submit'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'email-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should display invalid email error', async () => {
        const { getByTestId, container } = render(<AuthForm {...props} />);

        fireEvent.change(getByTestId('email'), {
          target: {
            value: 'test'
          }
        });

        fireEvent.click(getByTestId('submit'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'email-error')
          ).toHaveTextContent(ERRORS.INVALID_EMAIL);
        });
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(<AuthForm {...props} />);

        fireEvent.change(getByTestId('email'), {
          target: {
            value: email
          }
        });

        fireEvent.click(getByTestId('submit'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'email-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('password', () => {
      it('should display required error', async () => {
        const { getByTestId, container } = render(<AuthForm {...props} />);

        fireEvent.click(getByTestId('submit'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'password-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(<AuthForm {...props} />);

        fireEvent.change(getByTestId('password'), {
          target: {
            value: password
          }
        });

        fireEvent.click(getByTestId('submit'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'password-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    it('should reset errors when isLogginIn prop has changed', async () => {
      const { getByTestId, container, rerender } = render(
        <AuthForm {...props} />
      );

      fireEvent.click(getByTestId('submit'));

      await wait(() => {
        expect(
          queryByAttribute('id', container, 'email-error')
        ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
      });

      rerender(<AuthForm {...props} isLoggingIn={false} />);

      await wait(() => {
        expect(
          queryByAttribute('id', container, 'email-error')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Submitting', () => {
    it('should call onFormSubmit prop', async () => {
      const { getByTestId } = render(<AuthForm {...props} />);

      await wait(() => {
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
      });

      expect(props.onFormSubmit).toBeCalledTimes(1);
      expect(props.onFormSubmit).toBeCalledWith({
        email,
        password,
        company: '',
        firstName: '',
        lastName: '',
        phone: ''
      });
    });

    it('should disable button when loading prop passed', async () => {
      const { getByTestId } = render(<AuthForm {...props} loading={true} />);
      expect(getByTestId('submit')).toBeDisabled();
    });
  });
});
