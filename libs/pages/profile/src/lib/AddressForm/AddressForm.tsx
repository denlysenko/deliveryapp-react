import React from 'react';

import { FormikContextType } from 'formik';

import { InputText } from 'primereact/inputtext';

import { ProfileFormValues } from '../Profile';
import { StyledForm } from '../StyledForm';

interface AddressFormProps {
  formik: FormikContextType<ProfileFormValues>;
}

export const AddressForm: React.FC<AddressFormProps> = ({ formik }) => {
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
              value={formik.values.address?.country}
              onChange={formik.handleChange}
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
              value={formik.values.address?.city}
              onChange={formik.handleChange}
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
              value={formik.values.address?.street}
              onChange={formik.handleChange}
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
              value={formik.values.address?.house}
              onChange={formik.handleChange}
            />
            <label htmlFor="house">House</label>
            <i className="fa fa-building-o"></i>
          </div>
        </div>
      </div>
    </StyledForm>
  );
};
