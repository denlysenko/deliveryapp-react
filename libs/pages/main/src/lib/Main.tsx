import React from 'react';

import { StyledMain } from './StyledMain';

/* eslint-disable-next-line */
export interface MainProps {}

export const Main = (props: MainProps) => {
  return (
    <StyledMain>
      <h1>Welcome to main page component!</h1>
    </StyledMain>
  );
};
