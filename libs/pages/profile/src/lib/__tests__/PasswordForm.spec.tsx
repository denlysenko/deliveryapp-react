import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';

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

        await wait(() => {
          fireEvent.click(getByTestId('change-password'));
        });

        expect(container.querySelector('#oldPassword-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        fireEvent.change(getByTestId('oldPassword'), {
          target: {
            value: oldPassword
          }
        });

        await wait(() => {
          fireEvent.click(getByTestId('change-password'));
        });

        expect(
          container.querySelector('#oldPassword-error')
        ).not.toBeInTheDocument();
      });
    });

    describe('newPassword', () => {
      it('should display required error', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        await wait(() => {
          fireEvent.click(getByTestId('change-password'));
        });

        expect(container.querySelector('#newPassword-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        fireEvent.change(getByTestId('newPassword'), {
          target: {
            value: newPassword
          }
        });

        await wait(() => {
          fireEvent.click(getByTestId('change-password'));
        });

        expect(
          container.querySelector('#newPassword-error')
        ).not.toBeInTheDocument();
      });
    });

    describe('confirmPassword', () => {
      it('should display required error', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

        await wait(() => {
          fireEvent.click(getByTestId('change-password'));
        });

        expect(
          container.querySelector('#confirmPassword-error')
        ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
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

        await wait(() => {
          fireEvent.click(getByTestId('change-password'));
        });

        expect(
          container.querySelector('#confirmPassword-error')
        ).toHaveTextContent(ERRORS.PASSWORDS_DO_NOT_MATCH);
      });

      it('should not display any errors', async () => {
        const { getByTestId, container } = render(<PasswordForm />);

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

        await wait(() => {
          fireEvent.click(getByTestId('change-password'));
        });

        expect(
          container.querySelector('#confirmPassword-error')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Submitting', () => {
    it('should be successful', async () => {
      const { getByTestId } = render(<PasswordForm />);

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

      await wait(() => {
        fireEvent.click(getByTestId('change-password'));
      });

      expect(usersClient.updatePassword).toBeCalledTimes(1);
      expect(usersClient.updatePassword).toBeCalledWith({
        oldPassword,
        newPassword
      });
    });

    it('should have error', async () => {
      const error = {
        errors: [{ path: 'oldPassword', message: 'Error' }]
      };

      jest.spyOn(usersClient, 'updatePassword').mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: error
          }
        })
      );

      const { getByTestId, container } = render(<PasswordForm />);

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

      await wait(() => {
        fireEvent.click(getByTestId('change-password'));
      });

      expect(container.querySelector('#oldPassword-error')).toHaveTextContent(
        error.errors[0].message
      );
    });
  });
});
