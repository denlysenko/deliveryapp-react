import React, { useState, useCallback } from 'react';

import { SelectItem } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { debounce, isNil } from 'lodash-es';

import { OrdersFilter as IOrdersFilter } from '@deliveryapp/data-access';

import { StyledOrdersFilter } from './StyledOrdersFilter';

export const options: SelectItem[] = [
  {
    label: 'Order number',
    value: 'id'
  },
  {
    label: 'Cargo Name',
    value: 'cargoName'
  },
  {
    label: 'From',
    value: 'cityFrom'
  },
  {
    label: 'To',
    value: 'cityTo'
  }
];

export interface OrdersFilterProps extends Pick<IOrdersFilter, 'filter'> {
  handleFilterChange: (orderFilter: IOrdersFilter['filter']) => void;
}

export const OrdersFilter: React.FC<OrdersFilterProps> = ({
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

  // https://github.com/facebook/react/issues/1360#issuecomment-533847123
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleFilterChange = useCallback(
    debounce(
      (orderFilter: IOrdersFilter['filter']) => handleFilterChange(orderFilter),
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
    <StyledOrdersFilter>
      <div className="order-filter p-grid">
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
    </StyledOrdersFilter>
  );
};
