import React from 'react';
import { render } from '@testing-library/react';

import { PaymentsFilter } from '../PaymentsFilter/PaymentsFilter';

describe('PaymentsFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaymentsFilter />);
    expect(baseElement).toBeTruthy();
  });
});
