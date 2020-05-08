import React from 'react';
import { render } from '@testing-library/react';

import PagesOrders from './PagesOrders';

describe(' PagesOrders', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesOrders />);
    expect(baseElement).toBeTruthy();
  });
});
