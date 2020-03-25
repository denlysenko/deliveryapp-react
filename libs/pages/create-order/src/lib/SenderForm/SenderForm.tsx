import React from 'react';

import { FormikHandlers, FormikErrors, FormikTouched } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { getError } from '@deliveryapp/utils';

import { CreateOrderFormValues } from '../CreateOrderFormValues';
import { StyledSenderForm } from './StyledSenderForm';

interface SenderFormProps {
  handleChange: FormikHandlers['handleChange'];
  values: CreateOrderFormValues['sender'];
  errors?: FormikErrors<CreateOrderFormValues['sender']>;
  apiErrors?: FormikErrors<CreateOrderFormValues['sender']>;
  touched?: FormikTouched<CreateOrderFormValues['sender']>;
  onSubmit: () => void;
  onPrev: () => void;
  loading: boolean;
}

export const SenderForm: React.FC<SenderFormProps> = ({
  handleChange,
  onPrev,
  onSubmit,
  errors,
  apiErrors,
  touched,
  values,
  loading
}) => {
  const senderEmailError = getError<CreateOrderFormValues['sender']>(
    'senderEmail',
    { touched, errors, apiErrors }
  );

  const senderPhoneError = getError<CreateOrderFormValues['sender']>(
    'senderPhone',
    {
      touched,
      errors,
      apiErrors
    }
  );

  return (
    <StyledSenderForm>
      <form
        className="p-grid"
        autoComplete="off"
        noValidate
        onSubmit={onSubmit}
      >
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <InputText
              id="senderCompany"
              type="text"
              data-testid="senderCompany"
              name="sender.senderCompany"
              value={values.senderCompany}
              onChange={handleChange}
            />
            <label htmlFor="senderCompany">Company Name</label>
            <i className="fa fa-building-o"></i>
          </div>
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <InputText
              id="senderName"
              type="text"
              data-testid="senderName"
              name="sender.senderName"
              value={values.senderName}
              onChange={handleChange}
            />
            <label htmlFor="senderName">Contact Person</label>
            <i className="fa fa-user-circle-o"></i>
          </div>
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <InputText
              id="senderEmail"
              type="text"
              data-testid="senderEmail"
              name="sender.senderEmail"
              className={senderEmailError ? 'invalid' : ''}
              value={values.senderEmail}
              onChange={handleChange}
            />
            <label htmlFor="senderEmail">Email</label>
            <i className="fa fa-envelope-o"></i>
          </div>
          {senderEmailError && (
            <Message
              id="senderEmail-error"
              severity="error"
              text={senderEmailError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <InputMask
              id="senderPhone"
              mask="(999) 999-9999"
              name="sender.senderPhone"
              className={senderPhoneError ? 'invalid' : ''}
              value={values.senderPhone}
              onChange={handleChange}
            />
            <label htmlFor="senderPhone">Phone</label>
            <i className="fa fa-phone"></i>
          </div>
          {senderPhoneError && (
            <Message
              id="senderPhone-error"
              severity="error"
              text={senderPhoneError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 button-container">
          <Button
            type="button"
            label="Back"
            icon="fa fa-arrow-left"
            iconPos="left"
            data-testid="back"
            className="p-button-raised"
            disabled={loading}
            onClick={onPrev}
          />
          <Button
            type="submit"
            label="Create"
            data-testid="create"
            icon="fa fa-check"
            iconPos="right"
            className="p-button-raised"
            disabled={loading}
          />
        </div>
      </form>
    </StyledSenderForm>
  );
};
