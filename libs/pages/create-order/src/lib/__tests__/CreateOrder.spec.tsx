import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import { ERRORS, Roles } from '@deliveryapp/common';
import {
  ordersClient,
  AuthProvider,
  useAuth,
  usersClient
} from '@deliveryapp/data-access';
import { useHistoryMock, user, savedOrder } from '@deliveryapp/testing';

import { CreateOrder } from '../CreateOrder';

const fillDestinationForm = () => {
  fireEvent.change(screen.getByTestId('cityFrom'), {
    target: {
      value: 'test'
    }
  });

  fireEvent.change(screen.getByTestId('cityTo'), {
    target: {
      value: 'test'
    }
  });

  fireEvent.change(screen.getByTestId('addressFrom'), {
    target: {
      value: 'test'
    }
  });

  fireEvent.change(screen.getByTestId('addressTo'), {
    target: {
      value: 'test'
    }
  });
};

const fillCargoForm = (container: HTMLElement) => {
  fireEvent.change(screen.getByTestId('cargoName'), {
    target: {
      value: 'test'
    }
  });

  fireEvent.change(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    container.querySelector('#cargoWeight')?.querySelector('input')!,
    {
      target: {
        value: 12
      }
    }
  );
};

const fillSenderForm = (container: HTMLElement) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fireEvent.input(container.querySelector('#senderPhone')!, {
    target: {
      value: '1234567545'
    }
  });

  fireEvent.change(screen.getByTestId('senderEmail'), {
    target: {
      value: 'test@test.com'
    }
  });
};

jest.mock('react-router-dom', () => ({
  useHistory: () => useHistoryMock
}));

jest.mock('@deliveryapp/data-access', () => ({
  ...jest.requireActual('@deliveryapp/data-access'),
  useAuth: jest.fn().mockImplementation(() => [{ user }, jest.fn()])
}));

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: jest.fn((fn) => fn)
}));

