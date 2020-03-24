import React from 'react';
import { cleanup } from '@testing-library/react';

import { AuthProvider } from '@deliveryapp/data-access';
import { user, renderWithRouter } from '@deliveryapp/testing';

import { RolesGuard } from '../RolesGuard';
import { useLoadSelf } from '../useLoadSelf';

jest.mock('../useLoadSelf');

const TestRoute = () => <h1>You are on the test page</h1>;

const mockUseLoadSelf = (state: ReturnType<typeof useLoadSelf>) => {
  (useLoadSelf as jest.MockedFunction<
    typeof useLoadSelf
  >).mockImplementationOnce(() => state);
};

describe('RolesGuard', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render spinner while waiting', () => {
    mockUseLoadSelf({
      waiting: true,
      isLoggedIn: false,
      user: null
    });

    const { getByTestId } = renderWithRouter(
      <AuthProvider>
        <RolesGuard roles={[2]}>
          <TestRoute />
        </RolesGuard>
      </AuthProvider>
    );

    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('should redirect to / if is not loggedIn', () => {
    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: false,
      user: null
    });

    const { history } = renderWithRouter(
      <AuthProvider>
        <RolesGuard roles={[2]}>
          <TestRoute />
        </RolesGuard>
      </AuthProvider>
    );

    expect(history.location.pathname).toEqual('/');
  });

  it('should redirect to / if user has no required role', () => {
    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: true,
      user
    });

    const { history } = renderWithRouter(
      <AuthProvider>
        <RolesGuard roles={[2]}>
          <TestRoute />
        </RolesGuard>
      </AuthProvider>
    );

    expect(history.location.pathname).toEqual('/');
  });

  it('should render if user is loggedIn and has required role', () => {
    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: true,
      user
    });

    const { container } = renderWithRouter(
      <AuthProvider>
        <RolesGuard roles={[1]}>
          <TestRoute />
        </RolesGuard>
      </AuthProvider>
    );

    expect(container).toContainHTML('You are on the test page');
  });
});
