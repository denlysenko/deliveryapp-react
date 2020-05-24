import React, { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { PageState, Paginator } from 'primereact/paginator';
import { Row } from 'primereact/row';

import dayjs from 'dayjs';
import { isNil } from 'lodash-es';

import { paymentMethodNames, Roles } from '@deliveryapp/common';
import { Payment, useAuth, User } from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';
import { toCurrency } from '@deliveryapp/utils';

import { PaymentsFilter } from '../PaymentsFilter/PaymentsFilter';
import { StyledPaymentsList } from './StyledPaymentsList';

const headerGroup = (user: User | null) => (
  <ColumnGroup>
    <Row>
      <Column header="Num." field="id" sortable className="id" />
      <Column header="Total" field="total" sortable className="total" />
      <Column header="Payment Method" />
      <Column header="Payment Status" />
      <Column header="Due Date" />
      <Column header="Created At" />
      {user?.role !== Roles.CLIENT && <Column header="Client" />}
    </Row>
  </ColumnGroup>
);

const idTemplate = (rowData: Payment) => <a href="/">{rowData.id}</a>;

const methodTemplate = (rowData: Payment) => (
  <span>{paymentMethodNames[rowData.method]}</span>
);

const statusTemplate = (rowData: Payment) => (
  <span>{rowData.status ? 'Yes' : 'No'}</span>
);

const totalTemplate = (rowData: Payment) => (
  <span>{isNil(rowData.total) ? '' : toCurrency(rowData.total)}</span>
);

const dueDateTemplate = (rowData: Payment) => (
  <span>
    {isNil(rowData.dueDate) ? '' : dayjs(rowData.dueDate).format('DD.MM.YYYY')}
  </span>
);

const createdAtTemplate = (rowData: Payment) => (
  <span>
    {isNil(rowData.createdAt)
      ? ''
      : dayjs(rowData.createdAt).format('DD.MM.YYYY')}
  </span>
);

const clientTemplate = (rowData: Payment) => (
  <a href="/">{rowData.client?.email}</a>
);

export const PaymentsList = () => {
  const [{ user }] = useAuth();
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const doFiltering = () => {
    console.log('filtering');
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

  useEffect(() => {
    // setLoading(true);
    // ordersClient.getOrders(ordersFilter).then(({ data: { rows, count } }) => {
    //   setOrders(rows);
    //   setTotalRecords(count);
    //   setLoading(false);
    // });
  }, []);

  return (
    <>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <StyledPaymentsList>
          <div className="topbar p-grid">
            <div className="payment-filter p-md-8 p-col-12">
              <PaymentsFilter />
            </div>
            {user?.role !== Roles.CLIENT && (
              <div className="button p-md-4 p-col-12">
                <Button
                  type="button"
                  label="Create payment"
                  icon="fa fa-plus"
                  iconPos="left"
                  className="raised-btn"
                />
              </div>
            )}
          </div>
          <DataTable
            value={[]}
            headerColumnGroup={headerGroup(user)}
            onSort={doSorting}
          >
            <Column body={idTemplate} />
            <Column body={totalTemplate} />
            <Column body={methodTemplate} />
            <Column body={statusTemplate} />
            <Column body={dueDateTemplate} />
            <Column body={createdAtTemplate} />
            {user?.role !== Roles.CLIENT && <Column body={clientTemplate} />}
          </DataTable>
          <Paginator
            rows={10}
            totalRecords={0}
            pageLinkSize={3}
            onPageChange={doPaging}
          />
        </StyledPaymentsList>
      )}
    </>
  );
};
