import React from 'react';
import { render } from '@testing-library/react';

import { Payments } from '../Payments';

describe('Payments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Payments />);
    expect(baseElement).toBeTruthy();
  });
});
