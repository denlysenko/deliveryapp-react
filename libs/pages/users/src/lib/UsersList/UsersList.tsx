import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { PageState, Paginator } from 'primereact/paginator';
import { Row } from 'primereact/row';

import dayjs from 'dayjs';
import { isNil } from 'lodash-es';

import { roleNames } from '@deliveryapp/common';
import { User, UsersFilter as IUsersFilter } from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';

import { UsersFilter } from '../UsersFilter/UsersFilter';
import { StyledUsersList } from './StyledUsersList';

const headerGroup = (
  <ColumnGroup>
    <Row>
      <Column header="ID" field="id" sortable className="id" />
      <Column header="Email" field="email" sortable className="email" />
      <Column
        header="First Name"
        field="firstName"
        sortable
        className="firstName"
      />
      <Column
        header="Last Name"
        field="lastName"
        sortable
        className="lastName"
      />
      <Column header="Phone" />
      <Column header="Role" />
      <Column
        header="Created At"
        field="createdAt"
        sortable
        className="createdAt"
      />
    </Row>
  </ColumnGroup>
);

const createdAtTemplate = (rowData: User) => (
  <span>
    {isNil(rowData.createdAt)
      ? ''
      : dayjs(rowData.createdAt).format('DD.MM.YYYY')}
  </span>
);

const roleTemplate = (rowData: User) => <span>{roleNames[rowData.role]}</span>;

export const UsersList = () => {
  const [loading, setLoading] = useState(false);

  const doFiltering = (usersFilter: IUsersFilter['filter']) => {
    console.log(usersFilter);
  };

  const doSorting = ({
    sortField,
    sortOrder
  }: {
    sortField: string;
    sortOrder: number;
  }) => {
    console.log('sorting');
  };

  const doPaging = ({ rows, page }: PageState) => {
    console.log('paging');
  };

  const selectUser = (id: number | null) => {
    console.log(id);
  };

  return (
    <>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <StyledUsersList>
          <div className="topbar p-grid">
            <div className="users-filter p-md-8 p-col-12">
              <UsersFilter
                // filter={state.paymentsFilter.filter}
                handleFilterChange={doFiltering}
              />
            </div>
            <div className="button p-md-4 p-col-12">
              <Button
                type="button"
                label="Create user"
                icon="fa fa-plus"
                iconPos="left"
                className="raised-btn"
                data-testid="create-user"
                onClick={() => selectUser(null)}
              />
            </div>
          </div>
          <DataTable
            selectionMode="single"
            // selection={findSelectedPayment(payments, state.selectedPayment)}
            compareSelectionBy="equals"
            // onSelectionChange={(e) => selectPayment(e.value.id)}
            value={[]}
            headerColumnGroup={headerGroup}
            sortField={/*getSortField(state.paymentsFilter.order)*/ 'id'}
            sortOrder={/*getSortOrder(state.paymentsFilter.order)*/ -1}
            onSort={doSorting}
          >
            <Column field="id" />
            <Column field="email" />
            <Column field="firstName" />
            <Column field="lastName" />
            <Column field="phone" />
            <Column body={roleTemplate} />
            <Column body={createdAtTemplate} />
          </DataTable>
          <Paginator
            rows={/*state.paymentsFilter.limit*/ 10}
            totalRecords={/*totalRecords*/ 0}
            first={/*state.paymentsFilter.offset*/ 0}
            pageLinkSize={3}
            onPageChange={doPaging}
          />
        </StyledUsersList>
      )}
    </>
  );
};
