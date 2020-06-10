import React, { useCallback, useState } from 'react';

import { SelectItem } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { debounce, isNil } from 'lodash-es';

import { UsersFilter as IUsersFilter } from '@deliveryapp/data-access';

import { StyledUsersFilter } from './StyledUsersFilter';

export const options: SelectItem[] = [
  {
    label: 'ID',
    value: 'id'
  },
  {
    label: 'Email',
    value: 'email'
  },
  {
    label: 'First Name',
    value: 'firstName'
  },
  {
    label: 'Last Name',
    value: 'lastName'
  }
];

export interface UsersFilterProps extends Pick<IUsersFilter, 'filter'> {
  handleFilterChange: (usersFilter: IUsersFilter['filter']) => void;
}

export const UsersFilter: React.FC<UsersFilterProps> = ({
  filter,
  handleFilterChange
}) => {
  const [searchTerm, setSearchTerm] = useState(
    !isNil(filter) ? Object.values(filter)[0] ?? '' : ''
  );

  const [criteria, setCriteria] = useState(
    !isNil(filter)
      ? Object.keys(filter)[0] ?? options[0].value
      : options[0].value
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleFilterChange = useCallback(
    debounce(
      (usersFilter: IUsersFilter['filter']) => handleFilterChange(usersFilter),
      500
    ),
    []
  );

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
    debounceHandleFilterChange({ [criteria]: value });
  };

  const handleDropdownChange = (event: { value: string }) => {
    const value = event.value;

    setCriteria(value);

    if (searchTerm) {
      handleFilterChange({ [value]: searchTerm });
    }
  };

  return (
    <StyledUsersFilter>
      <div className="users-filter p-grid">
        <div className="p-inputgroup p-col-12 p-md-6">
          <span className="p-inputgroup-addon">
            <i className="fa fa-search"></i>
          </span>
          <InputText
            data-testid="searchTerm"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div className="p-col-12 p-md-6">
          <Dropdown
            options={options}
            value={criteria}
            onChange={handleDropdownChange}
          />
        </div>
      </div>
    </StyledUsersFilter>
  );
};
