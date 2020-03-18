import React from 'react';

import { useFormik } from 'formik';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { StyledForm } from '../StyledForm';

export const PasswordForm: React.FC<{}> = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <StyledForm>
      <h3>Change Password</h3>
      <div className="p-grid">
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="oldPassword"
              type="password"
              data-testid="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
            />
            <label htmlFor="oldPassword">Current Password</label>
            <i className="fa fa-lock"></i>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="newPassword"
              type="password"
              data-testid="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            <label>New Password</label>
            <i className="fa fa-lock"></i>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="confirmPassword"
              type="password"
              data-testid="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <i className="fa fa-lock"></i>
          </div>
        </div>
        <div className="p-col-12 row center">
          <Button
            label="Change Password"
            type="button"
            className="p-button-raised"
          />
        </div>
      </div>
    </StyledForm>
  );
};
