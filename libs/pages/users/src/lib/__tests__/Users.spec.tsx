import React from 'react';
import { render } from '@testing-library/react';

import { Users } from '../Users';

describe('Users', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Users />);
    expect(baseElement).toBeTruthy();
  });
});
