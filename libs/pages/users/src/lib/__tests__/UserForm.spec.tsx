import React from 'react';
import { render } from '@testing-library/react';

import { UserForm } from '../UserForm/UserForm';

describe('UserForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserForm />);
    expect(baseElement).toBeTruthy();
  });
});
