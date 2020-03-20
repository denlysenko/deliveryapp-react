import React from 'react';

import { StyledSpinner } from './StyledSpinner';

export const Spinner = () => {
  return (
    <StyledSpinner>
      <div className="spinner center" data-testid="spinner">
        <div className="la-ball-clip-rotate-multiple la-3x">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </StyledSpinner>
  );
};
