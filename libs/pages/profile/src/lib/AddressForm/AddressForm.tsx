import React from 'react';

import { FormikHandlers } from 'formik';
import { InputText } from 'primereact/inputtext';

import { Address } from '@deliveryapp/data-access';

import { StyledForm } from '../StyledForm';

interface AddressFormProps {
  address?: Address;
  handleChange: FormikHandlers['handleChange'];
}

export const AddressForm: React.FC<AddressFormProps> = ({
  address,
  handleChange
}) => {
  return (
    <StyledForm>
      <h3>Address</h3>
      <div className="p-grid">
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="country"
              type="text"
              data-testid="country"
              name="address.country"
              value={address?.country}
              onChange={handleChange}
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
              value={address?.city}
              onChange={handleChange}
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
              value={address?.street}
              onChange={handleChange}
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
              value={address?.house}
              onChange={handleChange}
            />
            <label htmlFor="house">House</label>
            <i className="fa fa-building-o"></i>
          </div>
        </div>
      </div>
    </StyledForm>
  );
};
