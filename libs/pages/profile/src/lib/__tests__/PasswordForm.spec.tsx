import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ERRORS } from '@deliveryapp/common';

import { usersClient } from '@deliveryapp/data-access';
import { PasswordForm } from '../PasswordForm/PasswordForm';

const oldPassword = 'oldPassword';
const newPassword = 'newPassword';

describe('[Profile] PasswordForm', () => {
  beforeEach(() => {
    jest
      .spyOn(usersClient, 'updatePassword')
      .mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render password form', () => {
    const { baseElement } = render(<PasswordForm />);
    expect(baseElement).toMatchSnapshot();
  });

  describe('Validations', () => {
    describe('oldPassword', () => {
      it('should display required error', async () => {
        const { container } = render(<PasswordForm />);

        fireEvent.click(screen.getByTestId('change-password'));

        await waitFor(() => {
          expect(
            container.querySelector('#oldPassword-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should not display any errors', async () => {
        const { container } = render(<PasswordForm />);

        fireEvent.change(screen.getByTestId('oldPassword'), {
          target: {
            value: oldPassword
          }
        });

        fireEvent.click(screen.getByTestId('change-password'));

        await waitFor(() => {
          expect(
            container.querySelector('#oldPassword-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('newPassword', () => {
      it('should display required error', async () => {
        const { container } = render(<PasswordForm />);

        fireEvent.click(screen.getByTestId('change-password'));

        await waitFor(() => {
          expect(
            container.querySelector('#newPassword-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should not display any errors', async () => {
        const { container } = render(<PasswordForm />);

        fireEvent.change(screen.getByTestId('newPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.click(screen.getByTestId('change-password'));

        await waitFor(() => {
          expect(
            container.querySelector('#newPassword-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('confirmPassword', () => {
      it('should display required error', async () => {
        const { container } = render(<PasswordForm />);

        fireEvent.click(screen.getByTestId('change-password'));

        await waitFor(() => {
          expect(
            container.querySelector('#confirmPassword-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should display passwords do not match error', async () => {
        const { container } = render(<PasswordForm />);

        fireEvent.change(screen.getByTestId('newPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.change(screen.getByTestId('confirmPassword'), {
          target: {
            value: 'wrong'
          }
        });

        fireEvent.click(screen.getByTestId('change-password'));

        await waitFor(() => {
          expect(
            container.querySelector('#confirmPassword-error')
          ).toHaveTextContent(ERRORS.PASSWORDS_DO_NOT_MATCH);
        });
      });

      it('should not display any errors', async () => {
        const { container } = render(<PasswordForm />);

        fireEvent.change(screen.getByTestId('newPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.change(screen.getByTestId('confirmPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.click(screen.getByTestId('change-password'));

        await waitFor(() => {
          expect(
            container.querySelector('#confirmPassword-error')
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Submitting', () => {
    it('should be successful', async () => {
      render(<PasswordForm />);

      fireEvent.change(screen.getByTestId('oldPassword'), {
        target: {
          value: oldPassword
        }
      });

      fireEvent.change(screen.getByTestId('newPassword'), {
        target: {
          value: newPassword
        }
      });

      fireEvent.change(screen.getByTestId('confirmPassword'), {
        target: {
          value: newPassword
        }
      });

      fireEvent.click(screen.getByTestId('change-password'));

      await waitFor(() => {
        expect(usersClient.updatePassword).toBeCalledTimes(1);
      });

      expect(usersClient.updatePassword).toBeCalledWith({
        oldPassword,
        newPassword
      });
    });

    it('should have error', async () => {
      const error = {
        errors: [{ path: 'oldPassword', message: ['Error'] }]
      };

      jest.spyOn(usersClient, 'updatePassword').mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: error
          }
        })
      );

      render(<PasswordForm />);

      fireEvent.change(screen.getByTestId('oldPassword'), {
        target: {
          value: oldPassword
        }
      });

      fireEvent.change(screen.getByTestId('newPassword'), {
        target: {
          value: newPassword
        }
      });

      fireEvent.change(screen.getByTestId('confirmPassword'), {
        target: {
          value: newPassword
        }
      });

      fireEvent.click(screen.getByTestId('change-password'));

      expect(
        await screen.findByText(error.errors[0].message[0])
      ).toBeInTheDocument();

      fireEvent.change(screen.getByTestId('oldPassword'), {
        target: {
          value: 'fixed'
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
