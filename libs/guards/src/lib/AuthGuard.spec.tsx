import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render } from '@testing-library/react';

import { AuthProvider } from '@deliveryapp/data-access';

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
  it('should render spinner while waiting', () => {
    const history = createMemoryHistory();
    mockUseLoadSelf({
      waiting: true,
      isLoggedIn: false,
      user: null
    });

    const { getByTestId } = render(
      <AuthProvider>
        <Router history={history}>
          <AuthGuard>
            <TestRoute />
          </AuthGuard>
        </Router>
      </AuthProvider>
    );

    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('should redirect to auth if is not loggedIn', () => {
    const history = createMemoryHistory();

    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: false,
      user: null
    });

    render(
      <AuthProvider>
        <Router history={history}>
          <AuthGuard>
            <TestRoute />
          </AuthGuard>
        </Router>
      </AuthProvider>
    );

    expect(history.location.pathname).toEqual('/auth');
  });

  it('should render if loggedIn', () => {
    const history = createMemoryHistory();

    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: true,
      user: null
    });

    const { container } = render(
      <AuthProvider>
        <Router history={history}>
          <AuthGuard>
            <TestRoute />
          </AuthGuard>
        </Router>
      </AuthProvider>
    );

    expect(container).toContainHTML('You are on the test page');
  });
});
