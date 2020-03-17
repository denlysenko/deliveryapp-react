import React from 'react';
import { cleanup } from '@testing-library/react';

import { AuthProvider } from '@deliveryapp/data-access';
import { renderWithRouter } from '@deliveryapp/testing';

import { AuthGuard } from './AuthGuard';
import { useLoadSelf } from './useLoadSelf';

jest.mock('./useLoadSelf');

const TestRoute = () => <h1>You are on the test page</h1>;

const mockUseLoadSelf = (state: ReturnType<typeof useLoadSelf>) => {
  (useLoadSelf as jest.MockedFunction<
    typeof useLoadSelf
  >).mockImplementationOnce(() => state);
};

describe('AuthGuard', () => {
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
        <AuthGuard>
          <TestRoute />
        </AuthGuard>
      </AuthProvider>
    );

    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('should redirect to auth if is not loggedIn', () => {
    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: false,
      user: null
    });

    const { history } = renderWithRouter(
      <AuthProvider>
        <AuthGuard>
          <TestRoute />
        </AuthGuard>
      </AuthProvider>
    );

    expect(history.location.pathname).toEqual('/auth');
  });

  it('should render if loggedIn', () => {
    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: true,
      user: null
    });

    const { container } = renderWithRouter(
      <AuthProvider>
        <AuthGuard>
          <TestRoute />
        </AuthGuard>
      </AuthProvider>
    );

    expect(container).toContainHTML('You are on the test page');
  });
});
