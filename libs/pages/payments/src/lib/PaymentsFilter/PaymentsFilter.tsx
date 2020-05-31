import React, { useCallback, useState } from 'react';
import { InputText } from 'primereact/inputtext';

import { debounce, isNil } from 'lodash-es';

import { PaymentsFilter as IPaymentsFilter } from '@deliveryapp/data-access';

import { StyledPaymentsFilter } from './StyledPaymentsFilter';

export interface PaymentsFilterProps extends Pick<IPaymentsFilter, 'filter'> {
  handleFilterChange: (paymentsFilter: IPaymentsFilter['filter']) => void;
}

export const PaymentsFilter: React.FC<PaymentsFilterProps> = ({
  filter,
  handleFilterChange
}) => {
  const [searchTerm, setSearchTerm] = useState(
    !isNil(filter) ? Object.values(filter)[0] ?? '' : ''
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleFilterChange = useCallback(
    debounce(
      (paymentsFilter: IPaymentsFilter['filter']) =>
        handleFilterChange(paymentsFilter),
      500
    ),
    []
  );

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
    debounceHandleFilterChange({
      id: value === '' ? undefined : parseInt(value, 10)
    });
  };

  return (
    <StyledPaymentsFilter>
      <div className="p-inputgroup p-col-12 p-md-6">
        <span className="p-inputgroup-addon">
          <i className="fa fa-search"></i>
        </span>
        <InputText
          data-testid="searchTerm"
          type="text"
          placeholder="Search by number..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </StyledPaymentsFilter>
  );
};
