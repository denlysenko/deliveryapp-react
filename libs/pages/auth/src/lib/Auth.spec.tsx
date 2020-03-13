import React from 'react';
import { render } from '@testing-library/react';

import { Auth } from './Auth';

describe('Auth Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Auth />);
    expect(baseElement).toBeTruthy();
  });
});
