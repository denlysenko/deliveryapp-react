import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DEFAULT_LIMIT } from '@deliveryapp/common';
import {
  AuthProvider,
  Payment,
  paymentsClient,
  PaymentsProvider
} from '@deliveryapp/data-access';
import { savedPayment, user } from '@deliveryapp/testing';

import { PaymentsList } from '../PaymentsList/PaymentsList';

jest.mock('@deliveryapp/data-access', () => ({
  ...jest.requireActual('@deliveryapp/data-access'),
  useAuth: jest.fn().mockImplementation(() => [{ user }, jest.fn()])
}));

const payments: Payment[] = [];

for (let i = 0; i < 12; i++) {
  payments.push({ ...savedPayment, id: i + 1 });
}

describe('PaymentsList', () => {
  beforeEach(() => {
    jest.spyOn(paymentsClient, 'getPayments').mockResolvedValue({
      data: { rows: payments, count: 11 }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(
      <AuthProvider>
        <PaymentsProvider>
          <PaymentsList />
        </PaymentsProvider>
      </AuthProvider>
    );
    await waitFor(() => expect(paymentsClient.getPayments).toBeCalledTimes(1));
    expect(baseElement).toBeTruthy();
  });

  it('should get payments with default filter', async () => {
    render(
      <AuthProvider>
        <PaymentsProvider>
          <PaymentsList />
        </PaymentsProvider>
      </AuthProvider>
    );

    await waitFor(() => expect(paymentsClient.getPayments).toBeCalledTimes(1));

    expect(paymentsClient.getPayments).toBeCalledWith({
      filter: {},
      limit: DEFAULT_LIMIT,
      offset: 0,
      order: {
        id: 'desc'
      }
    });
  });

  describe('filtering', () => {
    it('should filter payments', async () => {
      render(
        <AuthProvider>
          <PaymentsProvider>
            <PaymentsList />
          </PaymentsProvider>
        </AuthProvider>
      );
      await waitFor(() =>
        expect(paymentsClient.getPayments).toBeCalledTimes(1)
      );

      jest.clearAllMocks();

      fireEvent.change(screen.getByPlaceholderText(/search by number/i), {
        target: {
          value: '2'
        }
      });

      await waitFor(() => {
        expect(paymentsClient.getPayments).toBeCalledWith({
          filter: {
            id: 2
          },
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            id: 'desc'
          }
        });
      });
    });
  });

  describe('sorting', () => {
    it('should sort payments by id', async () => {
      render(
        <AuthProvider>
          <PaymentsProvider>
            <PaymentsList />
          </PaymentsProvider>
        </AuthProvider>
      );
      await waitFor(() =>
        expect(paymentsClient.getPayments).toBeCalledTimes(1)
      );

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('Num.'));

      await waitFor(() => {
        expect(paymentsClient.getPayments).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            id: 'asc'
          }
        });
      });
    });

    it('should sort payments by total', async () => {
      render(
        <AuthProvider>
          <PaymentsProvider>
            <PaymentsList />
          </PaymentsProvider>
        </AuthProvider>
      );
      await waitFor(() =>
        expect(paymentsClient.getPayments).toBeCalledTimes(1)
      );

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('Total'));

      await waitFor(() => {
        expect(paymentsClient.getPayments).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            total: 'asc'
          }
        });
      });
    });

    it('should sort payments by createdAt', async () => {
      render(
        <AuthProvider>
          <PaymentsProvider>
            <PaymentsList />
          </PaymentsProvider>
        </AuthProvider>
      );
      await waitFor(() =>
        expect(paymentsClient.getPayments).toBeCalledTimes(1)
      );

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('Created At'));

      await waitFor(() => {
        expect(paymentsClient.getPayments).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            createdAt: 'asc'
          }
        });
      });
    });
  });

  describe('pagination', () => {
    it('should paginate payments', async () => {
      render(
        <AuthProvider>
          <PaymentsProvider>
            <PaymentsList />
          </PaymentsProvider>
        </AuthProvider>
      );
      await waitFor(() =>
        expect(paymentsClient.getPayments).toBeCalledTimes(1)
      );

      jest.clearAllMocks();

      fireEvent.click(screen.getAllByText('2')[1]);

      await waitFor(() => {
        expect(paymentsClient.getPayments).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 10,
          order: {
            id: 'desc'
          }
        });
      });
    });
  });
});
