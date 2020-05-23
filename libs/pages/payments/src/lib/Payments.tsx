import React from 'react';

import { StyledPayments } from './StyledPayments';

/* eslint-disable-next-line */
export interface PaymentsProps {}

export const Payments = (props: PaymentsProps) => {
  return (
    <StyledPayments>
      <h1>Welcome to pages-payments component!</h1>
    </StyledPayments>
  );
};
