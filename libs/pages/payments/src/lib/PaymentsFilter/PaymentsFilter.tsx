import React from 'react';

import { StyledPaymentsFilter } from './StyledPaymentsFilter';

/* eslint-disable-next-line */
export interface PaymentsFilterProps {}

export const PaymentsFilter = (props: PaymentsFilterProps) => {
  return (
    <StyledPaymentsFilter>
      <h1>Welcome to PaymentsFilter component!</h1>
    </StyledPaymentsFilter>
  );
};
