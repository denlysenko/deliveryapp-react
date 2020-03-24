import React from 'react';
import { cleanup } from '@testing-library/react';

import { AuthProvider } from '@deliveryapp/data-access';
import { renderWithRouter } from '@deliveryapp/testing';

import { AnonymousGuard } from '../AnonymousGuard';

const TestRoute = () => <h1>You are on the test page</h1>;

describe('AnonymousGuard', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should redirect to / when token is in localStorage', () => {
    jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue('token');

    const { history } = renderWithRouter(
      <AuthProvider>
        <AnonymousGuard>
          <TestRoute />
        </AnonymousGuard>
      </AuthProvider>
    );

    expect(history.location.pathname).toEqual('/');
  });

  it('should render component', () => {
    jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue(undefined);

    const { container } = renderWithRouter(
      <AuthProvider>
        <AnonymousGuard>
          <TestRoute />
        </AnonymousGuard>
      </AuthProvider>
    );

    expect(container).toContainHTML('You are on the test page');
  });
});
