import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import { isNil } from 'lodash-es';

import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Row } from 'primereact/row';

import { ORDER_STATUSES } from '@deliveryapp/common';
import { Order, ordersClient } from '@deliveryapp/data-access';

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
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    ordersClient
      .getOrders({
        offset: 0,
        limit: 10,
        filter: { cityFrom: 'ky' },
        order: { id: 'asc' }
      })
      .then(({ data }) => {
        setOrders(data.rows);
      });
  }, []);

  return (
    <StyledOrders>
      <DataTable
        value={orders}
        headerColumnGroup={headerGroup}
        sortField={'id'}
        sortOrder={1}
        onSort={(e) =>
          console.log({ sortField: e.sortField, sortOrder: e.sortOrder })
        }
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
        rows={10}
        totalRecords={120}
        first={10}
        pageLinkSize={3}
        onPageChange={(e) => console.log(e)}
      />
    </StyledOrders>
  );
};
