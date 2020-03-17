import React from 'react';
import { render } from '@testing-library/react';

import PagesProfile from './PagesProfile';

describe(' PagesProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PagesProfile />);
    expect(baseElement).toBeTruthy();
  });
});
