import React from 'react';
import { render } from '@testing-library/react';

import { PaymentsList } from '../PaymentsList/PaymentsList';

describe('PaymentsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaymentsList />);
    expect(baseElement).toBeTruthy();
  });
});
