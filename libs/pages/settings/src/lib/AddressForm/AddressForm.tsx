import React, { useRef } from 'react';

import { Growl } from 'primereact/growl';

import { StyledAddressForm } from './StyledAddressForm';

export const AddressForm = () => {
  const growl = useRef<Growl>(null);

  return (
    <StyledAddressForm>
      <Growl ref={growl} />
      <h1>Welcome to AddressForm component!</h1>
    </StyledAddressForm>
  );
};
