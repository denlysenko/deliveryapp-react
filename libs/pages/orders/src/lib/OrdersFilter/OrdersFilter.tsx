import React from 'react';

import { SelectItem } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { OrdersFilter as IOrdersFilter } from '@deliveryapp/data-access';

import { StyledOrdersFilter } from './StyledOrdersFilter';

const options: SelectItem[] = [
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
  handleFilterChange: () => void;
}

export const OrdersFilter: React.FC<OrdersFilterProps> = ({
  filter,
  handleFilterChange
}) => {
  const handleInputChange = (e: any) => {
    console.log(e.target.value);
  };

  const handleDropdownChange = (e: any) => {
    console.log(e);
  };

  return (
    <StyledOrdersFilter>
      <div className="order-filter p-grid">
        <div className="p-inputgroup p-col-12 p-md-6">
          <span className="p-inputgroup-addon">
            <i className="fa fa-search"></i>
          </span>
          <InputText
            type="text"
            placeholder="Search..."
            onChange={handleInputChange}
          />
        </div>
        <div className="p-col-12 p-md-6">
          <Dropdown
            options={options}
            value={options[0].value}
            onChange={handleDropdownChange}
          />
        </div>
      </div>
    </StyledOrdersFilter>
  );
};
