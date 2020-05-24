import React from 'react';

import { InputText } from 'primereact/inputtext';

import { StyledPaymentsFilter } from './StyledPaymentsFilter';

/* eslint-disable-next-line */
export interface PaymentsFilterProps {}

export const PaymentsFilter = (props: PaymentsFilterProps) => {
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
        />
      </div>
    </StyledPaymentsFilter>
  );
};
