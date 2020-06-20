import React, { useRef } from 'react';

import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';

import { StyledForm } from '../StyledForm';

export const BankDetailsForm = () => {
  const growl = useRef<Growl>(null);

  return (
    <StyledForm>
      <Growl ref={growl} />
      <div className="p-grid">
        <form className="p-md-4">
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText id="name" type="text" name="name" data-testid="name" />
              <label htmlFor="name">Name</label>
              <i className="fa fa-building-o"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputMask
                id="accountNumber"
                type="text"
                name="bankDetails.accountNumber"
                data-testid="accountNumber"
                mask="9999 9999 9999 9999"
                unmask
              />
              <label htmlFor="accountNumber">Account Number</label>
              <i className="fa fa-credit-card"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputMask
                id="bin"
                type="text"
                name="bankDetails.bin"
                data-testid="bin"
                mask="9999999"
                unmask
              />
              <label htmlFor="bin">BIN</label>
              <i className="fa fa-credit-card"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputMask
                id="swift"
                type="text"
                name="bankDetails.swift"
                data-testid="swift"
                mask="********"
                unmask
              />
              <label htmlFor="swift">SWIFT</label>
              <i className="fa fa-credit-card"></i>
            </div>
          </div>
          <div className="p-col-12 row center">
            <Button
              label="Save"
              type="submit"
              className="p-button-raised"
              data-testid="save"
            />
          </div>
        </form>
      </div>
    </StyledForm>
  );
};
