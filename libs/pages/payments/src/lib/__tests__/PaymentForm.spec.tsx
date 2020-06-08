/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ERRORS, Roles } from '@deliveryapp/common';
import {
  AuthProvider,
  ordersClient,
  paymentsClient,
  PaymentsProvider,
  usersClient
} from '@deliveryapp/data-access';
import { savedOrder, savedPayment, user } from '@deliveryapp/testing';

import { PaymentForm } from '../PaymentForm/PaymentForm';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: jest.fn((fn) => fn)
}));

jest.mock('@deliveryapp/data-access', () => ({
  ...jest.requireActual('@deliveryapp/data-access'),
  useAuth: jest
    .fn()
    .mockImplementation(() => [
      { user: { ...user, role: Roles.ADMIN }, isLoggedIn: true },
      jest.fn()
    ])
}));

const email = 'test@client.com';

const fillPaymentForm = async (container: HTMLElement) => {
  fireEvent.keyPress(container.querySelector('#total')!, {
    charCode: 53
  });

  fireEvent.keyDown(container.querySelector('#dueDate')!);
  fireEvent.input(container.querySelector('#dueDate')!, {
    target: {
      value: '10.12.2020'
    }
  });

  fireEvent.change(container.querySelector('#client input')!, {
    target: {
      value: 'client'
    }
  });

  await waitFor(() => {
    expect(usersClient.getUsers).toBeCalledTimes(1);
  });

  fireEvent.click(screen.getByText(email));

  fireEvent.change(container.querySelector('#orders input')!, {
    target: {
      value: savedOrder.id
    }
  });

  await waitFor(() => {
    expect(ordersClient.getOrders).toBeCalledTimes(1);
  });

  fireEvent.click(
    screen.getByRole('option', { name: savedOrder.id.toString() })
  );
};

