import React from 'react';
import { render } from '@testing-library/react';

import OrdersFilter from './OrdersFilter';

describe(' OrdersFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrdersFilter />);
    expect(baseElement).toBeTruthy();
  });
});
