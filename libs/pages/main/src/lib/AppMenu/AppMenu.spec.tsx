import React from 'react';
import { cleanup } from '@testing-library/react';

import { Roles } from '@deliveryapp/common';
import { AuthProvider, useAuth } from '@deliveryapp/data-access';
import { renderWithRouter, user } from '@deliveryapp/testing';

import { AppMenu } from './AppMenu';

jest.mock('@deliveryapp/data-access', () => ({
  ...require.requireActual('@deliveryapp/data-access'),
  useAuth: jest
    .fn()
    .mockImplementation(() => [{ user, isLoggedIn: true }, jest.fn()])
}));

describe('AppMenu', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = renderWithRouter(
      <AuthProvider>
        <AppMenu />
      </AuthProvider>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should display links for clients', () => {
    const { getAllByTestId } = renderWithRouter(
      <AuthProvider>
        <AppMenu />
      </AuthProvider>
    );

    expect(getAllByTestId('link')).toHaveLength(2);
  });

  it('should display links for admin', () => {
    (useAuth as jest.MockedFunction<
      typeof useAuth
    >).mockImplementationOnce(() => [
      { user: { ...user, role: Roles.ADMIN }, isLoggedIn: true },
      jest.fn()
    ]);

    const { getAllByTestId } = renderWithRouter(
      <AuthProvider>
        <AppMenu />
      </AuthProvider>
    );

    expect(getAllByTestId('link')).toHaveLength(5);
  });
});
