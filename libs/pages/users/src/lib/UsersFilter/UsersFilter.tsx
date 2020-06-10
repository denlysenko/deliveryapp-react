import React from 'react';

import { StyledUsersFilter } from './StyledUsersFilter';

/* eslint-disable-next-line */
export interface UsersFilterProps {}

export const UsersFilter = (props: UsersFilterProps) => {
  return (
    <StyledUsersFilter>
      <h1>Welcome to UsersFilter component!</h1>
    </StyledUsersFilter>
  );
};
