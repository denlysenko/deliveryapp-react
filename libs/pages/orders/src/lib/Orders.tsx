import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Paginator, PageState } from 'primereact/paginator';
import { Row } from 'primereact/row';

import dayjs from 'dayjs';
import { isNil } from 'lodash-es';

import { ORDER_STATUSES } from '@deliveryapp/common';
import {
  Order,
  ordersClient,
  useOrders,
  OrdersActionTypes,
  OrdersFilter as IOrdersFilter
} from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';
import { getSortField, getSortOrder } from '@deliveryapp/utils';

import { OrdersFilter } from './OrdersFilter/OrdersFilter';
import { StyledOrders } from './StyledOrders';

const headerGroup = (
  <ColumnGroup>
    <Row>
      <Column header="Num." field="id" rowSpan={2} sortable className="id" />
      <Column
        header="Cargo Name"
        field="cargoName"
        rowSpan={2}
        sortable
        className="cargoName"
      />
      <Column header="Weight/Volume" rowSpan={2} />
      <Column header="Route" colSpan={2} />
      <Column header="Delivery Costs" rowSpan={2} />
      <Column header="Delivery Date" rowSpan={2} />
      <Column header="Status" rowSpan={2} />
      <Column header="Paid" rowSpan={2} />
    </Row>
    <Row>
      <Column header="From" field="cityFrom" sortable className="cityFrom" />
      <Column header="To" field="cityTo" sortable className="cityTo" />
    </Row>
  </ColumnGroup>
);

const idTemplate = (rowData: Order) => (
  <Link to={`/orders/${rowData.id}`}>{rowData.id}</Link>
);

const weightTemplate = (rowData: Order) => (
  <span>{`${rowData.cargoWeight} kg / ${rowData.cargoVolume || '-'} m3`}</span>
);

const statusTemplate = (rowData: Order) => (
  <span>{ORDER_STATUSES[rowData.status]}</span>
);

const paidTemplate = (rowData: Order) => (
  <span>{rowData.paid ? 'Yes' : 'No'}</span>
);

const deliveryDateTemplate = (rowData: Order) => (
  <span>
    {isNil(rowData.deliveryDate)
      ? ''
      : dayjs(rowData.deliveryDate).format('DD.MM.YYYY')}
  </span>
);

export const Orders = () => {
  const [ordersFilter, dispatch] = useOrders();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const doFiltering = (ordersFilter: IOrdersFilter['filter']) => {
    dispatch({
      type: OrdersActionTypes.FILTER_CHANGE,
      payload: ordersFilter
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
      type: OrdersActionTypes.SORTING_CHANGE,
      payload: { [sortField]: sortOrder === 1 ? 'asc' : 'desc' }
    });
  };

  const doPaging = ({ rows, page }: PageState) => {
    dispatch({
      type: OrdersActionTypes.PAGE_CHANGE,
      payload: { limit: rows, offset: rows * page }
    });
  };

  useEffect(() => {
    setLoading(true);

    ordersClient.getOrders(ordersFilter).then(({ data: { rows, count } }) => {
      setOrders(rows);
      setTotalRecords(count);
      setLoading(false);
    });
  }, [ordersFilter]);

  return (
    <>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <StyledOrders>
          <div className="card">
            <div className="p-grid">
              <div className="p-md-8 p-col-12">
                <OrdersFilter
                  filter={ordersFilter.filter}
                  handleFilterChange={doFiltering}
                />
              </div>
              <div className="button p-md-4 p-col-12">
                <Link to="/orders/create">
                  <Button
                    type="button"
                    label="Create order"
                    icon="fa fa-plus"
                    iconPos="left"
                    className="raised-btn"
                  />
                </Link>
              </div>
            </div>
            <DataTable
              value={orders}
              headerColumnGroup={headerGroup}
              sortField={getSortField(ordersFilter.order)}
              sortOrder={getSortOrder(ordersFilter.order)}
              onSort={doSorting}
            >
              <Column body={idTemplate} />
              <Column field="cargoName" />
              <Column body={weightTemplate} />
              <Column field="cityFrom" />
              <Column field="cityTo" />
              <Column field="deliveryCosts" />
              <Column body={deliveryDateTemplate} />
              <Column body={statusTemplate} />
              <Column body={paidTemplate} />
            </DataTable>
            <Paginator
              rows={ordersFilter.limit}
              totalRecords={totalRecords}
              first={ordersFilter.offset}
              pageLinkSize={3}
              onPageChange={doPaging}
            />
          </div>
        </StyledOrders>
      )}
    </>
  );
};
