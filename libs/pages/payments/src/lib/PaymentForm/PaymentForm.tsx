import React from 'react';

import { SelectItem } from 'primereact/api';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Spinner } from 'primereact/spinner';

import { PaymentMethod, paymentMethodNames, Roles } from '@deliveryapp/common';
import { useAuth, User } from '@deliveryapp/data-access';

import { StyledPaymentForm } from './StyledPaymentForm';

const statuses: SelectItem[] = [
  {
    label: 'Paid',
    value: true
  },
  {
    label: 'Not Paid',
    value: false
  }
];

const methods: SelectItem[] = [
  {
    label: paymentMethodNames[PaymentMethod.CASHLESS],
    value: PaymentMethod.CASHLESS
  },
  {
    label: paymentMethodNames[PaymentMethod.CASH],
    value: PaymentMethod.CASH
  }
];

const isClient = (user: User | null) => user?.role === Roles.CLIENT;

export const PaymentForm = () => {
  const [{ user }] = useAuth();

  return (
    <StyledPaymentForm>
      <form autoComplete="off" noValidate>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              type="text"
              id="id"
              data-testid="id"
              name="id"
              readOnly
            />
            <label htmlFor="id">Num.</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="total"
              data-testid="total"
              name="total"
              readonly={isClient(user)}
            />
            <label htmlFor="total">Total, $</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            {!isClient(user) && (
              <Calendar
                id="dueDate"
                name="dueDate"
                data-testid="dueDate"
                dateFormat="dd.mm.yy"
                showButtonBar
                showIcon
              />
            )}
            {isClient(user) && <InputText type="text" readOnly />}
            <label htmlFor="dueDate">Due Date</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="paymentAmount"
              data-testid="paymentAmount"
              name="paymentAmount"
              readonly={isClient(user)}
            />
            <label htmlFor="paymentAmount">Payment Amount, $</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            {!isClient(user) && (
              <Calendar
                id="paymentDate"
                name="paymentDate"
                data-testid="paymentDate"
                dateFormat="dd.mm.yy"
                showButtonBar
                showIcon
              />
            )}
            {isClient(user) && <InputText type="text" readOnly />}
            <label htmlFor="paymentDate">Payment Date</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <span className="p-inputwrapper-focus">
              <Dropdown
                id="method"
                name="method"
                data-testid="method"
                options={methods}
                disabled={isClient(user)}
              />
            </span>
            <label>Payment Method</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <span className="p-inputwrapper-focus">
              <Dropdown
                id="status"
                name="status"
                data-testid="status"
                options={statuses}
                disabled={isClient(user)}
              />
            </span>
            <label>Payment Status</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <AutoComplete data-testid="orders" readonly={isClient(user)} />
            <label>Orders</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <AutoComplete
              field="email"
              data-testid="client"
              readonly={isClient(user)}
            />
            <label>Client</label>
          </div>
        </div>
        <div className="p-col-12">
          <label>Description</label>
          <InputTextarea
            name="description"
            data-testid="description"
            rows={5}
            autoResize
            readOnly={isClient(user)}
          />
        </div>
        <div className="p-col-12">
          <label>Comments</label>
          <InputTextarea
            name="notes"
            data-testid="notes"
            rows={5}
            autoResize
            readOnly={isClient(user)}
          />
        </div>
        {!isClient(user) && (
          <div className="p-col-12 center action">
            <Button
              type="submit"
              form="updateOrderForm"
              label="Save"
              data-testid="save"
              className="p-button-raised"
            />
          </div>
        )}
      </form>
    </StyledPaymentForm>
  );
};
