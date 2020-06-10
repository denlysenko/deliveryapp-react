import React from 'react';
import { render } from '@testing-library/react';

import { UsersList } from '../UsersList/UsersList';

describe('UsersList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UsersList />);
    expect(baseElement).toBeTruthy();
  });
});
