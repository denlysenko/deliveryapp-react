import React from 'react';

import { StyledFullPageSpinner } from './StyledFullPageSpinner';

export const FullPageSpinner = () => {
  return (
    <StyledFullPageSpinner>
      <div className="spinner center" data-testid="spinner">
        <div className="la-ball-clip-rotate-multiple la-3x">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </StyledFullPageSpinner>
  );
};
