import React from 'react';
import {
  render,
  fireEvent,
  wait,
  Matcher,
  MatcherOptions
} from '@testing-library/react';

import { ERRORS } from '@deliveryapp/common';
import { ordersClient } from '@deliveryapp/data-access';
import { useHistoryMock, order } from '@deliveryapp/testing';

import { CreateOrder } from '../CreateOrder';

type GetByTestId = (
  text: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement;

const fillDestinationForm = (getByTestId: GetByTestId) => {
  fireEvent.change(getByTestId('cityFrom'), {
    target: {
      value: 'test'
    }
  });

  fireEvent.change(getByTestId('cityTo'), {
    target: {
      value: 'test'
    }
  });

  fireEvent.change(getByTestId('addressFrom'), {
    target: {
      value: 'test'
    }
  });

  fireEvent.change(getByTestId('addressTo'), {
    target: {
      value: 'test'
    }
  });
};

const fillCargoForm = (getByTestId: GetByTestId, container: HTMLElement) => {
  fireEvent.change(getByTestId('cargoName'), {
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

const fillSenderForm = (getByTestId: GetByTestId, container: HTMLElement) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fireEvent.input(container.querySelector('#senderPhone')!, {
    target: {
      value: '1234567545'
    }
  });

  fireEvent.change(getByTestId('senderEmail'), {
    target: {
      value: 'test@test.com'
    }
  });
};

jest.mock('react-router-dom', () => ({
  useHistory: () => useHistoryMock
}));

describe('CreateOrder', () => {
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
        const { getByTestId, queryByTestId } = render(<CreateOrder />);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        await wait(() => {
          expect(queryByTestId('cargoName')).not.toBeInTheDocument();
        });
      });

      it('should move to CargoForm if current form is valid', async () => {
        const { getByTestId } = render(<CreateOrder />);

        fillDestinationForm(getByTestId);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        expect(getByTestId('cargoName')).toBeInTheDocument();
      });
    });
  });

  describe('CargoFrom', () => {
    it('should render successfully', async () => {
      const { baseElement, getByTestId } = render(<CreateOrder />);
      fillDestinationForm(getByTestId);

      await wait(() => {
        fireEvent.click(getByTestId('next'));
      });

      expect(baseElement).toMatchSnapshot();
    });

    describe('Validations', () => {
      describe('cargoName', () => {
        it('should display required error', async () => {
          const { container, getByTestId } = render(<CreateOrder />);
          fillDestinationForm(getByTestId);

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
          fillDestinationForm(getByTestId);

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
          fillDestinationForm(getByTestId);

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
          fillDestinationForm(getByTestId);

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
        const { getByTestId, queryByTestId } = render(<CreateOrder />);
        fillDestinationForm(getByTestId);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        await wait(() => {
          fireEvent.click(getByTestId('back'));
        });

        await wait(() => {
          expect(queryByTestId('cityFrom')).toBeInTheDocument();
        });
      });
    });

    describe('Next Step', () => {
      it('should not move to SenderForm if current form is invalid', async () => {
        const { getByTestId, queryByTestId } = render(<CreateOrder />);
        fillDestinationForm(getByTestId);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        await wait(() => {
          expect(queryByTestId('senderCompany')).not.toBeInTheDocument();
        });
      });

      it('should move to SenderForm if current form is valid', async () => {
        const { container, getByTestId, queryByTestId } = render(
          <CreateOrder />
        );
        fillDestinationForm(getByTestId);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillCargoForm(getByTestId, container);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        await wait(() => {
          expect(queryByTestId('senderCompany')).toBeInTheDocument();
        });
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
      fillDestinationForm(getByTestId);

      await wait(() => {
        fireEvent.click(getByTestId('next'));
      });

      fillCargoForm(getByTestId, container);

      await wait(() => {
        fireEvent.click(getByTestId('next'));
      });

      expect(baseElement).toMatchSnapshot();
    });

    describe('Validations', () => {
      describe('senderEmail', () => {
        it('should have required error', async () => {
          const { getByTestId, container } = render(<CreateOrder />);
          fillDestinationForm(getByTestId);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(getByTestId, container);

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
          fillDestinationForm(getByTestId);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(getByTestId, container);

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
          fillDestinationForm(getByTestId);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(getByTestId, container);

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
          fillDestinationForm(getByTestId);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(getByTestId, container);

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
          fillDestinationForm(getByTestId);

          await wait(() => {
            fireEvent.click(getByTestId('next'));
          });

          fillCargoForm(getByTestId, container);

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
        const { getByTestId, queryByTestId, container } = render(
          <CreateOrder />
        );
        fillDestinationForm(getByTestId);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillCargoForm(getByTestId, container);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        await wait(() => {
          fireEvent.click(getByTestId('back'));
        });

        await wait(() => {
          expect(queryByTestId('cargoName')).toBeInTheDocument();
        });
      });
    });

    describe('Create', () => {
      it('should send request and redirect', async () => {
        const { getByTestId, container } = render(<CreateOrder />);
        fillDestinationForm(getByTestId);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillCargoForm(getByTestId, container);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillSenderForm(getByTestId, container);

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

      it('should handle API errors', async () => {
        jest.spyOn(ordersClient, 'createOrderSelf').mockRejectedValueOnce({
          response: {
            data: {
              errors: [
                {
                  path: 'cityFrom',
                  message: 'Error'
                }
              ]
            }
          }
        });

        const { getByTestId, container, queryByTestId } = render(
          <CreateOrder />
        );

        fillDestinationForm(getByTestId);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillCargoForm(getByTestId, container);

        await wait(() => {
          fireEvent.click(getByTestId('next'));
        });

        fillSenderForm(getByTestId, container);

        await wait(() => {
          fireEvent.click(getByTestId('create'));
        });

        await wait(() => {
          expect(queryByTestId('cityFrom')).toBeInTheDocument();
        });

        expect(container.querySelector('#cityFrom-error')).toHaveTextContent(
          'Error'
        );
      });
    });
  });
});
