import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';

import { ERRORS, Roles } from '@deliveryapp/common';
import { ordersClient, useAuth } from '@deliveryapp/data-access';
import { savedOrder, useHistoryMock, user } from '@deliveryapp/testing';

import { UpdateOrder } from '../UpdateOrder';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 1 })),
  useHistory: jest.fn(() => useHistoryMock)
}));

jest.mock('@deliveryapp/data-access', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...jest.requireActual<any>('@deliveryapp/data-access'),
  useAuth: jest.fn().mockImplementation(() => [{ user }, jest.fn()])
}));

describe('UpdateOrder', () => {
  beforeEach(() => {
    jest.spyOn(ordersClient, 'getOrder').mockResolvedValue({
      data: savedOrder
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully with data', async () => {
    const { baseElement } = render(<UpdateOrder />);
    await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));
    expect(baseElement).toBeTruthy();
  });

  describe('Validations', () => {
    describe('cargoName', () => {
      it('should have required error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        fireEvent.change(screen.getByTestId('cargoName'), {
          target: {
            value: ''
          }
        });

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(container.querySelector('#cargoName-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });
    });

    describe('cargoWeight', () => {
      it('should have required error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        fireEvent.change(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          container.querySelector('#cargoWeight')!.querySelector('input')!,
          {
            target: {
              value: ''
            }
          }
        );

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(
            container.querySelector('#cargoWeight-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });
    });

    describe('cityFrom', () => {
      it('should have required error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        fireEvent.change(screen.getByTestId('cityFrom'), {
          target: {
            value: ''
          }
        });

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(container.querySelector('#cityFrom-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });
    });

    describe('cityTo', () => {
      it('should have required error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        fireEvent.change(screen.getByTestId('cityTo'), {
          target: {
            value: ''
          }
        });

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(container.querySelector('#cityTo-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });
    });

    describe('addressFrom', () => {
      it('should have required error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        fireEvent.change(screen.getByTestId('addressFrom'), {
          target: {
            value: ''
          }
        });

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(
            container.querySelector('#addressFrom-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });
    });

    describe('addressTo', () => {
      it('should have required error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        fireEvent.change(screen.getByTestId('addressTo'), {
          target: {
            value: ''
          }
        });

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(container.querySelector('#addressTo-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });
      });
    });

    describe('senderEmail', () => {
      it('should have required error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        fireEvent.change(screen.getByTestId('senderEmail'), {
          target: {
            value: ''
          }
        });

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(
            container.querySelector('#senderEmail-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });

      it('should have email error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        fireEvent.change(screen.getByTestId('senderEmail'), {
          target: {
            value: 'invalid'
          }
        });

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(
            container.querySelector('#senderEmail-error')
          ).toHaveTextContent(ERRORS.INVALID_EMAIL);
        });
      });
    });

    describe('senderPhone', () => {
      it('should have required error', async () => {
        const { container } = render(<UpdateOrder />);
        await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fireEvent.input(container.querySelector('#senderPhone')!, {
          target: {
            value: ''
          }
        });

        fireEvent.submit(screen.getByTestId('updateOrderForm'));

        await waitFor(() => {
          expect(
            container.querySelector('#senderPhone-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });
      });
    });
  });

  describe('Role Client', () => {
    it('should hide client info block', async () => {
      const { container } = render(<UpdateOrder />);
      await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));
      expect(container.querySelector('.client-block')).not.toBeInTheDocument();
    });

    it('should disable unallowed fields', async () => {
      const { container } = render(<UpdateOrder />);
      await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));
      expect(container.querySelector('#deliveryCosts input')).toBeDisabled();
      expect(container.querySelector('#paid input')).toBeDisabled();
      expect(container.querySelector('#paymentDate input')).toBeDisabled();
      expect(screen.getByTestId('invoiceId')).toBeDisabled();
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
      const { container } = render(<UpdateOrder />);
      await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));
      expect(container.querySelector('.client-block')).toBeInTheDocument();
    });

    it('should enable fields', async () => {
      const { container } = render(<UpdateOrder />);
      await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));
      expect(container.querySelector('#deliveryCosts input')).toBeEnabled();
      expect(container.querySelector('#paid input')).toBeEnabled();
      expect(container.querySelector('#paymentDate input')).toBeEnabled();
      expect(screen.getByTestId('invoiceId')).toBeEnabled();
      expect(container.querySelector('#status input')).toBeEnabled();
      expect(container.querySelector('#deliveryDate input')).toBeEnabled();
    });
  });

  describe('Back', () => {
    it('should call goBack', async () => {
      render(<UpdateOrder />);
      await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));
      fireEvent.click(screen.getByTestId('back'));
      expect(useHistoryMock.goBack).toBeCalledTimes(1);
    });
  });

  describe('Submitting', () => {
    beforeEach(() => {
      jest.spyOn(ordersClient, 'updateOrder').mockResolvedValue({
        data: { id: savedOrder.id }
      });
    });

    it('should call ordersClient method', async () => {
      render(<UpdateOrder />);
      await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

      fireEvent.submit(screen.getByTestId('updateOrderForm'));

      await waitFor(() => {
        expect(ordersClient.updateOrder).toBeCalledWith(1, {
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
    });

    it('should handle API errors and not allow to submit', async () => {
      jest.spyOn(ordersClient, 'updateOrder').mockRejectedValueOnce({
        response: {
          data: {
            errors: [
              {
                path: 'cityFrom',
                message: ['Error']
              },
              {
                path: 'cargoName',
                message: ['Error']
              },
              {
                path: 'senderEmail',
                message: ['Error']
              }
            ]
          }
        }
      });

      const { container } = render(<UpdateOrder />);
      await waitFor(() => expect(screen.getByTestId('id')).toHaveValue('1'));

      fireEvent.submit(screen.getByTestId('updateOrderForm'));

      await waitFor(() => {
        expect(container.querySelector('#cityFrom-error')).toHaveTextContent(
          'Error'
        );
      });

      expect(container.querySelector('#cargoName-error')).toHaveTextContent(
        'Error'
      );

      expect(container.querySelector('#senderEmail-error')).toHaveTextContent(
        'Error'
      );

      // should not allow to submit while error is not fixed
      jest.clearAllMocks();

      fireEvent.submit(screen.getByTestId('updateOrderForm'));

      await waitFor(() => {
        expect(ordersClient.updateOrder).toBeCalledTimes(0);
      });

      // should clear api errors
      fireEvent.change(screen.getByTestId('cityFrom'), {
        target: {
          value: 'changed'
        }
      });

      await waitFor(() => {
        expect(
          container.querySelector('#cityFrom-error')
        ).not.toBeInTheDocument();
      });
    });
  });
});
