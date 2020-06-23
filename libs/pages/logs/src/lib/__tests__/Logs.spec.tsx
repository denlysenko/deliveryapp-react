import React from 'react';
import { render } from '@testing-library/react';

import { Logs } from '../Logs';

describe('Logs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Logs />);
    expect(baseElement).toBeTruthy();
  });
});
