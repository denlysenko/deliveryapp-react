import React from 'react';
import { FormikHandlers, FormikErrors, FormikTouched } from 'formik';

import { isNull } from 'lodash-es';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import { Spinner } from 'primereact/spinner';

import { UpdateOrderDTO } from '@deliveryapp/data-access';
import { getError } from '@deliveryapp/utils';

export interface MainInfoProps {
  handleChange: FormikHandlers['handleChange'];
  values: UpdateOrderDTO;
  errors: FormikErrors<UpdateOrderDTO>;
  apiErrors: FormikErrors<UpdateOrderDTO>;
  touched: FormikTouched<UpdateOrderDTO>;
}

export const MainInfo: React.FC<MainInfoProps> = ({
  values,
  touched,
  errors,
  apiErrors,
  handleChange
}) => {
  const cargoNameError = getError<UpdateOrderDTO>('cargoName', {
    touched,
    errors,
    apiErrors
  });

  const cargoWeightError = getError<UpdateOrderDTO>('cargoWeight', {
    touched,
    errors,
    apiErrors
  });

  const cityFromError = getError<UpdateOrderDTO>('cityFrom', {
    touched,
    errors,
    apiErrors
  });

  const cityToError = getError<UpdateOrderDTO>('cityTo', {
    touched,
    errors,
    apiErrors
  });

  const addressFromError = getError<UpdateOrderDTO>('addressFrom', {
    touched,
    errors,
    apiErrors
  });

  const addressToError = getError<UpdateOrderDTO>('addressTo', {
    touched,
    errors,
    apiErrors
  });

  return (
    <>
      <h4>Main Info</h4>
      <div className="p-grid">
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="id"
              data-testid="id"
              name="id"
              defaultValue={values.id}
              readOnly
            />
            <label htmlFor="id">Order Number</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cargoName"
              data-testid="cargoName"
              name="cargoName"
              className={cargoNameError ? 'invalid' : ''}
              value={values.cargoName}
              onChange={handleChange}
            />
            <label htmlFor="cargoName">Cargo Name</label>
          </div>
          {cargoNameError && (
            <Message
              id="cargoName-error"
              severity="error"
              text={cargoNameError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="cargoWeight"
              data-testid="cargoWeight"
              name="cargoWeight"
              className={cargoWeightError ? 'invalid' : ''}
              value={
                !isNull(values.cargoWeight) ? values.cargoWeight : undefined
              }
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
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="cargoVolume"
              data-testid="cargoVolume"
              name="cargoVolume"
              value={
                !isNull(values.cargoVolume) ? values.cargoVolume : undefined
              }
              onChange={handleChange}
            />
            <label htmlFor="cargoVolume">Volume</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cityFrom"
              type="text"
              data-testid="cityFrom"
              name="cityFrom"
              className={cityFromError ? 'invalid' : ''}
              value={values.cityFrom}
              onChange={handleChange}
            />
            <label htmlFor="cityFrom">From City</label>
          </div>
          {cityFromError && (
            <Message
              id="cityFrom-error"
              severity="error"
              text={cityFromError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cityTo"
              type="text"
              data-testid="cityTo"
              name="cityTo"
              className={cityToError ? 'invalid' : ''}
              value={values.cityTo}
              onChange={handleChange}
            />
            <label htmlFor="cityTo">To City</label>
          </div>
          {cityToError && (
            <Message
              id="cityTo-error"
              severity="error"
              text={cityToError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="addressFrom"
              type="text"
              data-testid="addressFrom"
              name="addressFrom"
              className={addressFromError ? 'invalid' : ''}
              value={values.addressFrom}
              onChange={handleChange}
            />
            <label htmlFor="addressFrom">From Address</label>
          </div>
          {addressFromError && (
            <Message
              id="addressFrom-error"
              severity="error"
              text={addressFromError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="addressTo"
              type="text"
              data-testid="addressTo"
              name="addressTo"
              className={addressToError ? 'invalid' : ''}
              value={values.addressTo}
              onChange={handleChange}
            />
            <label htmlFor="addressTo">To Address</label>
          </div>
          {addressToError && (
            <Message
              id="addressTo-error"
              severity="error"
              text={addressToError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <label>Additional Data</label>
          <InputTextarea
            name="additionalData"
            data-testid="additionalData"
            rows={5}
            autoResize
            value={values.additionalData}
            onChange={handleChange}
          />
        </div>
        <div className="p-col-12 row">
          <label>Comment</label>
          <InputTextarea
            name="comment"
            data-testid="comment"
            rows={5}
            autoResize
            value={values.comment}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
