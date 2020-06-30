import React from 'react';
import { waitFor } from '@testing-library/react';

import {
  AuthProvider,
  messagesClient,
  MessagesProvider
} from '@deliveryapp/data-access';
import { message, renderWithRouter } from '@deliveryapp/testing';

import { Main } from '../Main';

const dispatch = jest.fn();

jest.mock('@deliveryapp/data-access', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...jest.requireActual<any>('@deliveryapp/data-access'),
  useMessages: jest.fn().mockImplementation(() => [
    {
      totalCount: 1,
      entities: {
        [message._id]: message
      }
    },
    dispatch
  ])
}));

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    get: jest.fn().mockResolvedValue({ data: { count: 0, rows: [] } })
  },
  fcmMessaging: {
    getToken: jest.fn().mockResolvedValue('socketId'),
    messaging: {
      deleteToken: jest.fn().mockResolvedValue({}),
      onMessage: jest.fn()
    },
    unsubscribe: jest.fn()
  }
}));

class IntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver
});

describe('Main', () => {
  beforeEach(() => {
    jest
      .spyOn(messagesClient, 'loadMessages')
      .mockResolvedValue({ data: { rows: [message], count: 1 } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = renderWithRouter(
      <AuthProvider>
        <MessagesProvider>
          <Main />
        </MessagesProvider>
      </AuthProvider>
    );
    await waitFor(() => {
      expect(messagesClient.loadMessages).toBeCalledTimes(1);
    });
    expect(baseElement).toBeTruthy();
  });
});