describe('PaymentForm', () => {
  beforeEach(() => {
    jest
      .spyOn(paymentsClient, 'createPayment')
      .mockImplementation(() =>
        Promise.resolve({ data: { id: savedPayment.id } })
      );

    jest
      .spyOn(paymentsClient, 'updatePayment')
      .mockImplementation(() =>
        Promise.resolve({ data: { id: savedPayment.id } })
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <PaymentsProvider>
          <PaymentForm />
        </PaymentsProvider>
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  describe('Validations', () => {
    describe('total', () => {
      it('should display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <PaymentsProvider>
              <PaymentForm />
            </PaymentsProvider>
          </AuthProvider>
        );

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(container.querySelector('#total-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should not display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <PaymentsProvider>
              <PaymentForm />
            </PaymentsProvider>
          </AuthProvider>
        );

        fireEvent.keyPress(container.querySelector('#total')!, {
          charCode: 53
        });

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(
            container.querySelector('#total-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('dueDate', () => {
      it('should display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <PaymentsProvider>
              <PaymentForm />
            </PaymentsProvider>
          </AuthProvider>
        );

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(container.querySelector('#dueDate-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should not display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <PaymentsProvider>
              <PaymentForm />
            </PaymentsProvider>
          </AuthProvider>
        );

        fireEvent.keyDown(container.querySelector('#dueDate')!);
        fireEvent.input(container.querySelector('#dueDate')!, {
          target: {
            value: '10.12.2020'
          }
        });

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(
            container.querySelector('#dueDate-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('clientId', () => {
      it('should display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <PaymentsProvider>
              <PaymentForm />
            </PaymentsProvider>
          </AuthProvider>
        );

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(container.querySelector('#clientId-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should not display required error', async () => {
        jest.spyOn(usersClient, 'getUsers').mockImplementationOnce(() =>
          Promise.resolve({
            data: { count: 1, rows: [{ ...user, email }] }
          })
        );

        const { container } = render(
          <AuthProvider>
            <PaymentsProvider>
              <PaymentForm />
            </PaymentsProvider>
          </AuthProvider>
        );

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fireEvent.change(container.querySelector('#client input')!, {
          target: {
            value: 'client'
          }
        });

        await waitFor(() => {
          expect(usersClient.getUsers).toBeCalledTimes(1);
        });

        fireEvent.click(screen.getByText(email));

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(
            container.querySelector('#clientId-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('orders', () => {
      it('should display required error', async () => {
        const { container } = render(
          <AuthProvider>
            <PaymentsProvider>
              <PaymentForm />
            </PaymentsProvider>
          </AuthProvider>
        );

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(container.querySelector('#orders-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });

      it('should not display required error', async () => {
        jest.spyOn(ordersClient, 'getOrders').mockImplementationOnce(() =>
          Promise.resolve({
            data: { count: 1, rows: [savedOrder] }
          })
        );

        const { container } = render(
          <AuthProvider>
            <PaymentsProvider>
              <PaymentForm />
            </PaymentsProvider>
          </AuthProvider>
        );

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fireEvent.change(container.querySelector('#orders input')!, {
          target: {
            value: savedOrder.id
          }
        });

        await waitFor(() => {
          expect(ordersClient.getOrders).toBeCalledTimes(1);
        });

        fireEvent.click(
          screen.getByRole('option', { name: savedOrder.id.toString() })
        );

        fireEvent.submit(screen.getByTestId('save'));

        await waitFor(() => {
          expect(
            container.querySelector('#orders-error')
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Submitting', () => {
    beforeEach(() => {
      jest.spyOn(usersClient, 'getUsers').mockImplementationOnce(() =>
        Promise.resolve({
          data: { count: 1, rows: [{ ...user, email }] }
        })
      );

      jest.spyOn(ordersClient, 'getOrders').mockImplementationOnce(() =>
        Promise.resolve({
          data: { count: 1, rows: [savedOrder] }
        })
      );
    });

    it('should create successfully', async () => {
      const { container } = render(
        <AuthProvider>
          <PaymentsProvider>
            <PaymentForm />
          </PaymentsProvider>
        </AuthProvider>
      );

      await fillPaymentForm(container);

      fireEvent.submit(screen.getByTestId('save'));

      await waitFor(() => {
        expect(paymentsClient.createPayment).toBeCalledTimes(1);
      });

      expect(paymentsClient.createPayment).toBeCalledWith({
        clientId: 1,
        description: undefined,
        dueDate: new Date('2020-12-09T22:00:00.000Z'),
        id: null,
        method: 1,
        notes: undefined,
        orders: [1],
        paymentAmount: null,
        paymentDate: null,
        status: false,
        total: 5
      });
    });

    it('should update successfully', async () => {
      const usePaymentsSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .spyOn(require('@deliveryapp/data-access'), 'usePayments')
        .mockImplementation(() => [{ selectedPayment: 1 }, jest.fn()]);

      const getPaymentSpy = jest
        .spyOn(paymentsClient, 'getPayment')
        .mockImplementation(() => Promise.resolve({ data: savedPayment }));

      render(
        <AuthProvider>
          <PaymentsProvider>
            <PaymentForm />
          </PaymentsProvider>
        </AuthProvider>
      );

      await waitFor(() => {
        expect(paymentsClient.getPayment).toBeCalledTimes(1);
      });

      fireEvent.submit(screen.getByTestId('save'));

      await waitFor(() => {
        expect(paymentsClient.updatePayment).toBeCalledTimes(1);
      });

      expect(paymentsClient.updatePayment).toBeCalledWith(savedPayment.id, {
        clientId: savedPayment.client.id,
        description: undefined,
        dueDate: new Date(savedPayment.dueDate),
        id: savedPayment.id,
        method: savedPayment.method,
        notes: undefined,
        orders: savedPayment.orders.map((order) => order.id),
        paymentAmount: savedPayment.paymentAmount,
        paymentDate: new Date(savedPayment.paymentDate),
        status: savedPayment.status,
        total: savedPayment.total
      });

      usePaymentsSpy.mockRestore();
      getPaymentSpy.mockRestore();
    });

    it('should have API error', async () => {
      const error = {
        errors: [{ path: 'total', message: ['Error'] }]
      };

      jest.spyOn(paymentsClient, 'createPayment').mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: error
          }
        })
      );

      const { container } = render(
        <AuthProvider>
          <PaymentsProvider>
            <PaymentForm />
          </PaymentsProvider>
        </AuthProvider>
      );

      await fillPaymentForm(container);

      fireEvent.submit(screen.getByTestId('save'));

      await waitFor(() => {
        expect(paymentsClient.createPayment).toBeCalledTimes(1);
      });

      expect(
        await screen.findByText(error.errors[0].message[0])
      ).toBeInTheDocument();

      fireEvent.keyPress(container.querySelector('#total')!, {
        charCode: 53
      });

      await waitFor(() => {
        expect(
          screen.queryByText(error.errors[0].message[0])
        ).not.toBeInTheDocument();
      });
    });
  });
});
