import React, { useRef } from 'react';

import { Growl } from 'primereact/growl';

import { StyledBankDetailsForm } from './StyledBankDetailsForm';

export const BankDetailsForm = () => {
  const growl = useRef<Growl>(null);

  return (
    <StyledBankDetailsForm>
      <Growl ref={growl} />
      <h1>Welcome to BankDetailsForm component!</h1>
    </StyledBankDetailsForm>
  );
};
