import React from 'react';

import { FormikHandlers, FormikErrors, FormikTouched } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { getError } from '@deliveryapp/utils';

import { CreateOrderFormValues } from '../CreateOrderFormValues';
import { StyledForm } from '../StyledForm';

interface DestinationFormProps {
  handleChange: FormikHandlers['handleChange'];
  values: CreateOrderFormValues['destination'];
  errors?: FormikErrors<CreateOrderFormValues['destination']>;
  apiErrors?: FormikErrors<CreateOrderFormValues['destination']>;
  touched?: FormikTouched<CreateOrderFormValues['destination']>;
  onNext: () => void;
}

export const DestinationForm: React.FC<DestinationFormProps> = ({
  values,
  errors,
  apiErrors,
  touched,
  handleChange,
  onNext
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

  const cityFromError = getError<CreateOrderFormValues['destination']>(
    'cityFrom',
    { touched, errors, apiErrors }
  );

  const cityToError = getError<CreateOrderFormValues['destination']>('cityTo', {
    touched,
    errors,
    apiErrors
  });

  const addressFromError = getError<CreateOrderFormValues['destination']>(
    'addressFrom',
    { touched, errors, apiErrors }
  );

  const addressToError = getError<CreateOrderFormValues['destination']>(
    'addressTo',
    { touched, errors, apiErrors }
  );

  return (
    <StyledForm>
      <form
        className="p-grid"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="p-col-12 p-md-6">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cityFrom"
              type="text"
              data-testid="cityFrom"
              name="destination.cityFrom"
              className={cityFromError ? 'invalid' : ''}
              value={values.cityFrom}
              onChange={handleChange}
            />
            <label htmlFor="cityFrom">Departure City</label>
            <i className="fa fa-globe"></i>
          </div>
          {cityFromError && (
            <Message
              id="cityFrom-error"
              severity="error"
              text={cityFromError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-md-6">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cityTo"
              type="text"
              data-testid="cityTo"
              name="destination.cityTo"
              className={cityToError ? 'invalid' : ''}
              value={values.cityTo}
              onChange={handleChange}
            />
            <label htmlFor="cityTo">Arrival City</label>
            <i className="fa fa-globe"></i>
          </div>
          {cityToError && (
            <Message
              id="cityTo-error"
              severity="error"
              text={cityToError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-md-6">
          <div className="input-wrapper p-float-label">
            <InputText
              id="addressFrom"
              type="text"
              data-testid="addressFrom"
              name="destination.addressFrom"
              className={addressFromError ? 'invalid' : ''}
              value={values.addressFrom}
              onChange={handleChange}
            />
            <label htmlFor="addressFrom">Departure Address</label>
            <i className="fa fa-building-o"></i>
          </div>
          {addressFromError && (
            <Message
              id="addressFrom-error"
              severity="error"
              text={addressFromError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-md-6">
          <div className="input-wrapper p-float-label">
            <InputText
              id="addressTo"
              type="text"
              data-testid="addressTo"
              name="destination.addressTo"
              className={addressToError ? 'invalid' : ''}
              value={values.addressTo}
              onChange={handleChange}
            />
            <label htmlFor="addressTo">Arrival Address</label>
            <i className="fa fa-building-o"></i>
          </div>
          {addressToError && (
            <Message
              id="addressTo-error"
              severity="error"
              text={addressToError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <label>Additional Info</label>
          <InputTextarea
            name="destination.additionalData"
            data-testid="additionalData"
            rows={5}
            autoResize
            value={values.additionalData}
            onChange={handleChange}
          />
        </div>
        <div className="p-col-12 button-container">
          <Button
            type="submit"
            label="Next"
            icon="fa fa-arrow-right"
            iconPos="right"
            className="p-button-raised"
          />
        </div>
      </form>
    </StyledForm>
  );
};
