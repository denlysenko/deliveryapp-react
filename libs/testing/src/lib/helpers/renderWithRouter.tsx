import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export function renderWithRouter(ui: React.ReactElement) {
  const history = createMemoryHistory();

  const Wrapper: React.FC<{}> = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history
  };
}
