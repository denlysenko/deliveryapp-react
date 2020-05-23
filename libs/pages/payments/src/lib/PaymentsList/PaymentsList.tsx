import React from 'react';

import { StyledPaymentsList } from './StyledPaymentsList';

/* eslint-disable-next-line */
export interface PaymentsListProps {}

export const PaymentsList = (props: PaymentsListProps) => {
  return (
    <StyledPaymentsList>
      <h1>Welcome to PaymentsList component!</h1>
    </StyledPaymentsList>
  );
};
