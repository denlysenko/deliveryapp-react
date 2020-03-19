import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { ERRORS, handleValidationError } from '@deliveryapp/common';
import { updatePassword } from '@deliveryapp/data-access';

import { StyledForm } from '../StyledForm';

const ValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required(ERRORS.REQUIRED_FIELD),
  newPassword: Yup.string().required(ERRORS.REQUIRED_FIELD),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], ERRORS.PASSWORDS_DO_NOT_MATCH)
    .required(ERRORS.REQUIRED_FIELD)
});

export const PasswordForm: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async values => {
      setLoading(true);

      try {
        const { oldPassword, newPassword } = values;
        await updatePassword({ oldPassword, newPassword });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleValidationError(error.response.data, formik);
      }
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
              className={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? 'invalid'
                  : ''
              }
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
            />
            <label htmlFor="oldPassword">Current Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <Message
              id="oldPassword-error"
              severity="error"
              text={formik.errors.oldPassword}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="newPassword"
              type="password"
              data-testid="newPassword"
              className={
                formik.touched.newPassword && formik.errors.newPassword
                  ? 'invalid'
                  : ''
              }
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            <label>New Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <Message
              id="newPassword-error"
              severity="error"
              text={formik.errors.newPassword}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="confirmPassword"
              type="password"
              data-testid="confirmPassword"
              className={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'invalid'
                  : ''
              }
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Message
              id="confirmPassword-error"
              severity="error"
              text={formik.errors.confirmPassword}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row center">
          <Button
            label="Change Password"
            type="button"
            data-testid="change-password"
            className="p-button-raised"
            disabled={loading}
            onClick={formik.submitForm}
          />
        </div>
      </div>
    </StyledForm>
  );
};
