import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import { AuthCredentials, ValidationError } from '@deliveryapp/data-access';

import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

import * as Yup from 'yup';
import { isNil } from 'lodash-es';

import { StyledAuthForm } from './StyledAuthForm';

interface LoginError {
  message: string;
}

export interface AuthFormProps {
  isLoggingIn: boolean;
  loading: boolean;
  error: LoginError | ValidationError | null;
  onFormSubmit: (body: Partial<AuthCredentials>) => void;
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required field'),
  password: Yup.string().required('Required field')
});

export const AuthForm = (props: AuthFormProps) => {
  const { isLoggingIn, loading, error, onFormSubmit } = props;
  const messages = useRef(null);

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
      if (isLoggingIn) {
        const { email, password } = values;
        onFormSubmit({ email, password });
      } else {
        onFormSubmit(values);
      }
    }
  });

  useEffect(() => {
    formik.setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggingIn]);

  useEffect(() => {
    if (!isNil(error)) {
      if ('errors' in error) {
        error.errors.forEach(err => {
          formik.setFieldError(err.path, err.message);
        });
      } else {
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
        <Messages className="error-message" ref={messages} />
        {!isLoggingIn && (
          <>
            <div className="ui-g-12">
              <div className="input-wrapper p-float-label">
                <InputText
                  id="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <label htmlFor="firstName">First Name</label>
                <i className="fa fa-user-circle-o"></i>
              </div>
            </div>
            <div className="ui-g-12">
              <div className="input-wrapper p-float-label">
                <InputText
                  id="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <i className="fa fa-user-circle-o"></i>
              </div>
            </div>
            <div className="ui-g-12">
              <div className="input-wrapper p-float-label">
                <InputText
                  id="company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                />
                <label htmlFor="company">Company</label>
                <i className="fa fa-building-o"></i>
              </div>
            </div>
            <div className="ui-g-12">
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
        <div className="ui-g-12">
          <div className="input-wrapper p-float-label">
            <InputText
              id="email"
              className={
                formik.touched.email && formik.errors.email ? 'invalid' : ''
              }
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">Email</label>
            <i className="fa fa-user-circle-o"></i>
          </div>
          {formik.touched.email && formik.errors.email && (
            <Message severity="error" text={formik.errors.email}></Message>
          )}
        </div>
        <div className="ui-g-12">
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
            />
            <label htmlFor="password">Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {formik.touched.password && formik.errors.password && (
            <Message severity="error" text={formik.errors.password}></Message>
          )}
        </div>
        <div className="ui-g-12 button-container">
          <Button
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
