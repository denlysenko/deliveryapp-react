import React from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';

import { AuthCredentials } from '@deliveryapp/data-access';

import { StyledAuthForm } from './StyledAuthForm';

export interface AuthFormProps {
  isLoggingIn: boolean;
  loading: boolean;
  error: unknown;
  onFormSubmit: (body: AuthCredentials) => void;
}

export const AuthForm = (props: AuthFormProps) => {
  const { isLoggingIn, loading } = props;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <StyledAuthForm>
      <form onSubmit={formik.handleSubmit} autoComplete="off" noValidate>
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
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">Email</label>
            <i className="fa fa-user-circle-o"></i>
          </div>
          {/* <div 
         class="ui-message ui-message-error ui-corner-all">
      <i class="fa fa-close"></i>
      <span >Required field</span>
      <span>Invalid email</span>
      <span>{ error['email'] }</span>
    </div> */}
        </div>
        <div className="ui-g-12">
          <div className="input-wrapper p-float-label">
            <InputText
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <label htmlFor="password">Password</label>
            <i className="fa fa-lock"></i>
          </div>
          {/* <div
         class="ui-message ui-message-error ui-corner-all">
      <i class="fa fa-close"></i>
      <span>Required field</span>
      <span>{ errors['password'] }</span>
    </div> */}
        </div>
        {!isLoggingIn && (
          <div className="ui-g-12">
            <div className="input-wrapper p-float-label">
              <InputText
                type="password"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <i className="fa fa-lock"></i>
            </div>
            {/* <div 
           class="ui-message ui-message-error ui-corner-all">
        <i class="fa fa-close"></i>
        <span >Passwords do not match</span>
      </div> */}
          </div>
        )}
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
