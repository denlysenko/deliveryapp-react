import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import { ERRORS } from '@deliveryapp/common';
import {
  AuthCredentials,
  LoginError,
  ValidationError
} from '@deliveryapp/data-access';

import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

import * as Yup from 'yup';
import { isNil } from 'lodash-es';

import { StyledAuthForm } from './StyledAuthForm';

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

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      password: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: values => {
      onFormSubmit(values);
    }
  });

  useEffect(() => {
    formik.setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggingIn]);

  useEffect(() => {
    if (!isNil(error)) {
      if ('errors' in error) {
        error.errors.forEach(({ path, message }) => {
          formik.setFieldError(path, message);
        });
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
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
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
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
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
                  value={formik.values.company}
                  onChange={formik.handleChange}
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
                  value={formik.values.phone}
                  onChange={e => formik.setFieldValue('phone', e.value)}
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
              className={
                formik.touched.email && formik.errors.email ? 'invalid' : ''
              }
              value={formik.values.email}
              onChange={formik.handleChange}
              data-testid="email"
            />
            <label htmlFor="email">Email</label>
            <i className="fa fa-user-circle-o"></i>
          </div>
          {formik.touched.email && formik.errors.email && (
            <Message
              id="email-error"
              severity="error"
              text={formik.errors.email}
            ></Message>
          )}
        </div>
        <div className="p-col-12">
          <div className="input-wrapper p-float-label">
            <InputText
              type="password"
              id="password"
              className={
                formik.touched.password && formik.errors.password
                  ? 'invalid'
                  : ''
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              data-testid="password"
            />
            <label htmlFor="password">Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {formik.touched.password && formik.errors.password && (
            <Message
              id="password-error"
              severity="error"
              text={formik.errors.password}
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
