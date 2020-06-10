import React, { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { PageState, Paginator } from 'primereact/paginator';
import { Row } from 'primereact/row';

import dayjs from 'dayjs';
import { isNil } from 'lodash-es';

import { roleNames } from '@deliveryapp/common';
import {
  User,
  UsersActionTypes,
  usersClient,
  UsersFilter as IUsersFilter,
  useUsers
} from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';
import { getSortField, getSortOrder } from '@deliveryapp/utils';

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

const findSelectedUser = (users: User[], selectedUser: number | null) =>
  users.find((user) => user.id === selectedUser);

export const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useUsers();
  const [users, setUsers] = useState<User[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const doFiltering = (usersFilter: IUsersFilter['filter']) => {
    dispatch({
      type: UsersActionTypes.FILTER_CHANGE,
      payload: usersFilter
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
      type: UsersActionTypes.SORTING_CHANGE,
      payload: { [sortField]: sortOrder === 1 ? 'asc' : 'desc' }
    });
  };

  const doPaging = ({ rows, page }: PageState) => {
    dispatch({
      type: UsersActionTypes.PAGE_CHANGE,
      payload: { limit: rows, offset: rows * page }
    });
  };

  const selectUser = (id: number | null) => {
    dispatch({
      type: UsersActionTypes.SELECT_USER,
      payload: id
    });
  };

  useEffect(() => {
    setLoading(true);

    usersClient
      .getUsers(state.usersFilter)
      .then(({ data: { rows, count } }) => {
        setUsers(rows);
        setTotalRecords(count);
        setLoading(false);
      });
  }, [state.usersFilter]);

  return (
    <>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <StyledUsersList>
          <div className="topbar p-grid">
            <div className="users-filter p-md-8 p-col-12">
              <UsersFilter
                filter={state.usersFilter.filter}
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
            selection={findSelectedUser(users, state.selectedUser)}
            compareSelectionBy="equals"
            onSelectionChange={(e) => selectUser(e.value.id)}
            value={users}
            headerColumnGroup={headerGroup}
            sortField={getSortField(state.usersFilter.order)}
            sortOrder={getSortOrder(state.usersFilter.order)}
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
            rows={state.usersFilter.limit}
            totalRecords={totalRecords}
            first={state.usersFilter.offset}
            pageLinkSize={3}
            onPageChange={doPaging}
          />
        </StyledUsersList>
      )}
    </>
  );
};
