import React from 'react';
import { render } from '@testing-library/react';

import { CreateOrder } from '../CreateOrder';

describe('CreateOrder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateOrder />);
    expect(baseElement).toBeTruthy();
  });
});
