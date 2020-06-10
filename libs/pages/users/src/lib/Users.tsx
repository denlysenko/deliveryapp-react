import React from 'react';

import { StyledUsers } from './StyledUsers';
import { UserForm } from './UserForm/UserForm';
import { UsersList } from './UsersList/UsersList';

export const Users = () => {
  return (
    <StyledUsers>
      <div className="p-grid">
        <div className="p-lg-3 p-md-4 p-col-12">
          <div className="card">
            <UserForm />
          </div>
        </div>
        <div className="p-lg-9 p-md-8 p-col-12">
          <div className="card">
            <UsersList />
          </div>
        </div>
      </div>
    </StyledUsers>
  );
};
