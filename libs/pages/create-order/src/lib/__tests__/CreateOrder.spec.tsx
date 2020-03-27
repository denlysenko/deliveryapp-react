import React from 'react';
import {
  render,
  fireEvent,
  wait,
  screen,
  cleanup
} from '@testing-library/react';

import { ERRORS } from '@deliveryapp/common';
import { ordersClient } from '@deliveryapp/data-access';
import { useHistoryMock, order } from '@deliveryapp/testing';

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

describe('CreateOrder', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('DestinationForm', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<CreateOrder />);
      expect(baseElement).toMatchSnapshot();
    });

    describe('Validations', () => {
      describe('cityFrom', () => {
        it('should display required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(container.querySelector('#cityFrom-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });

        it('should not display required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);

          fireEvent.change(getByTestId('cityFrom'), {
            target: {
              value: 'test'
            }
          });

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(
            container.querySelector('#cityFrom-error')
          ).not.toBeInTheDocument();
        });
      });

      describe('cityTo', () => {
        it('should display required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(container.querySelector('#cityTo-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });

        it('should not display required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);

          fireEvent.change(getByTestId('cityTo'), {
            target: {
              value: 'test'
            }
          });

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(
            container.querySelector('#cityTo-error')
          ).not.toBeInTheDocument();
        });
      });

      describe('addressFrom', () => {
        it('should display required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(
            container.querySelector('#addressFrom-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });

        it('should not display required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);

          fireEvent.change(getByTestId('addressFrom'), {
            target: {
              value: 'test'
            }
          });

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(
            container.querySelector('#addressFrom-error')
          ).not.toBeInTheDocument();
        });
      });

      describe('addressTo', () => {
        it('should display required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(container.querySelector('#addressTo-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });

        it('should not display required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);

          fireEvent.change(getByTestId('addressTo'), {
            target: {
              value: 'test'
            }
          });

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(
            container.querySelector('#addressTo-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('Next step', () => {
      it('should not move to CargoForm if current form is invalid', async () => {
        const { getByTestId, container } = render(<CreateOrder />);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Destination'
        );
      });

      it('should move to CargoForm if current form is valid', async () => {
        const { getByTestId, container } = render(<CreateOrder />);

        fillDestinationForm();

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Cargo'
        );
      });
    });
  });

  describe('CargoFrom', () => {
    it('should render successfully', async () => {
      const { baseElement, getByTestId } = render(<CreateOrder />);
      fillDestinationForm();

      await wait(() => {
        fireEvent.click(getByTestId('next'));
      });

      expect(baseElement).toMatchSnapshot();
    });

    describe('Validations', () => {
      describe('cargoName', () => {
        it('should display required error', async () => {
          const { container, getByTestId } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(container.querySelector('#cargoName-error')).toHaveTextContent(
            ERRORS.REQUIRED_FIELD
          );
        });

        it('should not display required error', async () => {
          const { container, getByTestId } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fireEvent.change(getByTestId('cargoName'), {
            target: {
              value: 'test'
            }
          });

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(
            container.querySelector('#cargoName-error')
          ).not.toBeInTheDocument();
        });
      });

      describe('cargoWeight', () => {
        it('should display required error', async () => {
          const { container, getByTestId } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(
            container.querySelector('#cargoWeight-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });

        it('should not display required error', async () => {
          const { container, getByTestId } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
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

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          expect(
            container.querySelector('#cargoWeight-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('Prev Step', () => {
      it('should move to DestinationForm', async () => {
        const { getByTestId, container } = render(<CreateOrder />);
        fillDestinationForm();

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        await wait(() => {
          fireEvent.click(getByTestId('back'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Destination'
        );
      });
    });

    describe('Next Step', () => {
      it('should not move to SenderForm if current form is invalid', async () => {
        const { getByTestId, container } = render(<CreateOrder />);
        fillDestinationForm();

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Cargo'
        );
      });

      it('should move to SenderForm if current form is valid', async () => {
        const { container, getByTestId } = render(<CreateOrder />);
        fillDestinationForm();

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillCargoForm(container);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Sender'
        );
      });
    });
  });

  describe('SenderForm', () => {
    beforeEach(() => {
      jest
        .spyOn(ordersClient, 'createOrderSelf')
        .mockResolvedValue({ data: order });
    });

    it('should render successfully', async () => {
      const { baseElement, getByTestId, container } = render(<CreateOrder />);
      fillDestinationForm();

      await wait(() => {
        fireEvent.click(getByTestId('next'));
      });

      fillCargoForm(container);

      await wait(() => {
        fireEvent.click(getByTestId('next'));
      });

      expect(baseElement).toMatchSnapshot();
    });

    describe('Validations', () => {
      describe('senderEmail', () => {
        it('should have required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(container);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          await wait(() => {
            fireEvent.click(getByTestId('create'));
          });

          expect(
            container.querySelector('#senderEmail-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });

        it('should have invalid email error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(container);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fireEvent.change(getByTestId('senderEmail'), {
            target: {
              value: 'test'
            }
          });

          await wait(() => {
            fireEvent.click(getByTestId('create'));
          });

          expect(
            container.querySelector('#senderEmail-error')
          ).toHaveTextContent(ERRORS.INVALID_EMAIL);
        });

        it('should not have error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(container);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fireEvent.change(getByTestId('senderEmail'), {
            target: {
              value: 'test@test.com'
            }
          });

          await wait(() => {
            fireEvent.click(getByTestId('create'));
          });

          expect(
            container.querySelector('#senderEmail-error')
          ).not.toBeInTheDocument();
        });
      });

      describe('senderPhone', () => {
        it('should have required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(container);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          await wait(() => {
            fireEvent.click(getByTestId('create'));
          });

          expect(
            container.querySelector('#senderPhone-error')
          ).toHaveTextContent(ERRORS.REQUIRED_FIELD);
        });

        it('should not have required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);
          fillDestinationForm();

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(container);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fireEvent.input(container.querySelector('#senderPhone')!, {
            target: {
              value: '1234567545'
            }
          });

          await wait(() => {
            fireEvent.click(getByTestId('create'));
          });

          expect(
            container.querySelector('#senderPhone-error')
          ).not.toBeInTheDocument();
        });
      });
    });

    describe('Prev Step', () => {
      it('should move to CargoForm', async () => {
        const { getByTestId, container } = render(<CreateOrder />);
        fillDestinationForm();

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillCargoForm(container);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        await wait(() => {
          fireEvent.click(getByTestId('back'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Cargo'
        );
      });
    });

    describe('Create', () => {
      it('should send request and redirect', async () => {
        const { getByTestId, container } = render(<CreateOrder />);
        fillDestinationForm();

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillCargoForm(container);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillSenderForm(container);

        await wait(() => {
          fireEvent.click(getByTestId('create'));
        });

        expect(ordersClient.createOrderSelf).toBeCalledWith({
          additionalData: '',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoVolume: undefined,
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
        jest.spyOn(ordersClient, 'createOrderSelf').mockRejectedValueOnce({
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

        const { getByTestId, container } = render(<CreateOrder />);

        fillDestinationForm();

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillCargoForm(container);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillSenderForm(container);

        await wait(() => {
          fireEvent.click(getByTestId('create'));
        });

        // should go to Destination step
        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Destination'
        );

        expect(container.querySelector('#cityFrom-error')).toHaveTextContent(
          'Error'
        );

        // should stay at the same step while error is not fixed
        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Destination'
        );

        fireEvent.change(getByTestId('cityFrom'), {
          target: {
            value: 'test2'
          }
        });

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Cargo'
        );

        expect(container.querySelector('#cargoName-error')).toHaveTextContent(
          'Error'
        );

        // should stay at the same step while error is not fixed
        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Cargo'
        );

        fireEvent.change(getByTestId('cargoName'), {
          target: {
            value: 'test2'
          }
        });

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(container.querySelector('.p-steps-current')).toContainHTML(
          'Sender'
        );

        expect(container.querySelector('#senderEmail-error')).toHaveTextContent(
          'Error'
        );

        // should not allow to submit while error is not fixed
        jest.clearAllMocks();

        await wait(() => {
          fireEvent.click(getByTestId('create'));
        });

        expect(ordersClient.createOrderSelf).toBeCalledTimes(0);
      });
    });
  });
});
