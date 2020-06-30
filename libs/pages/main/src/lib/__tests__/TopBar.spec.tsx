import React from 'react';

import { fireEvent, screen, waitFor } from '@testing-library/react';

import { apiClient } from '@deliveryapp/core';
import {
  AuthProvider,
  MessagesProvider,
  useAuth
} from '@deliveryapp/data-access';
import { renderWithRouter, user } from '@deliveryapp/testing';

import { TopBar } from '../TopBar/TopBar';

jest.mock('@deliveryapp/data-access', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...jest.requireActual<any>('@deliveryapp/data-access'),
  useAuth: jest
    .fn()
    .mockImplementation(() => [{ user, isLoggedIn: true }, jest.fn()]),
  useMessages: jest.fn().mockImplementation(() => [{ unread: 1 }])
}));

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    removeAuthHeader: jest.fn(),
    post: jest.fn().mockResolvedValue({})
  },
  fcmMessaging: {
    getToken: jest.fn().mockResolvedValue('socketId'),
    messaging: {
      deleteToken: jest.fn().mockResolvedValue({})
    },
    unsubscribe: jest.fn()
  }
}));

const showMessages = jest.fn();

describe('TopBar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = renderWithRouter(
      <AuthProvider>
        <MessagesProvider>
          <TopBar showMessages={showMessages} />
        </MessagesProvider>
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should unread count', () => {
    renderWithRouter(
      <AuthProvider>
        <MessagesProvider>
          <TopBar showMessages={showMessages} />
        </MessagesProvider>
      </AuthProvider>
    );

    expect(screen.getByTestId('unread').innerHTML).toBe('1');
  });

  it('should display firstName and lastName if exists', () => {
    const { queryByText } = renderWithRouter(
      <AuthProvider>
        <MessagesProvider>
          <TopBar showMessages={showMessages} />
        </MessagesProvider>
      </AuthProvider>
    );

    expect(queryByText(user.firstName)).toBeTruthy();
    expect(queryByText(user.lastName)).toBeTruthy();
  });

  it('should display email if firstName and lastName not exist', () => {
    (useAuth as jest.MockedFunction<
      typeof useAuth
    >).mockImplementationOnce(() => [
      { user: { ...user, firstName: '', lastName: '' }, isLoggedIn: true },
      jest.fn()
    ]);

    const { queryByText } = renderWithRouter(
      <AuthProvider>
        <MessagesProvider>
          <TopBar showMessages={showMessages} />
        </MessagesProvider>
      </AuthProvider>
    );

    expect(queryByText(user.firstName)).toBeNull();
    expect(queryByText(user.lastName)).toBeNull();
    expect(queryByText(user.email)).toBeTruthy();
  });

  it('should navigate to profile', () => {
    const { getByText, getByTestId, history } = renderWithRouter(
      <AuthProvider>
        <MessagesProvider>
          <TopBar showMessages={showMessages} />
        </MessagesProvider>
      </AuthProvider>
    );

    fireEvent.click(getByTestId('menu'));
    fireEvent.click(getByText('Profile'));

    expect(history.location.pathname).toEqual('/profile');
  });

  it('should logout', async () => {
    const { getByText, getByTestId, history } = renderWithRouter(
      <AuthProvider>
        <MessagesProvider>
          <TopBar showMessages={showMessages} />
        </MessagesProvider>
      </AuthProvider>
    );

    fireEvent.click(getByTestId('menu'));
    fireEvent.click(getByText('Logout'));

    await waitFor(() => {
      expect(apiClient.post).toBeCalledTimes(1);
    });

    expect(history.location.pathname).toEqual('/auth');
  });
});
