import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { AddressForm } from './AddressForm';

const address = {
  country: '',
  city: '',
  street: '',
  house: ''
};

const handleChange = jest.fn();

describe('[Profile] AddressForm', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render address form', () => {
    const { baseElement } = render(
      <AddressForm address={address} handleChange={handleChange} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
