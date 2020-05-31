import React, { useCallback, useEffect, useState } from 'react';

import { useFormik } from 'formik';

import { SelectItem } from 'primereact/api';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';

import dayjs from 'dayjs';
import { debounce, has, isEmpty, isNil, omit } from 'lodash-es';
import * as Yup from 'yup';

import {
  ERRORS,
  PaymentMethod,
  paymentMethodNames,
  Roles
} from '@deliveryapp/common';
import {
  Order,
  ordersClient,
  PaymentDTO,
  PaymentsActionTypes,
  paymentsClient,
  useAuth,
  usePayments,
  User,
  usersClient
} from '@deliveryapp/data-access';
import { getError, handleValidationError } from '@deliveryapp/utils';

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

const ValidationSchema = Yup.object().shape({
  total: Yup.number()
    .required(ERRORS.REQUIRED_FIELD)
    .typeError(ERRORS.NUMBER_FIELD),
  dueDate: Yup.string().nullable().required(ERRORS.REQUIRED_FIELD),
  clientId: Yup.number()
    .required(ERRORS.REQUIRED_FIELD)
    .typeError(ERRORS.NUMBER_FIELD),
  orders: Yup.array().required(ERRORS.REQUIRED_FIELD)
});

export const PaymentForm = () => {
  const [{ user }] = useAuth();
  const [state, dispatch] = usePayments();
  const [loading, setLoading] = useState(false);
  const [clientSearchTerm, setClientSearchTerm] = useState<User | null>(null);
  const [clients, setClients] = useState<User[]>([]);
  const [orderSearchTerm, setOrderSearchTerm] = useState<Order[] | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const formik = useFormik<PaymentDTO>({
    initialValues: {
      id: null,
      total: null,
      paymentAmount: null,
      status: statuses[1].value,
      method: methods[1].value,
      dueDate: null,
      paymentDate: null,
      notes: undefined,
      description: undefined,
      clientId: null,
      orders: []
    },
    initialStatus: {
      apiErrors: {}
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (!isEmpty(formik.status.apiErrors)) {
        return;
      }

      setLoading(true);

      try {
        const {
          data: { id }
        } = isNil(values.id)
          ? await paymentsClient.createPayment(values)
          : await paymentsClient.updatePayment(values.id, values);

        setLoading(false);
        formik.setFieldValue('id', id);
        dispatch({ type: PaymentsActionTypes.RELOAD });
        dispatch({ type: PaymentsActionTypes.SELECT_PAYMENT, payload: id });
      } catch (error) {
        setLoading(false);
        handleValidationError<PaymentDTO>(error.response.data, formik);
      }
    }
  });

  const totalError = getError<PaymentDTO>('total', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  const dueDateError = getError<PaymentDTO>('dueDate', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  const ordersError = getError<PaymentDTO>('orders', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  const clientIdError = getError<PaymentDTO>('clientId', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const name = event.target.name;

    if (has(formik.status.apiErrors, name)) {
      formik.setStatus({
        apiErrors: omit(formik.status.apiErrors, name)
      });
    }

    formik.handleChange(event);
  };

  const searchClient = async (searchTerm: string) => {
    try {
      const {
        data: { rows }
      } = await usersClient.getUsers({
        filter: {
          email: searchTerm,
          role: Roles.CLIENT
        }
      });

      setClients(rows);
    } catch {
      setClients([]);
    }
  };

  const handleClientSearchChange = (event: { value: User }) => {
    const { value } = event;
    setClientSearchTerm(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchClient = useCallback(
    debounce((event: { query: string }) => searchClient(event.query), 500),
    []
  );

  const selectClient = (event: { value: User }) => {
    if (has(formik.status.apiErrors, 'clientId')) {
      formik.setStatus({
        apiErrors: omit(formik.status.apiErrors, 'clientId')
      });
    }

    formik.setFieldValue('clientId', event.value.id);
  };

  const unselectClient = () => {
    formik.setFieldValue('clientId', null);
  };

  const searchOrder = async (searchTerm: string) => {
    try {
      const {
        data: { rows }
      } = await ordersClient.getOrders({
        filter: {
          id: searchTerm === '' ? undefined : parseInt(searchTerm, 10)
        }
      });

      setOrders(rows);
    } catch {
      setOrders([]);
    }
  };

  const handleOrderSearchChange = (event: { value: Order[] }) => {
    const { value } = event;
    setOrderSearchTerm(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOrderClient = useCallback(
    debounce((event: { query: string }) => searchOrder(event.query), 500),
    []
  );

  const selectOrder = (event: { value: Order }) => {
    if (has(formik.status.apiErrors, 'orders')) {
      formik.setStatus({
        apiErrors: omit(formik.status.apiErrors, 'orders')
      });
    }

    formik.setFieldValue('orders', [...formik.values.orders, event.value.id]);
  };

  const unselectOrder = (event: { value: Order }) => {
    const updatedOrders = formik.values.orders.filter(
      (orderId: number) => orderId !== event.value.id
    );
    formik.setFieldValue('orders', updatedOrders);
  };

  const resetForm = () => {
    formik.resetForm({});
    setClientSearchTerm(null);
    setClients([]);
    setOrderSearchTerm(null);
    setOrders([]);
  };

  useEffect(() => {
    if (isNil(state.selectedPayment)) {
      resetForm();
      return;
    }

    if (formik.values.id !== state.selectedPayment) {
      paymentsClient.getPayment(state.selectedPayment).then(({ data }) => {
        const {
          dueDate,
          paymentDate,
          notes,
          description,
          orders,
          client,
          createdAt,
          updatedAt,
          ...rest
        } = data;

        formik.setValues({
          ...rest,
          dueDate: !isNil(dueDate) ? new Date(dueDate) : null,
          paymentDate: !isNil(paymentDate) ? new Date(paymentDate) : null,
          notes: isNil(notes) ? undefined : notes,
          description: isNil(description) ? undefined : description,
          orders: orders.map((order) => order.id),
          clientId: isNil(client) ? null : client.id
        });
        setOrders(orders);
        setOrderSearchTerm(orders);
        setClientSearchTerm(client);
        setClients([client]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedPayment]);

  return (
    <StyledPaymentForm>
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              type="text"
              id="id"
              data-testid="id"
              name="id"
              defaultValue={formik.values.id || ''}
              readOnly
            />
            <label htmlFor="id">Num.</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputNumber
              id="total"
              data-testid="total"
              className={totalError ? 'invalid' : ''}
              name="total"
              min={0}
              value={formik.values.total || undefined}
              onChange={handleChange}
              readonly={isClient(user)}
            />
            <label htmlFor="total">Total, $</label>
          </div>
          {totalError && (
            <Message
              id="total-error"
              severity="error"
              text={totalError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            {!isClient(user) && (
              <Calendar
                id="dueDate"
                name="dueDate"
                className={dueDateError ? 'invalid' : ''}
                data-testid="dueDate"
                dateFormat="dd.mm.yy"
                showButtonBar
                showIcon
                value={formik.values.dueDate || undefined}
                onChange={handleChange}
              />
            )}
            {isClient(user) && (
              <InputText
                type="text"
                readOnly
                defaultValue={
                  formik.values.dueDate
                    ? dayjs(formik.values.dueDate).format('DD.MM.YYYY')
                    : undefined
                }
              />
            )}
            <label htmlFor="dueDate">Due Date</label>
          </div>
          {dueDateError && (
            <Message
              id="dueDate-error"
              severity="error"
              text={dueDateError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputNumber
              id="paymentAmount"
              data-testid="paymentAmount"
              name="paymentAmount"
              min={0}
              value={formik.values.paymentAmount || undefined}
              onChange={handleChange}
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
                value={formik.values.paymentDate || undefined}
                onChange={handleChange}
              />
            )}
            {isClient(user) && (
              <InputText
                type="text"
                readOnly
                defaultValue={
                  formik.values.paymentDate
                    ? dayjs(formik.values.paymentDate).format('DD.MM.YYYY')
                    : undefined
                }
              />
            )}
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
                value={formik.values.method}
                onChange={handleChange}
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
                value={formik.values.status}
                onChange={handleChange}
                disabled={isClient(user)}
              />
            </span>
            <label>Payment Status</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <AutoComplete
              multiple
              field="id"
              data-testid="orders"
              className={ordersError ? 'invalid' : ''}
              suggestions={orders}
              value={orderSearchTerm}
              onChange={handleOrderSearchChange}
              completeMethod={debounceOrderClient}
              onSelect={selectOrder}
              onUnselect={unselectOrder}
              disabled={isClient(user)}
            />
            <label>Orders</label>
          </div>
          {ordersError && (
            <Message
              id="orders-error"
              severity="error"
              text={ordersError}
            ></Message>
          )}
        </div>
        {!isClient(user) && (
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <AutoComplete
                field="email"
                data-testid="client"
                className={clientIdError ? 'invalid' : ''}
                suggestions={clients}
                value={clientSearchTerm}
                onChange={handleClientSearchChange}
                completeMethod={debounceSearchClient}
                onSelect={selectClient}
                onClear={unselectClient}
              />
              <label>Client</label>
            </div>
            {clientIdError && (
              <Message
                id="clientId-error"
                severity="error"
                text={clientIdError}
              ></Message>
            )}
          </div>
        )}
        <div className="p-col-12">
          <label>Description</label>
          <InputTextarea
            name="description"
            data-testid="description"
            rows={5}
            autoResize
            value={formik.values.description}
            onChange={handleChange}
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
            value={formik.values.notes}
            onChange={handleChange}
            readOnly={isClient(user)}
          />
        </div>
        {!isClient(user) && (
          <div className="p-col-12 center action">
            <Button
              type="submit"
              label="Save"
              data-testid="save"
              className="p-button-raised"
              disabled={loading}
            />
          </div>
        )}
      </form>
    </StyledPaymentForm>
  );
};
