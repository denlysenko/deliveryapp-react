import React from 'react';
import { render } from '@testing-library/react';

import { BankDetailsForm } from '../BankDetailsForm/BankDetailsForm';

describe('BankDetailsForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BankDetailsForm />);
    expect(baseElement).toBeTruthy();
  });
});
