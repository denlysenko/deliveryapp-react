import React, { useState } from 'react';

import { SelectItem } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';

import { isNil } from 'lodash-es';

import { actionNames } from '@deliveryapp/common';
import { LogsFilter as ILogsFilter } from '@deliveryapp/data-access';

import { StyledLogsFilter } from './StyledLogsFilter';

export const options: SelectItem[] = actionNames.map((value, index) => ({
  label: value,
  value: index
}));

export interface LogsFilterProps extends Pick<ILogsFilter, 'filter'> {
  handleFilterChange: (logsFilter: ILogsFilter['filter']) => void;
}

export const LogsFilter: React.FC<LogsFilterProps> = ({
  filter,
  handleFilterChange
}) => {
  const [criteria, setCriteria] = useState(
    !isNil(filter)
      ? Object.values(filter)[0] ?? options[0].value
      : options[0].value
  );

  const handleDropdownChange = (event: { value: string }) => {
    const value = parseInt(event.value, 10);

    setCriteria(value);
    handleFilterChange({ action: value });
  };

  return (
    <StyledLogsFilter>
      <div className="logs-filter p-grid">
        <div className="p-col-12 p-md-6">
          <label>Action</label>
          <Dropdown
            options={options}
            value={criteria}
            onChange={handleDropdownChange}
          />
        </div>
      </div>
    </StyledLogsFilter>
  );
};
