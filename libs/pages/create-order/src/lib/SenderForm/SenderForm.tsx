import React from 'react';

import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { StyledSenderForm } from './StyledSenderForm';

export const SenderForm = () => {
  return (
    <StyledSenderForm>
      <form className="p-grid" autoComplete="off" noValidate>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <InputText
              id="senderCompany"
              type="text"
              data-testid="senderCompany"
              name="senderCompany"
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
              name="senderName"
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
              name="senderEmail"
            />
            <label htmlFor="senderEmail">Email</label>
            <i className="fa fa-envelope-o"></i>
          </div>
          <Message
            id="senderEmail-error"
            severity="error"
            text={'Required'}
          ></Message>
        </div>
        <div className="p-col-12 p-md-6 p-md-offset-3">
          <div className="input-wrapper p-float-label">
            <InputMask
              id="senderPhone"
              mask="(999) 999-9999"
              name="senderPhone"
            />
            <label htmlFor="senderPhone">Phone</label>
            <i className="fa fa-phone"></i>
          </div>
          <Message
            id="senderPhone-error"
            severity="error"
            text={'Required'}
          ></Message>
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
            label="Create"
            icon="fa fa-check"
            iconPos="right"
            className="p-button-raised"
          />
        </div>
      </form>
    </StyledSenderForm>
  );
};
