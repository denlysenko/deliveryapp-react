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
import {
  Payment,
  PaymentsActionTypes,
  paymentsClient,
  PaymentsFilter as IPaymentsFilter,
  useAuth,
  usePayments,
  User
} from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';
import { getSortField, getSortOrder, toCurrency } from '@deliveryapp/utils';

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
      <Column
        header="Created At"
        field="createdAt"
        sortable
        className="createdAt"
      />
      {user?.role !== Roles.CLIENT && <Column header="Client" />}
    </Row>
  </ColumnGroup>
);

const idTemplate = (rowData: Payment) => (
  <a
    href="/"
    onClick={(e) => {
      e.preventDefault();
    }}
  >
    {rowData.id}
  </a>
);

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
  const [state, dispatch] = usePayments();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const doFiltering = (paymentsFilter: IPaymentsFilter['filter']) => {
    dispatch({
      type: PaymentsActionTypes.FILTER_CHANGE,
      payload: paymentsFilter
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
      type: PaymentsActionTypes.SORTING_CHANGE,
      payload: { [sortField]: sortOrder === 1 ? 'asc' : 'desc' }
    });
  };

  const doPaging = ({ rows, page }: PageState) => {
    dispatch({
      type: PaymentsActionTypes.PAGE_CHANGE,
      payload: { limit: rows, offset: rows * page }
    });
  };

  const selectPayment = (id: number | null) => {
    dispatch({
      type: PaymentsActionTypes.SELECT_PAYMENT,
      payload: id
    });
  };

  const findSelectedPayment = (
    payments: Payment[],
    selectedPayment: number | null
  ) => payments.find((payment) => payment.id === selectedPayment);

  useEffect(() => {
    setLoading(true);

    paymentsClient
      .getPayments(state.paymentsFilter)
      .then(({ data: { rows, count } }) => {
        setPayments(rows);
        setTotalRecords(count);
        setLoading(false);
      });
  }, [state.paymentsFilter]);

  return (
    <>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <StyledPaymentsList>
          <div className="topbar p-grid">
            <div className="payment-filter p-md-8 p-col-12">
              <PaymentsFilter
                filter={state.paymentsFilter.filter}
                handleFilterChange={doFiltering}
              />
            </div>
            {user?.role !== Roles.CLIENT && (
              <div className="button p-md-4 p-col-12">
                <Button
                  type="button"
                  label="Create payment"
                  icon="fa fa-plus"
                  iconPos="left"
                  className="raised-btn"
                  onClick={() => selectPayment(null)}
                />
              </div>
            )}
          </div>
          <DataTable
            selectionMode="single"
            selection={findSelectedPayment(payments, state.selectedPayment)}
            compareSelectionBy="equals"
            onSelectionChange={(e) => selectPayment(e.value.id)}
            value={payments}
            headerColumnGroup={headerGroup(user)}
            sortField={getSortField(state.paymentsFilter.order)}
            sortOrder={getSortOrder(state.paymentsFilter.order)}
            onSort={doSorting}
          >
            <Column body={(rowData: Payment) => idTemplate(rowData)} />
            <Column body={totalTemplate} />
            <Column body={methodTemplate} />
            <Column body={statusTemplate} />
            <Column body={dueDateTemplate} />
            <Column body={createdAtTemplate} />
            {user?.role !== Roles.CLIENT && <Column body={clientTemplate} />}
          </DataTable>
          <Paginator
            rows={state.paymentsFilter.limit}
            totalRecords={totalRecords}
            first={state.paymentsFilter.offset}
            pageLinkSize={3}
            onPageChange={doPaging}
          />
        </StyledPaymentsList>
      )}
    </>
  );
};
