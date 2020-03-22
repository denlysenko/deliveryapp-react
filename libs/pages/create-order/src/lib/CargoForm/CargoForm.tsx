import React from 'react';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Spinner } from 'primereact/spinner';

import { StyledCargoForm } from './StyledCargoForm';

export const CargoForm = () => {
  return (
    <StyledCargoForm>
      <form className="p-grid" autoComplete="off" noValidate>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cargoName"
              type="text"
              data-testid="cargoName"
              name="cargoName"
            />
            <label htmlFor="cargoName">Cargo Name</label>
            <i className="fa fa-info"></i>
          </div>
          <Message
            id="cargoName-error"
            severity="error"
            text={'Required'}
          ></Message>
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="cargoWeight"
              data-testid="cargoWeight"
              name="cargoWeight"
            />
            <label htmlFor="cargoWeight">Weight</label>
          </div>
          <Message
            id="cargoWeight-error"
            severity="error"
            text={'Required'}
          ></Message>
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <Spinner
              id="cargoVolume"
              data-testid="cargoVolume"
              name="cargoVolume"
            />
            <label htmlFor="cargoVolume">Volume</label>
          </div>
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <label>Comments</label>
          <InputTextarea rows={5} autoResize />
        </div>
        <div className="p-col-12 button-container">
          <Button
            type="button"
            label="Back"
            icon="fa fa-arrow-left"
            iconPos="left"
            className="p-button-raised"
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
