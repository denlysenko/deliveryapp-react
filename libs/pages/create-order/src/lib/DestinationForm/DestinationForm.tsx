import React from 'react';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { StyledForm } from '../StyledForm';

export const DestinationForm = () => {
  return (
    <StyledForm>
      <form className="p-grid" autoComplete="off" noValidate>
        <div className="p-col-12 p-md-6">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cityFrom"
              type="text"
              data-testid="cityFrom"
              name="cityFrom"
            />
            <label htmlFor="cityFrom">Departure City</label>
            <i className="fa fa-globe"></i>
          </div>
          <Message
            id="cityFrom-error"
            severity="error"
            text={'Required'}
          ></Message>
        </div>
        <div className="p-col-12 p-md-6">
          <div className="input-wrapper p-float-label">
            <InputText
              id="cityTo"
              type="text"
              data-testid="cityTo"
              name="cityTo"
            />
            <label htmlFor="cityTo">Arrival City</label>
            <i className="fa fa-globe"></i>
          </div>
          <Message
            id="cityTo-error"
            severity="error"
            text={'Required'}
          ></Message>
        </div>
        <div className="p-col-12 p-md-6">
          <div className="input-wrapper p-float-label">
            <InputText
              id="addressFrom"
              type="text"
              data-testid="addressFrom"
              name="addressFrom"
            />
            <label htmlFor="addressFrom">Departure Address</label>
            <i className="fa fa-building-o"></i>
          </div>
          <Message
            id="addressFrom-error"
            severity="error"
            text={'Required'}
          ></Message>
        </div>
        <div className="p-col-12 p-md-6">
          <div className="input-wrapper p-float-label">
            <InputText
              id="addressTo"
              type="text"
              data-testid="addressTo"
              name="addressTo"
            />
            <label htmlFor="addressTo">Arrival Address</label>
            <i className="fa fa-building-o"></i>
          </div>
          <Message
            id="addressTo-error"
            severity="error"
            text={'Required'}
          ></Message>
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <label>Additional Info</label>
          <InputTextarea rows={5} />
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
