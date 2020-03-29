import React from 'react';
import { FormikHandlers, FormikErrors, FormikTouched } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Message } from 'primereact/message';

import { Order } from '@deliveryapp/data-access';
import { getError } from '@deliveryapp/utils';

interface SenderInfoProps {
  handleChange: FormikHandlers['handleChange'];
  values: Order;
  errors: FormikErrors<Order>;
  apiErrors: FormikErrors<Order>;
  touched: FormikTouched<Order>;
}

export const SenderInfo: React.FC<SenderInfoProps> = ({
  values,
  handleChange,
  touched,
  errors,
  apiErrors
}) => {
  const senderEmailError = getError<Order>('senderEmail', {
    touched,
    errors,
    apiErrors
  });

  const senderPhoneError = getError<Order>('senderPhone', {
    touched,
    errors,
    apiErrors
  });

  return (
    <>
      <h4>Sender Info</h4>
      <div className="p-grid">
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="senderCompany"
              type="text"
              data-testid="senderCompany"
              name="senderCompany"
              value={values.senderCompany}
              onChange={handleChange}
            />
            <label htmlFor="senderCompany">Company</label>
          </div>
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="senderName"
              type="text"
              data-testid="senderName"
              name="senderName"
              value={values.senderName}
              onChange={handleChange}
            />
            <label htmlFor="senderName">Name</label>
          </div>
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="senderEmail"
              type="text"
              data-testid="senderEmail"
              name="senderEmail"
              className={senderEmailError ? 'invalid' : ''}
              value={values.senderEmail}
              onChange={handleChange}
            />
            <label htmlFor="senderEmail">Email</label>
          </div>
          {senderEmailError && (
            <Message
              id="senderEmail-error"
              severity="error"
              text={senderEmailError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-lg-3 row">
          <div className="input-wrapper p-float-label">
            <InputMask
              id="senderPhone"
              mask="(999) 999-9999"
              name="senderPhone"
              className={senderPhoneError ? 'invalid' : ''}
              value={values.senderPhone}
              onChange={handleChange}
            />
            <label htmlFor="senderPhone">Phone</label>
          </div>
          {senderPhoneError && (
            <Message
              id="senderPhone-error"
              severity="error"
              text={senderPhoneError}
            ></Message>
          )}
        </div>
      </div>
    </>
  );
};
