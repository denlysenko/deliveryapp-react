import React, { useEffect, useState } from 'react';

import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { PageState, Paginator } from 'primereact/paginator';
import { Row } from 'primereact/row';

import dayjs from 'dayjs';
import { isNil } from 'lodash-es';

import { actionNames } from '@deliveryapp/common';
import {
  Log,
  LogsActionTypes,
  logsClient,
  LogsFilter as ILogsFilter,
  useLogs
} from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';
import { getSortField, getSortOrder } from '@deliveryapp/utils';

import { LogsFilter } from './LogsFilter/LogsFilter';
import { StyledLogs } from './StyledLogs';

const headerGroup = (
  <ColumnGroup>
    <Row>
      <Column
        header="Created At"
        field="createdAt"
        sortable
        className="createdAt"
      />
      <Column header="Action" field="action" />
      <Column header="User ID" field="userId" />
      <Column header="Additional Data" field="data" />
    </Row>
  </ColumnGroup>
);

const createdAtTemplate = (rowData: Log) => (
  <span>
    {isNil(rowData.createdAt)
      ? ''
      : dayjs(rowData.createdAt).format('DD.MM.YYYY')}
  </span>
);

const actionTemplate = (rowData: Log) => (
  <span>{actionNames[rowData.action]}</span>
);

const additionalDataTemplate = (rowData: Log) => (
  <span>{JSON.stringify(rowData.data)}</span>
);

export const Logs = () => {
  const [logsFilter, dispatch] = useLogs();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const doFiltering = (logsFilter: ILogsFilter['filter']) => {
    dispatch({
      type: LogsActionTypes.FILTER_CHANGE,
      payload: logsFilter
    });
  };

  const doSorting = ({
    sortField,
    sortOrder
  }: {
    sortField: string;
    sortOrder: number;
  }) => {
    dispatch({
      type: LogsActionTypes.SORTING_CHANGE,
      payload: { [sortField]: sortOrder === 1 ? 'asc' : 'desc' }
    });
  };

  const doPaging = ({ rows, page }: PageState) => {
    dispatch({
      type: LogsActionTypes.PAGE_CHANGE,
      payload: { limit: rows, offset: rows * page }
    });
  };

  useEffect(() => {
    setLoading(true);

    logsClient.getLogs(logsFilter).then(({ data: { rows, count } }) => {
      setLogs(rows);
      setTotalRecords(count);
      setLoading(false);
    });
  }, [logsFilter]);

  return (
    <>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <StyledLogs>
          <div className="card">
            <div className="p-grid">
              <div className="p-col-12">
                <LogsFilter
                  filter={logsFilter.filter}
                  handleFilterChange={doFiltering}
                />
              </div>
            </div>
            <DataTable
              value={logs}
              headerColumnGroup={headerGroup}
              sortField={getSortField(logsFilter.order)}
              sortOrder={getSortOrder(logsFilter.order)}
              onSort={doSorting}
            >
              <Column body={createdAtTemplate} />
              <Column body={actionTemplate} />
              <Column field="userId" />
              <Column body={additionalDataTemplate} />
            </DataTable>
            <Paginator
              rows={logsFilter.limit}
              totalRecords={totalRecords}
              first={logsFilter.offset}
              pageLinkSize={3}
              onPageChange={doPaging}
            />
          </div>
        </StyledLogs>
      )}
    </>
  );
};
