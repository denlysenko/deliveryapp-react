import React from 'react';

import { FormikHandlers, FormikErrors, FormikTouched, getIn } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { StyledForm } from '../StyledForm';
import { CreateOrderFormValues } from '../CreateOrder';

interface DestinationFormProps {
  handleChange: FormikHandlers['handleChange'];
  values: CreateOrderFormValues['destination'];
  errors?: FormikErrors<CreateOrderFormValues['destination']>;
  touched?: FormikTouched<CreateOrderFormValues['destination']>;
  onNext: () => void;
}

export const DestinationForm: React.FC<DestinationFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  onNext
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

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
              value={values.cityFrom}
              onChange={handleChange}
            />
            <label htmlFor="cityFrom">Departure City</label>
            <i className="fa fa-globe"></i>
          </div>
          {getIn(touched, 'cityFrom') && getIn(errors, 'cityFrom') && (
            <Message
              id="cityFrom-error"
              severity="error"
              text={getIn(errors, 'cityFrom')}
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
              value={values.cityTo}
              onChange={handleChange}
            />
            <label htmlFor="cityTo">Arrival City</label>
            <i className="fa fa-globe"></i>
          </div>
          {getIn(touched, 'cityTo') && getIn(errors, 'cityTo') && (
            <Message
              id="cityTo-error"
              severity="error"
              text={getIn(errors, 'cityTo')}
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
              value={values.addressFrom}
              onChange={handleChange}
            />
            <label htmlFor="addressFrom">Departure Address</label>
            <i className="fa fa-building-o"></i>
          </div>
          {getIn(touched, 'addressFrom') && getIn(errors, 'addressFrom') && (
            <Message
              id="addressFrom-error"
              severity="error"
              text={getIn(errors, 'addressFrom')}
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
              value={values.addressTo}
              onChange={handleChange}
            />
            <label htmlFor="addressTo">Arrival Address</label>
            <i className="fa fa-building-o"></i>
          </div>
          {getIn(touched, 'addressTo') && getIn(errors, 'addressTo') && (
            <Message
              id="addressTo-error"
              severity="error"
              text={getIn(errors, 'addressTo')}
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
