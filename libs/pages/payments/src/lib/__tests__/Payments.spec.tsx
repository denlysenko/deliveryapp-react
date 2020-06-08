import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import {
  AuthProvider,
  paymentsClient,
  PaymentsProvider
} from '@deliveryapp/data-access';
import { savedPayment } from '@deliveryapp/testing';

import { Payments } from '../Payments';

describe('Payments', () => {
  beforeEach(() => {
    jest.spyOn(paymentsClient, 'getPayments').mockResolvedValue({
      data: { rows: [savedPayment], count: 1 }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(
      <AuthProvider>
        <PaymentsProvider>
          <Payments />
        </PaymentsProvider>
      </AuthProvider>
    );
    await waitFor(() => expect(paymentsClient.getPayments).toBeCalledTimes(1));

    expect(baseElement).toMatchSnapshot();
  });

  describe('selectPayment', () => {
    beforeEach(() => {
      jest.spyOn(paymentsClient, 'getPayment').mockResolvedValue({
        data: savedPayment
      });
    });

    it('should get payment by id', async () => {
      const { container } = render(
        <AuthProvider>
          <PaymentsProvider>
            <Payments />
          </PaymentsProvider>
        </AuthProvider>
      );
      await waitFor(() =>
        expect(paymentsClient.getPayments).toBeCalledTimes(1)
      );

      fireEvent.click(container.querySelectorAll('.p-datatable-row')[0]);

      await waitFor(() => {
        expect(paymentsClient.getPayment).toBeCalledTimes(1);
      });

      expect(paymentsClient.getPayment).toBeCalledWith(1);
    });
  });
});
