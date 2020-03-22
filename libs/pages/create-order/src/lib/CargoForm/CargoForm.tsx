import React from 'react';

import { FormikHandlers, FormikErrors, FormikTouched, getIn } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Spinner } from 'primereact/spinner';

import { StyledCargoForm } from './StyledCargoForm';
import { CreateOrderFormValues } from '../CreateOrder';

interface CargoFormProps {
  handleChange: FormikHandlers['handleChange'];
  values: CreateOrderFormValues['cargo'];
  errors?: FormikErrors<CreateOrderFormValues['cargo']>;
  touched?: FormikTouched<CreateOrderFormValues['cargo']>;
  onNext: () => void;
  onPrev: () => void;
}

export const CargoForm: React.FC<CargoFormProps> = ({
  handleChange,
  values,
  errors,
  touched,
  onNext,
  onPrev
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

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
              value={values.cargoName}
              onChange={handleChange}
            />
            <label htmlFor="cargoName">Cargo Name</label>
            <i className="fa fa-info"></i>
          </div>
          {getIn(touched, 'cargoName') && getIn(errors, 'cargoName') && (
            <Message
              id="cargoName-error"
              severity="error"
              text={getIn(errors, 'cargoName')}
            ></Message>
          )}
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="cargoWeight"
              data-testid="cargoWeight"
              name="cargo.cargoWeight"
              value={values.cargoWeight}
              onChange={handleChange}
            />
            <label htmlFor="cargoWeight">Weight</label>
          </div>
          {getIn(touched, 'cargoWeight') && getIn(errors, 'cargoWeight') && (
            <Message
              id="cargoWeight-error"
              severity="error"
              text={getIn(errors, 'cargoWeight')}
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
