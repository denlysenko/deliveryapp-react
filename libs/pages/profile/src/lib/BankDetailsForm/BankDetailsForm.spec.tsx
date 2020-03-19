import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { BankDetailsForm } from './BankDetailsForm';

const bankDetails = {
  name: '',
  accountNumber: '',
  bin: '',
  swift: ''
};

const handleChange = jest.fn();

describe('[Profile] BankDetailsForm', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render bank details form', () => {
    const { baseElement } = render(
      <BankDetailsForm bankDetails={bankDetails} handleChange={handleChange} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
