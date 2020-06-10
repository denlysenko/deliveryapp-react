import React from 'react';

import { StyledUsersList } from './StyledUsersList';

/* eslint-disable-next-line */
export interface UsersListProps {}

export const UsersList = (props: UsersListProps) => {
  return (
    <StyledUsersList>
      <h1>Welcome to UsersList component!</h1>
    </StyledUsersList>
  );
};
