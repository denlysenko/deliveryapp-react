import React from 'react';
import { render } from '@testing-library/react';

import { UsersFilter } from '../UsersFilter/UsersFilter';

describe('UsersFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsersFilter />);
    expect(baseElement).toBeTruthy();
  });
});
