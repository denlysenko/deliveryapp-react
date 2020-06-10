import React from 'react';

import { StyledUserForm } from './StyledUserForm';

/* eslint-disable-next-line */
export interface UserFormProps {}

export const UserForm = (props: UserFormProps) => {
  return (
    <StyledUserForm>
      <h1>Welcome to UserForm component!</h1>
    </StyledUserForm>
  );
};
