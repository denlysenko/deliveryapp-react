import React from 'react';
import { render } from '@testing-library/react';

import TopBar from './TopBar';

describe(' TopBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopBar />);
    expect(baseElement).toBeTruthy();
  });
});
