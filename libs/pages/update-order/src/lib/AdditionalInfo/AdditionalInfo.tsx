import React from 'react';
import { FormikHandlers } from 'formik';

import dayjs from 'dayjs';
import { isNull } from 'lodash-es';

import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { SelectItem } from 'primereact/api';

import { ORDER_STATUSES, Roles } from '@deliveryapp/common';
import { UpdateOrderDTO, useAuth } from '@deliveryapp/data-access';

interface AdditionalInfoProps {
  values: UpdateOrderDTO;
  handleChange: FormikHandlers['handleChange'];
  createdAt?: string;
  updatedAt?: string;
}

const orderStatuses: SelectItem[] = ORDER_STATUSES.map((status, index) => ({
  label: status,
  value: index
}));

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  values,
  handleChange,
  createdAt,
  updatedAt
}) => {
  const [{ user }] = useAuth();

  return (
    <>
      <h4>Additional Info</h4>
      <div className="p-grid">
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <span className="p-inputwrapper-focus">
              <Dropdown
                name="status"
                options={orderStatuses}
                value={values.status}
                onChange={handleChange}
                disabled={user?.role === Roles.CLIENT}
              />
            </span>
            <label>Order Status</label>
          </div>
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <Calendar
              name="deliveryDate"
              dateFormat="dd.mm.yy"
              showButtonBar
              showIcon
              value={
                !isNull(values.deliveryDate) ? values.deliveryDate : undefined
              }
              onChange={handleChange}
              disabled={user?.role === Roles.CLIENT}
            />
            <label>Delivery Date</label>
          </div>
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="createdAt"
              type="text"
              value={dayjs(createdAt).format('DD.MM.YYYY')}
              readOnly
            />
            <label htmlFor="createdAt">Created At</label>
          </div>
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="updatedAt"
              type="text"
              value={dayjs(updatedAt).format('DD.MM.YYYY')}
              readOnly
            />
            <label htmlFor="updatedAt">Updated At</label>
          </div>
        </div>
      </div>
    </>
  );
};
