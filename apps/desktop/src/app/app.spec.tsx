import React from 'react';
import { render } from '@testing-library/react';

import App from './app';

jest.mock('@deliveryapp/core', () => ({
  apiClient: {
    setBaseUrl: jest.fn()
  },
  fcmMessaging: {
    init: jest.fn()
  }
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
