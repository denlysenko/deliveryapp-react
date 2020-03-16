import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render } from '@testing-library/react';

import { AuthProvider } from '@deliveryapp/data-access';
import { user } from '@deliveryapp/testing';

import { RolesGuard } from './RolesGuard';
import { useLoadSelf } from './useLoadSelf';

jest.mock('./useLoadSelf');

const TestRoute = () => <h1>You are on the test page</h1>;

const mockUseLoadSelf = (state: ReturnType<typeof useLoadSelf>) => {
  (useLoadSelf as jest.MockedFunction<
    typeof useLoadSelf
  >).mockImplementationOnce(() => state);
};

describe('RolesGuard', () => {
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
          <RolesGuard roles={[2]}>
            <TestRoute />
          </RolesGuard>
        </Router>
      </AuthProvider>
    );

    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('should redirect to / if is not loggedIn', () => {
    const history = createMemoryHistory();

    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: false,
      user: null
    });

    render(
      <AuthProvider>
        <Router history={history}>
          <RolesGuard roles={[2]}>
            <TestRoute />
          </RolesGuard>
        </Router>
      </AuthProvider>
    );

    expect(history.location.pathname).toEqual('/');
  });

  it('should redirect to / if user has no required role', () => {
    const history = createMemoryHistory();

    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: true,
      user
    });

    render(
      <AuthProvider>
        <Router history={history}>
          <RolesGuard roles={[2]}>
            <TestRoute />
          </RolesGuard>
        </Router>
      </AuthProvider>
    );

    expect(history.location.pathname).toEqual('/');
  });

  it('should render if user is loggedIn and has required role', () => {
    const history = createMemoryHistory();

    mockUseLoadSelf({
      waiting: false,
      isLoggedIn: true,
      user
    });

    const { container } = render(
      <AuthProvider>
        <Router history={history}>
          <RolesGuard roles={[1]}>
            <TestRoute />
          </RolesGuard>
        </Router>
      </AuthProvider>
    );

    expect(container).toContainHTML('You are on the test page');
  });
});
