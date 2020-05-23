import React from 'react';

import { StyledPaymentForm } from './StyledPaymentForm';

/* eslint-disable-next-line */
export interface PaymentFormProps {}

export const PaymentForm = (props: PaymentFormProps) => {
  return (
    <StyledPaymentForm>
      <h1>Welcome to PaymentForm component!</h1>
    </StyledPaymentForm>
  );
};
