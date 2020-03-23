import React from 'react';

import { FormikHandlers, FormikErrors, FormikTouched } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Spinner } from 'primereact/spinner';

import { getError } from '@deliveryapp/utils';

import { CreateOrderFormValues } from '../CreateOrderFormValues';
import { StyledCargoForm } from './StyledCargoForm';

interface CargoFormProps {
  handleChange: FormikHandlers['handleChange'];
  values: CreateOrderFormValues['cargo'];
  errors?: FormikErrors<CreateOrderFormValues['cargo']>;
  apiErrors?: FormikErrors<CreateOrderFormValues['cargo']>;
  touched?: FormikTouched<CreateOrderFormValues['cargo']>;
  onNext: () => void;
  onPrev: () => void;
}

export const CargoForm: React.FC<CargoFormProps> = ({
  handleChange,
  values,
  errors,
  apiErrors,
  touched,
  onNext,
  onPrev
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

  const cargoNameError = getError<CreateOrderFormValues['cargo']>('cargoName', {
    touched,
    errors,
    apiErrors
  });

  const cargoWeightError = getError<CreateOrderFormValues['cargo']>(
    'cargoWeight',
    {
      touched,
      errors,
      apiErrors
    }
  );

  return (
    <StyledCargoForm>
      <form
        className="p-grid"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cargoName"
              type="text"
              data-testid="cargoName"
              name="cargo.cargoName"
              className={cargoNameError ? 'invalid' : ''}
              value={values.cargoName}
              onChange={handleChange}
            />
            <label htmlFor="cargoName">Cargo Name</label>
            <i className="fa fa-info"></i>
          </div>
          {cargoNameError && (
            <Message
              id="cargoName-error"
              severity="error"
              text={cargoNameError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="cargoWeight"
              data-testid="cargoWeight"
              name="cargo.cargoWeight"
              className={cargoWeightError ? 'invalid' : ''}
              value={values.cargoWeight}
              onChange={handleChange}
            />
            <label htmlFor="cargoWeight">Weight</label>
          </div>
          {cargoWeightError && (
            <Message
              id="cargoWeight-error"
              severity="error"
              text={cargoWeightError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="cargoVolume"
              data-testid="cargoVolume"
              name="cargo.cargoVolume"
              value={values.cargoVolume}
              onChange={handleChange}
            />
            <label htmlFor="cargoVolume">Volume</label>
          </div>
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <label>Comments</label>
          <InputTextarea
            rows={5}
            autoResize
            name="cargo.comment"
            value={values.comment}
            onChange={handleChange}
          />
        </div>
        <div className="p-col-12 button-container">
          <Button
            type="button"
            label="Back"
            icon="fa fa-arrow-left"
            iconPos="left"
            className="p-button-raised"
            onClick={onPrev}
          />
          <Button
            type="submit"
            label="Next"
            icon="fa fa-arrow-right"
            iconPos="right"
            className="p-button-raised"
          />
        </div>
      </form>
    </StyledCargoForm>
  );
};
