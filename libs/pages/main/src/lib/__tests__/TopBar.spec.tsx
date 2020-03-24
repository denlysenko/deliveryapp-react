import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { AuthProvider, useAuth } from '@deliveryapp/data-access';
import { user, renderWithRouter } from '@deliveryapp/testing';

import { TopBar } from '../TopBar/TopBar';

jest.mock('@deliveryapp/data-access', () => ({
  ...require.requireActual('@deliveryapp/data-access'),
  useAuth: jest
    .fn()
    .mockImplementation(() => [{ user, isLoggedIn: true }, jest.fn()])
}));

const showMessages = jest.fn();

describe('TopBar', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = renderWithRouter(
      <AuthProvider>
        <TopBar showMessages={showMessages} />
      </AuthProvider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should display firstName and lastName if exists', () => {
    const { queryByText } = renderWithRouter(
      <AuthProvider>
        <TopBar showMessages={showMessages} />
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
        <TopBar showMessages={showMessages} />
      </AuthProvider>
    );

    expect(queryByText(user.firstName)).toBeNull();
    expect(queryByText(user.lastName)).toBeNull();
    expect(queryByText(user.email)).toBeTruthy();
  });

  it('should navigate to profile', () => {
    const { getByText, getByTestId, history } = renderWithRouter(
      <AuthProvider>
        <TopBar showMessages={showMessages} />
      </AuthProvider>
    );

    fireEvent.click(getByTestId('menu'));
    fireEvent.click(getByText('Profile'));

    expect(history.location.pathname).toEqual('/profile');
  });

  it('should logout', () => {
    const { getByText, getByTestId, history } = renderWithRouter(
      <AuthProvider>
        <TopBar showMessages={showMessages} />
      </AuthProvider>
    );

    fireEvent.click(getByTestId('menu'));
    fireEvent.click(getByText('Logout'));

    expect(history.location.pathname).toEqual('/auth');
  });
});
