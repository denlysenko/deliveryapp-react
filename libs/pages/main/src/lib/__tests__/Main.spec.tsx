import React from 'react';

import { AuthProvider } from '@deliveryapp/data-access';
import { renderWithRouter } from '@deliveryapp/testing';

import { Main } from '../Main';

describe('Main', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithRouter(
      <AuthProvider>
        <Main />
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
