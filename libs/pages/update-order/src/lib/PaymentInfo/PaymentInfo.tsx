import React from 'react';

import { FormikHandlers } from 'formik';
import { isNull } from 'lodash-es';

import { Spinner } from 'primereact/spinner';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { SelectItem } from 'primereact/api';

import { UpdateOrderDTO, useAuth } from '@deliveryapp/data-access';
import { Roles } from '@deliveryapp/common';

const paymentStatuses: SelectItem[] = [
  {
    label: 'Paid',
    value: true
  },
  {
    label: 'Not Paid',
    value: false
  }
];

interface PaymentInfoProps {
  handleChange: FormikHandlers['handleChange'];
  values: UpdateOrderDTO;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({
  values,
  handleChange
}) => {
  const [{ user }] = useAuth();

  return (
    <>
      <h4>Payment Info</h4>
      <div className="p-grid">
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="deliveryCosts"
              data-testid="deliveryCosts"
              name="deliveryCosts"
              step={0.01}
              value={
                !isNull(values.deliveryCosts) ? values.deliveryCosts : undefined
              }
              onChange={handleChange}
              disabled={user?.role === Roles.CLIENT}
            />
            <label htmlFor="deliveryCosts">Amount, $</label>
          </div>
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <span className="p-inputwrapper-focus">
              <Dropdown
                name="paid"
                options={paymentStatuses}
                value={values.paid}
                onChange={handleChange}
                disabled={user?.role === Roles.CLIENT}
              />
            </span>
            <label>Payment Status</label>
          </div>
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <Calendar
              name="paymentDate"
              dateFormat="dd.mm.yy"
              showButtonBar
              showIcon
              value={
                !isNull(values.paymentDate) ? values.paymentDate : undefined
              }
              onChange={handleChange}
              disabled={user?.role === Roles.CLIENT}
            />
            <label>Payment Date</label>
          </div>
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="invoiceId"
              type="text"
              data-testid="invoiceId"
              name="invoiceId"
              value={!isNull(values.invoiceId) ? values.invoiceId : ''}
              onChange={handleChange}
              disabled={user?.role === Roles.CLIENT}
            />
            <label htmlFor="invoiceId">Invoice Number</label>
          </div>
        </div>
      </div>
    </>
  );
};
