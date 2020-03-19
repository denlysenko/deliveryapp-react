import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  queryByAttribute,
  wait
} from '@testing-library/react';

import { ERRORS } from '@deliveryapp/common';
import { updatePassword } from '@deliveryapp/data-access';

import { PasswordForm } from './PasswordForm';

const oldPassword = 'oldPassword';
const newPassword = 'newPassword';

jest.mock('@deliveryapp/data-access', () => ({
  updatePassword: jest.fn(() => Promise.resolve({}))
}));

describe('[Profile] PasswordForm', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render password form', () => {
    const { baseElement } = render(<PasswordForm />);
    expect(baseElement).toMatchSnapshot();
  });

  describe('Validations', () => {
    describe('oldPassword', () => {
      it('should display required error', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        fireEvent.click(getByTestId('change-password'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'oldPassword-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        fireEvent.change(getByTestId('oldPassword'), {
          target: {
            value: oldPassword
          }
        });

        fireEvent.click(getByTestId('change-password'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'oldPassword-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('newPassword', () => {
      it('should display required error', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        fireEvent.click(getByTestId('change-password'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'newPassword-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        fireEvent.change(getByTestId('newPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.click(getByTestId('change-password'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'newPassword-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('confirmPassword', () => {
      it('should display required error', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        fireEvent.click(getByTestId('change-password'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'confirmPassword-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should display passwords do not match error', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        fireEvent.change(getByTestId('newPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.change(getByTestId('confirmPassword'), {
          target: {
            value: 'wrong'
          }
        });

        fireEvent.click(getByTestId('change-password'));

        await wait(() => {
          expect(
            queryByAttribute('id', container, 'confirmPassword-error')
          ).toHaveTextContent(ERRORS.PASSWORDS_DO_NOT_MATCH);
        });
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        await wait(() => {
          fireEvent.change(getByTestId('newPassword'), {
            target: {
              value: newPassword
            }
          });

          fireEvent.change(getByTestId('confirmPassword'), {
            target: {
              value: newPassword
            }
          });

          fireEvent.click(getByTestId('change-password'));

          expect(
            queryByAttribute('id', container, 'confirmPassword-error')
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Submitting', () => {
    it('should be successful', async () => {
      const { getByTestId } = render(<PasswordForm />);

      await wait(() => {
        fireEvent.change(getByTestId('oldPassword'), {
          target: {
            value: oldPassword
          }
        });

        fireEvent.change(getByTestId('newPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.change(getByTestId('confirmPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.click(getByTestId('change-password'));
      });

      expect(updatePassword).toBeCalledTimes(1);
      expect(updatePassword).toBeCalledWith({
        oldPassword,
        newPassword
      });
    });

    it('should have error', async () => {
      const error = {
        errors: [{ path: 'oldPassword', message: 'Error' }]
      };

      (updatePassword as jest.MockedFunction<
        typeof updatePassword
      >).mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: error
          }
        })
      );

      const { getByTestId, container } = render(<PasswordForm />);

      await wait(() => {
        fireEvent.change(getByTestId('oldPassword'), {
          target: {
            value: oldPassword
          }
        });

        fireEvent.change(getByTestId('newPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.change(getByTestId('confirmPassword'), {
          target: {
            value: newPassword
          }
        });

        fireEvent.click(getByTestId('change-password'));

        expect(
          queryByAttribute('id', container, 'oldPassword-error')
        ).toHaveTextContent(error.errors[0].message);
      });
    });
  });
});
