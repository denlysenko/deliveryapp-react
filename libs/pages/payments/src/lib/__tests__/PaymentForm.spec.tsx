import React from 'react';
import { render } from '@testing-library/react';

import { PaymentForm } from '../PaymentForm/PaymentForm';

describe('PaymentForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaymentForm />);
    expect(baseElement).toBeTruthy();
  });
});
