import React, { useRef } from 'react';

import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { InputText } from 'primereact/inputtext';

import { StyledForm } from '../StyledForm';

export const AddressForm = () => {
  const growl = useRef<Growl>(null);

  return (
    <StyledForm>
      <Growl ref={growl} />
      <div className="p-grid">
        <form className="p-md-4">
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="country"
                type="text"
                data-testid="country"
                name="country"
              />
              <label htmlFor="country">Country</label>
              <i className="fa fa-globe"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="city"
                type="text"
                name="address.city"
                data-testid="city"
              />
              <label htmlFor="city">City</label>
              <i className="fa fa-globe"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="street"
                type="text"
                name="address.street"
                data-testid="street"
              />
              <label htmlFor="street">Street</label>
              <i className="fa fa-building-o"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="house"
                type="text"
                name="address.house"
                data-testid="house"
              />
              <label htmlFor="house">House</label>
              <i className="fa fa-building-o"></i>
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
