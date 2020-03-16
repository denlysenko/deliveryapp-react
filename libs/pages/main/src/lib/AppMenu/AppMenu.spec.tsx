import React from 'react';
import { render } from '@testing-library/react';

import AppMenu from './AppMenu';

describe(' AppMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppMenu />);
    expect(baseElement).toBeTruthy();
  });
});
