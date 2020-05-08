import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
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

import { OrdersFilter } from './OrdersFilter/OrdersFilter';
import { StyledOrders } from './StyledOrders';

const headerGroup = (
  <ColumnGroup>
    <Row>
      <Column header="Num." field="id" rowSpan={2} sortable />
      <Column header="Cargo Name" field="cargoName" rowSpan={2} sortable />
      <Column header="Weight/Volume" rowSpan={2} />
      <Column header="Route" colSpan={2} />
      <Column header="Delivery Costs" rowSpan={2} />
      <Column header="Delivery Date" rowSpan={2} />
      <Column header="Status" rowSpan={2} />
      <Column header="Paid" rowSpan={2} />
    </Row>
    <Row>
      <Column header="From" field="cityFrom" sortable />
      <Column header="To" field="cityTo" sortable />
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

  const doSorting = () => {
    console.log('sorting');
  };

  const doPaging = () => {
    console.log('paging');
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
              sortField={'id'}
              sortOrder={1}
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