describe('CreateOrder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('DestinationForm', () => {
    it('should render successfully', () => {
      const { baseElement } = render(
        <AuthProvider>
          <CreateOrder />
        </AuthProvider>
      );
      expect(baseElement).toMatchSnapshot();
    });

    describe('Validations', () => {
      describe('cityFrom', () => {
        it('should display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#cityFrom-error')
            ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
          });
        });

        it('should not display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.change(screen.getByTestId('cityFrom'), {
            target: {
              value: 'test'
            }
          });

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#cityFrom-error')
            ).not.toBeInTheDocument();
          });
        });
      });

      describe('cityTo', () => {
        it('should display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('#cityTo-error')).toHaveTextContent(
              ERRORS.REQUIRED_FIELD
            );
          });
        });

        it('should not display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.change(screen.getByTestId('cityTo'), {
            target: {
              value: 'test'
            }
          });

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#cityTo-error')
            ).not.toBeInTheDocument();
          });
        });
      });

      describe('addressFrom', () => {
        it('should display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#addressFrom-error')
            ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
          });
        });

        it('should not display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.change(screen.getByTestId('addressFrom'), {
            target: {
              value: 'test'
            }
          });

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#addressFrom-error')
            ).not.toBeInTheDocument();
          });
        });
      });

      describe('addressTo', () => {
        it('should display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#addressTo-error')
            ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
          });
        });

        it('should not display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.change(screen.getByTestId('addressTo'), {
            target: {
              value: 'test'
            }
          });

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#addressTo-error')
            ).not.toBeInTheDocument();
          });
        });
      });

      describe('clientId', () => {
        beforeEach(() => {
          (useAuth as jest.MockedFunction<
            typeof useAuth
          >).mockImplementation(() => [
            { user: { ...user, role: Roles.MANAGER }, isLoggedIn: true },
            jest.fn()
          ]);
        });

        afterEach(() => {
          (useAuth as jest.MockedFunction<
            typeof useAuth
          >).mockImplementation(() => [{ user, isLoggedIn: true }, jest.fn()]);
        });

        it('should display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#clientId-error')
            ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
          });
        });

        it('should not display required error', async () => {
          const email = 'client@test.com';

          jest.spyOn(usersClient, 'getUsers').mockImplementationOnce(() =>
            Promise.resolve({
              data: { count: 1, rows: [{ ...user, email }] }
            })
          );

          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );

          fireEvent.change(screen.getByRole('searchbox'), {
            target: {
              value: 'client'
            }
          });

          await waitFor(() => {
            expect(usersClient.getUsers).toBeCalledTimes(1);
          });

          fireEvent.click(screen.getByText(email));
          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#clientId-error')
            ).not.toBeInTheDocument();
          });
        });
      });
    });

    describe('Next step', () => {
      it('should not move to CargoForm if current form is invalid', async () => {
        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Destination'
          );
        });
      });

      it('should move to CargoForm if current form is valid', async () => {
        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );

        fillDestinationForm();

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });
      });
    });

    describe('client data request', () => {
      beforeEach(() => {
        (useAuth as jest.MockedFunction<
          typeof useAuth
        >).mockImplementation(() => [
          { user: { ...user, role: Roles.MANAGER }, isLoggedIn: true },
          jest.fn()
        ]);
      });

      afterEach(() => {
        (useAuth as jest.MockedFunction<
          typeof useAuth
        >).mockImplementation(() => [{ user, isLoggedIn: true }, jest.fn()]);
      });

      it('should request client data if clientId is defined', async () => {
        const email = 'client@test.com';

        jest.spyOn(usersClient, 'getUsers').mockImplementationOnce(() =>
          Promise.resolve({
            data: { count: 1, rows: [{ ...user, email }] }
          })
        );

        jest.spyOn(usersClient, 'getUser').mockImplementationOnce(() =>
          Promise.resolve({
            data: { ...user, email }
          })
        );

        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );

        fillDestinationForm();

        fireEvent.change(screen.getByRole('searchbox'), {
          target: {
            value: 'client'
          }
        });

        await waitFor(() => {
          expect(usersClient.getUsers).toBeCalledTimes(1);
        });

        fireEvent.click(screen.getByText(email));
        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });

        fireEvent.click(screen.getByTestId('back'));

        await waitFor(() => {
          expect(usersClient.getUser).toBeCalledTimes(1);
        });

        expect(screen.getByRole('searchbox')).toHaveValue(email);
      });
    });
  });

  describe('CargoForm', () => {
    it('should render successfully', async () => {
      const { baseElement, container } = render(
        <AuthProvider>
          <CreateOrder />
        </AuthProvider>
      );
      fillDestinationForm();

      fireEvent.click(screen.getByTestId('next'));

      await waitFor(() => {
        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Cargo'
        );
      });

      expect(baseElement).toMatchSnapshot();
    });

    describe('Validations', () => {
      describe('cargoName', () => {
        it('should display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#cargoName-error')
            ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
          });
        });

        it('should not display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fireEvent.change(screen.getByTestId('cargoName'), {
            target: {
              value: 'test'
            }
          });

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#cargoName-error')
            ).not.toBeInTheDocument();
          });
        });
      });

      describe('cargoWeight', () => {
        it('should display number error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#cargoWeight-error')
            ).toHaveTextContent(ERRORS.NUMBER_FIELD);
          });
        });

        it('should not display required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fireEvent.change(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            container.querySelector('#cargoWeight')?.querySelector('input')!,
            {
              target: {
                value: 12
              }
            }
          );

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(
              container.querySelector('#cargoWeight-error')
            ).not.toBeInTheDocument();
          });
        });
      });
    });

    describe('Prev Step', () => {
      it('should move to DestinationForm', async () => {
        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );
        fillDestinationForm();

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });

        fireEvent.click(screen.getByTestId('back'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Destination'
          );
        });
      });
    });

    describe('Next Step', () => {
      it('should not move to SenderForm if current form is invalid', async () => {
        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );
        fillDestinationForm();

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });
      });

      it('should move to SenderForm if current form is valid', async () => {
        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );
        fillDestinationForm();

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });

        fillCargoForm(container);

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Sender'
          );
        });
      });
    });
  });

  describe('SenderForm', () => {
    beforeEach(() => {
      jest
        .spyOn(ordersClient, 'createOrder')
        .mockResolvedValue({ data: { id: savedOrder.id } });
    });

    it('should render successfully', async () => {
      const { baseElement, container } = render(
        <AuthProvider>
          <CreateOrder />
        </AuthProvider>
      );
      fillDestinationForm();

      fireEvent.click(screen.getByTestId('next'));

      await waitFor(() => {
        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Cargo'
        );
      });

      fillCargoForm(container);

      fireEvent.click(screen.getByTestId('next'));

      await waitFor(() => {
        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Sender'
        );
      });

      expect(baseElement).toMatchSnapshot();
    });

    describe('Validations', () => {
      describe('senderEmail', () => {
        it('should have required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fillCargoForm(container);

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Sender'
            );
          });

          fireEvent.click(screen.getByTestId('create'));

          await waitFor(() => {
            expect(
              container.querySelector('#senderEmail-error')
            ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
          });
        });

        it('should have invalid email error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fillCargoForm(container);

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Sender'
            );
          });

          fireEvent.change(screen.getByTestId('senderEmail'), {
            target: {
              value: 'test'
            }
          });

          fireEvent.click(screen.getByTestId('create'));

          await waitFor(() => {
            expect(
              container.querySelector('#senderEmail-error')
            ).toHaveTextContent(ERRORS.INVALID_EMAIL);
          });
        });

        it('should not have error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fillCargoForm(container);

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Sender'
            );
          });

          fireEvent.change(screen.getByTestId('senderEmail'), {
            target: {
              value: 'test@test.com'
            }
          });

          fireEvent.click(screen.getByTestId('create'));

          await waitFor(() => {
            expect(
              container.querySelector('#senderEmail-error')
            ).not.toBeInTheDocument();
          });
        });
      });

      describe('senderPhone', () => {
        it('should have required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fillCargoForm(container);

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Sender'
            );
          });

          fireEvent.click(screen.getByTestId('create'));

          await waitFor(() => {
            expect(
              container.querySelector('#senderPhone-error')
            ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
          });
        });

        it('should not have required error', async () => {
          const { container } = render(
            <AuthProvider>
              <CreateOrder />
            </AuthProvider>
          );
          fillDestinationForm();

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Cargo'
            );
          });

          fillCargoForm(container);

          fireEvent.click(screen.getByTestId('next'));

          await waitFor(() => {
            expect(container.querySelector('.p-steps-current')).toContainHTML(
              'Sender'
            );
          });

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fireEvent.input(container.querySelector('#senderPhone')!, {
            target: {
              value: '1234567545'
            }
          });

          fireEvent.click(screen.getByTestId('create'));

          await waitFor(() => {
            expect(
              container.querySelector('#senderPhone-error')
            ).not.toBeInTheDocument();
          });
        });
      });
    });

    describe('Prev Step', () => {
      it('should move to CargoForm', async () => {
        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );
        fillDestinationForm();

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });

        fillCargoForm(container);

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Sender'
          );
        });

        fireEvent.click(screen.getByTestId('back'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });
      });
    });

    describe('Create', () => {
      it('should send request and redirect', async () => {
        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );
        fillDestinationForm();

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });

        fillCargoForm(container);

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Sender'
          );
        });

        fillSenderForm(container);

        fireEvent.click(screen.getByTestId('create'));

        await waitFor(() => {
          expect(ordersClient.createOrder).toBeCalledTimes(1);
        });

        expect(ordersClient.createOrder).toBeCalledWith({
          additionalData: '',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoVolume: null,
          cargoWeight: '12',
          cityFrom: 'test',
          cityTo: 'test',
          comment: '',
          senderCompany: '',
          senderEmail: 'test@test.com',
          senderName: '',
          senderPhone: '(123) 456-7545'
        });

        expect(useHistoryMock.push).toBeCalledWith('/orders');
      });

      it('should handle API errors and not allow to submit', async () => {
        jest.spyOn(ordersClient, 'createOrder').mockRejectedValueOnce({
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

        const { container } = render(
          <AuthProvider>
            <CreateOrder />
          </AuthProvider>
        );

        fillDestinationForm();

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });

        fillCargoForm(container);

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Sender'
          );
        });

        fillSenderForm(container);

        fireEvent.click(screen.getByTestId('create'));

        await waitFor(() => {
          // should go to Destination step
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Destination'
          );
        });

        expect(container.querySelector('#cityFrom-error')).toHaveTextContent(
          'Error'
        );

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          // should stay at the same step while error is not fixed
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Destination'
          );
        });

        fireEvent.change(screen.getByTestId('cityFrom'), {
          target: {
            value: 'test2'
          }
        });

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });

        expect(container.querySelector('#cargoName-error')).toHaveTextContent(
          'Error'
        );

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          // should stay at the same step while error is not fixed
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Cargo'
          );
        });

        fireEvent.change(screen.getByTestId('cargoName'), {
          target: {
            value: 'test2'
          }
        });

        fireEvent.click(screen.getByTestId('next'));

        await waitFor(() => {
          expect(container.querySelector('.p-steps-current')).toContainHTML(
            'Sender'
          );
        });

        expect(container.querySelector('#senderEmail-error')).toHaveTextContent(
          'Error'
        );

        // should not allow to submit while error is not fixed
        jest.clearAllMocks();

        fireEvent.click(screen.getByTestId('create'));

        await waitFor(() => {
          expect(ordersClient.createOrder).toBeCalledTimes(0);
        });
      });
    });
  });
});
