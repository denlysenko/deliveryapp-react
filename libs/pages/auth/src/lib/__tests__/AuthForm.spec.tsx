/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { ERRORS } from '@deliveryapp/common';
import { ValidationError } from '@deliveryapp/data-access';

import { AuthForm } from '../AuthForm/AuthForm';

const email = 'test@test.com';
const password = 'password';

const props = {
  isLoggingIn: true,
  loading: false,
  error: null,
  onFormSubmit: jest.fn()
};

describe('AuthForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Login', () => {
    it('should render login form', () => {
      const { baseElement } = render(<AuthForm {...props} />);
      expect(baseElement).toMatchSnapshot();
    });

    it('should have Login label on submit button', () => {
      render(<AuthForm {...props} />);
      expect(
        screen.getByRole('button', { name: /login/i })
      ).toBeInTheDocument();
    });

    it('should show error message when error prop passed', async () => {
      const { rerender } = render(<AuthForm {...props} />);

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

      fireEvent.click(screen.getByTestId('submit'));

      const errorMessage = 'Error message';

      rerender(<AuthForm {...props} error={{ message: errorMessage }} />);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
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
      render(<AuthForm {...props} isLoggingIn={false} />);
      expect(
        screen.getByRole('button', { name: /register/i })
      ).toBeInTheDocument();
    });

    it('should show error messages when error prop passed and hide when input values were changed', async () => {
      const emailErrorMessage = 'Email error';
      const passwordErrorMessage = 'Password error';

      const error = {
        errors: [
          { path: 'email', message: [emailErrorMessage] },
          { path: 'password', message: [passwordErrorMessage] }
        ]
      } as ValidationError;

      render(<AuthForm {...props} isLoggingIn={false} error={error} />);

      expect(screen.getByText(emailErrorMessage)).toBeInTheDocument();
      expect(screen.getByText(passwordErrorMessage)).toBeInTheDocument();

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

      await waitFor(() =>
        expect(screen.queryByText(emailErrorMessage)).not.toBeInTheDocument()
      );

      expect(screen.queryByText(passwordErrorMessage)).not.toBeInTheDocument();
    });
  });

  describe('Validations', () => {
    describe('email', () => {
      it('should display required error', async () => {
        const { container } = render(<AuthForm {...props} />);

        fireEvent.click(screen.getByTestId('submit'));

        await waitFor(() => {
          expect(container.querySelector('#email-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should display invalid email error', async () => {
        const { container } = render(<AuthForm {...props} />);

        fireEvent.change(screen.getByTestId('email'), {
          target: {
            value: 'test'
          }
        });

        fireEvent.click(screen.getByTestId('submit'));

        await waitFor(() => {
          expect(container.querySelector('#email-error')).toHaveTextContent(
            ERRORS.INVALID_EMAIL
          );
        });
      });

      it('should not display any errors', async () => {
        const { container } = render(<AuthForm {...props} />);

        fireEvent.change(screen.getByTestId('email'), {
          target: {
            value: email
          }
        });

        fireEvent.click(screen.getByTestId('submit'));

        await waitFor(() => {
          expect(
            container.querySelector('#email-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('password', () => {
      it('should display required error', async () => {
        const { container } = render(<AuthForm {...props} />);

        fireEvent.click(screen.getByTestId('submit'));

        await waitFor(() => {
          expect(container.querySelector('#password-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should not display any errors', async () => {
        const { container } = render(<AuthForm {...props} />);

        fireEvent.change(screen.getByTestId('password'), {
          target: {
            value: password
          }
        });

        fireEvent.click(screen.getByTestId('submit'));

        await waitFor(() => {
          expect(
            container.querySelector('#password-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    it('should reset errors when isLogginIn prop has changed', async () => {
      const { container, rerender } = render(<AuthForm {...props} />);

      fireEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(container.querySelector('#email-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });

      rerender(<AuthForm {...props} isLoggingIn={false} />);

      expect(container.querySelector('#email-error')).not.toBeInTheDocument();
    });
  });

  describe('Submitting', () => {
    it('should call onFormSubmit prop', async () => {
      render(<AuthForm {...props} />);

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

      fireEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(props.onFormSubmit).toBeCalledTimes(1);
      });

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
      render(<AuthForm {...props} loading={true} />);
      expect(screen.getByTestId('submit')).toBeDisabled();
    });
  });
});
