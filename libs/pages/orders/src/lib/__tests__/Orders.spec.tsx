import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { DEFAULT_LIMIT } from '@deliveryapp/common';
import {
  Order,
  ordersClient,
  OrdersProvider,
  AuthProvider
} from '@deliveryapp/data-access';
import { renderWithRouter, savedOrder, user } from '@deliveryapp/testing';

import { Orders } from '../Orders';

jest.mock('@deliveryapp/data-access', () => ({
  ...jest.requireActual('@deliveryapp/data-access'),
  useAuth: jest.fn().mockImplementation(() => [{ user }, jest.fn()])
}));

const orders: Order[] = [];

for (let i = 0; i < 12; i++) {
  orders.push(savedOrder);
}

describe('Orders Page', () => {
  beforeEach(() => {
    jest.spyOn(ordersClient, 'getOrders').mockResolvedValue({
      data: { rows: orders, count: 11 }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = renderWithRouter(
      <AuthProvider>
        <OrdersProvider>
          <Orders />
        </OrdersProvider>
      </AuthProvider>
    );
    await waitFor(() => expect(ordersClient.getOrders).toBeCalledTimes(1));
    expect(baseElement).toMatchSnapshot();
  });

  it('should get orders with default filter', async () => {
    renderWithRouter(
      <AuthProvider>
        <OrdersProvider>
          <Orders />
        </OrdersProvider>
      </AuthProvider>
    );

    await waitFor(() => expect(ordersClient.getOrders).toBeCalledTimes(1));

    expect(ordersClient.getOrders).toBeCalledWith({
      filter: {},
      limit: DEFAULT_LIMIT,
      offset: 0,
      order: {
        id: 'desc'
      }
    });
  });

  describe('filtering', () => {
    it('should filter orders', async () => {
      renderWithRouter(
        <AuthProvider>
          <OrdersProvider>
            <Orders />
          </OrdersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(ordersClient.getOrders).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.change(screen.getByPlaceholderText(/search/i), {
        target: {
          value: 'test'
        }
      });

      await waitFor(() => {
        expect(ordersClient.getOrders).toBeCalledWith({
          filter: {
            id: 'test'
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
    it('should filter orders by id', async () => {
      renderWithRouter(
        <AuthProvider>
          <OrdersProvider>
            <Orders />
          </OrdersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(ordersClient.getOrders).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('Num.'));

      await waitFor(() => {
        expect(ordersClient.getOrders).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            id: 'asc'
          }
        });
      });
    });

    it('should filter orders by cargo name', async () => {
      renderWithRouter(
        <AuthProvider>
          <OrdersProvider>
            <Orders />
          </OrdersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(ordersClient.getOrders).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getAllByText('Cargo Name')[1]);

      await waitFor(() => {
        expect(ordersClient.getOrders).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            cargoName: 'asc'
          }
        });
      });
    });

    it('should filter orders by city from', async () => {
      renderWithRouter(
        <AuthProvider>
          <OrdersProvider>
            <Orders />
          </OrdersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(ordersClient.getOrders).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getAllByText('From')[1]);

      await waitFor(() => {
        expect(ordersClient.getOrders).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            cityFrom: 'asc'
          }
        });
      });
    });

    it('should filter orders by city to', async () => {
      renderWithRouter(
        <AuthProvider>
          <OrdersProvider>
            <Orders />
          </OrdersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(ordersClient.getOrders).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getAllByText('To')[1]);

      await waitFor(() => {
        expect(ordersClient.getOrders).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            cityTo: 'asc'
          }
        });
      });
    });
  });

  describe('pagination', () => {
    it('should paginate orders', async () => {
      renderWithRouter(
        <AuthProvider>
          <OrdersProvider>
            <Orders />
          </OrdersProvider>
        </AuthProvider>
      );
      await waitFor(() => expect(ordersClient.getOrders).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('2'));

      await waitFor(() => {
        expect(ordersClient.getOrders).toBeCalledWith({
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
