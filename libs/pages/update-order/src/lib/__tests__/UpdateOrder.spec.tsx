import React from 'react';
import { render, cleanup, wait, fireEvent } from '@testing-library/react';

import { ERRORS, Roles } from '@deliveryapp/common';
import { ordersClient, useAuth } from '@deliveryapp/data-access';
import { savedOrder, useHistoryMock, user } from '@deliveryapp/testing';

import { UpdateOrder } from '../UpdateOrder';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 1 })),
  useHistory: jest.fn(() => useHistoryMock)
}));

jest.mock('@deliveryapp/data-access', () => ({
  ...require.requireActual('@deliveryapp/data-access'),
  useAuth: jest.fn().mockImplementation(() => [{ user }, jest.fn()])
}));

describe('UpdateOrder', () => {
  beforeEach(() => {
    jest.spyOn(ordersClient, 'getOrdersSelf').mockResolvedValue({
      data: {
        count: 1,
        rows: [savedOrder]
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render successfully with data', async () => {
    const { baseElement, getByTestId } = render(<UpdateOrder />);
    await wait(() => expect(getByTestId('id')).toHaveValue('1'));
    expect(baseElement).toMatchSnapshot();
  });

  describe('Validations', () => {
    describe('cargoName', () => {
      it('should have required error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        fireEvent.change(getByTestId('cargoName'), {
          target: {
            value: ''
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#cargoName-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });
    });

    describe('cargoWeight', () => {
      it('should have required error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        fireEvent.change(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          container.querySelector('#cargoWeight')?.querySelector('input')!,
          {
            target: {
              value: ''
            }
          }
        );

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#cargoWeight-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });
    });

    describe('cityFrom', () => {
      it('should have required error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        fireEvent.change(getByTestId('cityFrom'), {
          target: {
            value: ''
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#cityFrom-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });
    });

    describe('cityTo', () => {
      it('should have required error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        fireEvent.change(getByTestId('cityTo'), {
          target: {
            value: ''
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#cityTo-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });
    });

    describe('addressFrom', () => {
      it('should have required error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        fireEvent.change(getByTestId('addressFrom'), {
          target: {
            value: ''
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#addressFrom-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });
    });

    describe('addressTo', () => {
      it('should have required error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        fireEvent.change(getByTestId('addressTo'), {
          target: {
            value: ''
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#addressTo-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });
    });

    describe('senderEmail', () => {
      it('should have required error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        fireEvent.change(getByTestId('senderEmail'), {
          target: {
            value: ''
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#senderEmail-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });

      it('should have email error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        fireEvent.change(getByTestId('senderEmail'), {
          target: {
            value: 'invalid'
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#senderEmail-error')).toHaveTextContent(
          ERRORS.INVALID_EMAIL
        );
      });
    });

    describe('senderPhone', () => {
      it('should have required error', async () => {
        const { container, getByTestId } = render(<UpdateOrder />);
        await wait(() => expect(getByTestId('id')).toHaveValue('1'));

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fireEvent.input(container.querySelector('#senderPhone')!, {
          target: {
            value: ''
          }
        });

        await wait(() => {
          fireEvent.submit(getByTestId('updateOrderForm'));
        });

        expect(container.querySelector('#senderPhone-error')).toHaveTextContent(
          ERRORS.REQUIRED_FIELD
        );
      });
    });
  });

  describe('Role Client', () => {
    it('should hide client info block', async () => {
      const { getByTestId, container } = render(<UpdateOrder />);
      await wait(() => expect(getByTestId('id')).toHaveValue('1'));
      expect(container.querySelector('.client-block')).not.toBeInTheDocument();
    });

    it('should disable unallowed fields', async () => {
      const { getByTestId, container } = render(<UpdateOrder />);
      await wait(() => expect(getByTestId('id')).toHaveValue('1'));
      expect(container.querySelector('#deliveryCosts input')).toBeDisabled();
      expect(container.querySelector('#paid input')).toBeDisabled();
      expect(container.querySelector('#paymentDate input')).toBeDisabled();
      expect(getByTestId('invoiceId')).toBeDisabled();
      expect(container.querySelector('#status input')).toBeDisabled();
      expect(container.querySelector('#deliveryDate input')).toBeDisabled();
    });
  });

  describe('Role is not Client', () => {
    beforeEach(() => {
      (useAuth as jest.MockedFunction<
        typeof useAuth
      >).mockImplementation(() => [
        { user: { ...user, role: Roles.ADMIN }, isLoggedIn: true },
        jest.fn()
      ]);
    });

    it('should not hide client info block', async () => {
      const { getByTestId, container } = render(<UpdateOrder />);
      await wait(() => expect(getByTestId('id')).toHaveValue('1'));
      expect(container.querySelector('.client-block')).toBeInTheDocument();
    });

    it('should enable fields', async () => {
      const { getByTestId, container } = render(<UpdateOrder />);
      await wait(() => expect(getByTestId('id')).toHaveValue('1'));
      expect(container.querySelector('#deliveryCosts input')).toBeEnabled();
      expect(container.querySelector('#paid input')).toBeEnabled();
      expect(container.querySelector('#paymentDate input')).toBeEnabled();
      expect(getByTestId('invoiceId')).toBeEnabled();
      expect(container.querySelector('#status input')).toBeEnabled();
      expect(container.querySelector('#deliveryDate input')).toBeEnabled();
    });
  });

  describe('Back', () => {
    it('should call goBack', async () => {
      const { getByTestId } = render(<UpdateOrder />);
      await wait(() => expect(getByTestId('id')).toHaveValue('1'));
      fireEvent.click(getByTestId('back'));
      expect(useHistoryMock.goBack).toBeCalledTimes(1);
    });
  });

  describe('Submitting', () => {
    beforeEach(() => {
      jest.spyOn(ordersClient, 'updateOrderSelf').mockResolvedValue({
        data: savedOrder
      });
    });

    it('should call ordersClient method', async () => {
      const { getByTestId } = render(<UpdateOrder />);
      await wait(() => expect(getByTestId('id')).toHaveValue('1'));

      await wait(() => {
        fireEvent.submit(getByTestId('updateOrderForm'));
      });

      expect(ordersClient.updateOrderSelf).toBeCalledWith(1, {
        additionalData: 'test',
        addressFrom: 'From, 12',
        addressTo: 'To, 1',
        cargoName: 'Computers',
        cargoVolume: null,
        cargoWeight: 12,
        cityFrom: 'Kyiv',
        cityTo: 'Dnipro',
        comment: 'fragile',
        deliveryCosts: null,
        deliveryDate: null,
        id: 1,
        invoiceId: null,
        paid: false,
        paymentDate: null,
        senderCompany: 'Computers LTD',
        senderEmail: 'sender@test.com',
        senderName: 'Jane Lane',
        senderPhone: '(123) 121-1212',
        status: 0
      });
    });

    it('should handle API errors and not allow to submit', async () => {
      jest.spyOn(ordersClient, 'updateOrderSelf').mockRejectedValueOnce({
        response: {
          data: {
            errors: [
              {
                path: 'cityFrom',
                message: 'Error'
              },
              {
                path: 'cargoName',
                message: 'Error'
              },
              {
                path: 'senderEmail',
                message: 'Error'
              }
            ]
          }
        }
      });

      const { getByTestId, container } = render(<UpdateOrder />);
      await wait(() => expect(getByTestId('id')).toHaveValue('1'));

      await wait(() => {
        fireEvent.submit(getByTestId('updateOrderForm'));
      });

      expect(container.querySelector('#cityFrom-error')).toHaveTextContent(
        'Error'
      );

      expect(container.querySelector('#cargoName-error')).toHaveTextContent(
        'Error'
      );

      expect(container.querySelector('#senderEmail-error')).toHaveTextContent(
        'Error'
      );

      // should not allow to submit while error is not fixed
      jest.clearAllMocks();

      await wait(() => {
        fireEvent.submit(getByTestId('updateOrderForm'));
      });

      expect(ordersClient.updateOrderSelf).toBeCalledTimes(0);

      // should clear api errors
      fireEvent.change(getByTestId('cityFrom'), {
        target: {
          value: 'changed'
        }
      });

      expect(
        container.querySelector('#cityFrom-error')
      ).not.toBeInTheDocument();
    });
  });
});
