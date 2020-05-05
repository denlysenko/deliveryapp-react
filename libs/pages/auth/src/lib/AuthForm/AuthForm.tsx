import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import { ERRORS } from '@deliveryapp/common';
import {
  AuthCredentials,
  LoginError,
  ValidationError
} from '@deliveryapp/data-access';
import { handleValidationError, getError } from '@deliveryapp/utils';

import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

import * as Yup from 'yup';
import { isNil, has, omit } from 'lodash-es';

import { StyledAuthForm } from './StyledAuthForm';

export interface AuthFormValues {
  firstName: '';
  lastName: '';
  email: '';
  company: '';
  phone: '';
  password: '';
}

export interface AuthFormProps {
  isLoggingIn: boolean;
  loading: boolean;
  error: LoginError | ValidationError | null;
  onFormSubmit: (body: AuthCredentials) => void;
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(ERRORS.INVALID_EMAIL)
    .required(ERRORS.REQUIRED_FIELD),
  password: Yup.string().required(ERRORS.REQUIRED_FIELD)
});

export const AuthForm: React.FC<AuthFormProps> = ({
  isLoggingIn,
  loading,
  error,
  onFormSubmit
}) => {
  const messages = useRef<Messages>(null);

  const formik = useFormik<AuthFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      password: ''
    },
    initialStatus: {
      apiErrors: {}
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      onFormSubmit(values);
    }
  });

  useEffect(() => {
    formik.setErrors({});
    formik.setStatus({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggingIn]);

  useEffect(() => {
    if (!isNil(error)) {
      if ('errors' in error) {
        handleValidationError<AuthFormValues>(error, formik);
      } else {
        !isNil(messages.current) &&
          messages.current.show({
            severity: 'error',
            summary: error.message,
            closable: false
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const emailError = getError<AuthFormValues>('email', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  const passwordError = getError<AuthFormValues>('password', {
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
    <StyledAuthForm>
      <form onSubmit={formik.handleSubmit} autoComplete="off" noValidate>
        <Messages id="error-message" className="error-message" ref={messages} />
        {!isLoggingIn && (
          <>
            <div className="p-col-12">
              <div className="input-wrapper p-float-label">
                <InputText
                  id="firstName"
                  data-testid="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="firstName">First Name</label>
                <i className="fa fa-user-circle-o"></i>
              </div>
            </div>
            <div className="p-col-12">
              <div className="input-wrapper p-float-label">
                <InputText
                  id="lastName"
                  data-testid="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <i className="fa fa-user-circle-o"></i>
              </div>
            </div>
            <div className="p-col-12">
              <div className="input-wrapper p-float-label">
                <InputText
                  id="company"
                  data-testid="company"
                  name="company"
                  value={formik.values.company}
                  onChange={handleChange}
                />
                <label htmlFor="company">Company</label>
                <i className="fa fa-building-o"></i>
              </div>
            </div>
            <div className="p-col-12">
              <div className="input-wrapper p-float-label">
                <InputMask
                  id="phone"
                  mask="(999) 999-9999"
                  name="phone"
                  value={formik.values.phone}
                  onChange={(e) => formik.setFieldValue('phone', e.value)}
                />
                <label htmlFor="phone">Phone</label>
                <i className="fa fa-phone"></i>
              </div>
            </div>
          </>
        )}
        <div className="p-col-12">
          <div className="input-wrapper p-float-label">
            <InputText
              id="email"
              name="email"
              className={emailError ? 'invalid' : ''}
              value={formik.values.email}
              onChange={handleChange}
              data-testid="email"
            />
            <label htmlFor="email">Email</label>
            <i className="fa fa-user-circle-o"></i>
          </div>
          {emailError && (
            <Message
              id="email-error"
              severity="error"
              text={emailError}
            ></Message>
          )}
        </div>
        <div className="p-col-12">
          <div className="input-wrapper p-float-label">
            <InputText
              type="password"
              id="password"
              name="password"
              className={passwordError ? 'invalid' : ''}
              value={formik.values.password}
              onChange={handleChange}
              data-testid="password"
            />
            <label htmlFor="password">Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {passwordError && (
            <Message
              id="password-error"
              severity="error"
              text={passwordError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 button-container">
          <Button
            data-testid="submit"
            type="submit"
            label={isLoggingIn ? 'Login' : 'Register'}
            className="p-button-raised"
            disabled={loading}
          />
        </div>
      </form>
    </StyledAuthForm>
  );
};
