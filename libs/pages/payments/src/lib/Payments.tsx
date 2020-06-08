import React from 'react';

import { PaymentForm } from './PaymentForm/PaymentForm';
import { PaymentsList } from './PaymentsList/PaymentsList';
import { StyledPayments } from './StyledPayments';

export const Payments = () => (
  <StyledPayments>
    <div className="p-grid">
      <div className="p-lg-3 p-md-4 p-col-12">
        <div className="card">
          <PaymentForm />
        </div>
      </div>
      <div className="p-lg-9 p-md-8 p-col-12">
        <div className="card">
          <PaymentsList />
        </div>
      </div>
    </div>
  </StyledPayments>
);
