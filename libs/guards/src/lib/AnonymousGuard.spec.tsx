import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render } from '@testing-library/react';

import { AuthProvider } from '@deliveryapp/data-access';

import { AnonymousGuard } from './AnonymousGuard';

const TestRoute = () => <h1>You are on the test page</h1>;

describe('AnonymousGuard', () => {
  it('should redirect to / when token is in localStorage', () => {
    jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue('token');

    const history = createMemoryHistory();

    render(
      <AuthProvider>
        <Router history={history}>
          <AnonymousGuard>
            <TestRoute />
          </AnonymousGuard>
        </Router>
      </AuthProvider>
    );

    expect(history.location.pathname).toEqual('/');
  });

  it('should render component', () => {
    jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue(undefined);

    const history = createMemoryHistory();

    const { container } = render(
      <AuthProvider>
        <Router history={history}>
          <AnonymousGuard>
            <TestRoute />
          </AnonymousGuard>
        </Router>
      </AuthProvider>
    );

    expect(container).toContainHTML('You are on the test page');
  });
});
