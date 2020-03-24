import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { has, omit } from 'lodash-es';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { ERRORS } from '@deliveryapp/common';
import { usersClient } from '@deliveryapp/data-access';
import { handleValidationError, getError } from '@deliveryapp/utils';

import { StyledForm } from '../StyledForm';

export interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required(ERRORS.REQUIRED_FIELD),
  newPassword: Yup.string().required(ERRORS.REQUIRED_FIELD),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], ERRORS.PASSWORDS_DO_NOT_MATCH)
    .required(ERRORS.REQUIRED_FIELD)
});

export const PasswordForm: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<PasswordFormValues>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    initialStatus: {
      apiErrors: {}
    },
    validationSchema: ValidationSchema,
    onSubmit: async values => {
      setLoading(true);

      try {
        const { oldPassword, newPassword } = values;
        await usersClient.updatePassword({ oldPassword, newPassword });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleValidationError<PasswordFormValues>(error.response.data, formik);
      }
    }
  });

  const oldPasswordError = getError<PasswordFormValues>('oldPassword', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  const newPasswordError = getError<PasswordFormValues>('newPassword', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  const confirmPasswordError = getError<PasswordFormValues>('confirmPassword', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    if (has(formik.status.apiErrors, name)) {
      formik.setStatus({
        apiErrors: omit(formik.status.apiErrors, name)
      });
    }

    formik.handleChange(event);
  };

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
              name="oldPassword"
              className={oldPasswordError ? 'invalid' : ''}
              value={formik.values.oldPassword}
              onChange={handleChange}
            />
            <label htmlFor="oldPassword">Current Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {oldPasswordError && (
            <Message
              id="oldPassword-error"
              severity="error"
              text={oldPasswordError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="newPassword"
              type="password"
              data-testid="newPassword"
              name="newPassword"
              className={newPasswordError ? 'invalid' : ''}
              value={formik.values.newPassword}
              onChange={handleChange}
            />
            <label>New Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {newPasswordError && (
            <Message
              id="newPassword-error"
              severity="error"
              text={newPasswordError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="confirmPassword"
              type="password"
              data-testid="confirmPassword"
              name="confirmPassword"
              className={confirmPasswordError ? 'invalid' : ''}
              value={formik.values.confirmPassword}
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {confirmPasswordError && (
            <Message
              id="confirmPassword-error"
              severity="error"
              text={confirmPasswordError}
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
