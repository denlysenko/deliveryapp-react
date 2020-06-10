import React, { useRef, useState } from 'react';

import { useFormik } from 'formik';

import { SelectItem } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Growl } from 'primereact/growl';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

import { has, isEmpty, omit } from 'lodash-es';
import * as Yup from 'yup';

import { ERRORS, roleNames, Roles } from '@deliveryapp/common';
import { getError } from '@deliveryapp/utils';

import { StyledUserForm } from './StyledUserForm';

const roles: SelectItem[] = [
  {
    label: roleNames[Roles.MANAGER],
    value: Roles.MANAGER
  },
  {
    label: roleNames[Roles.ADMIN],
    value: Roles.ADMIN
  }
];

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .email(ERRORS.INVALID_EMAIL)
    .required(ERRORS.REQUIRED_FIELD),
  password: Yup.string().nullable().required(ERRORS.REQUIRED_FIELD)
});

export const UserForm = () => {
  const growl = useRef<Growl>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik<any>({
    initialValues: {
      id: null,
      email: null,
      phone: null,
      firstName: null,
      lastName: null,
      role: roles[0].value,
      password: null
    },
    initialStatus: {
      apiErrors: {}
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      if (!isEmpty(formik.status.apiErrors)) {
        return;
      }
      console.log(values);
    }
  });

  const emailError = getError<any>('email', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  const passwordError = getError<any>('password', {
    touched: formik.touched,
    errors: formik.errors,
    apiErrors: formik.status.apiErrors
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const name = event.target.name;

    if (has(formik.status.apiErrors, name)) {
      formik.setStatus({
        apiErrors: omit(formik.status.apiErrors, name)
      });
    }

    formik.handleChange(event);
  };

  return (
    <StyledUserForm>
      <Growl ref={growl} />
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              type="text"
              id="id"
              data-testid="id"
              name="id"
              defaultValue={formik.values.id || ''}
              readOnly
            />
            <label htmlFor="id">ID</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              type="text"
              id="email"
              data-testid="email"
              name="email"
              value={formik.values.email || ''}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          {emailError && (
            <Message
              id="email-error"
              severity="error"
              text={emailError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              type="text"
              id="firstName"
              data-testid="firstName"
              name="firstName"
              value={formik.values.firstName || ''}
              onChange={handleChange}
            />
            <label htmlFor="firstName">First Name</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              type="text"
              id="lastName"
              data-testid="lastName"
              name="lastName"
              value={formik.values.lastName || ''}
              onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              type="text"
              id="phone"
              data-testid="phone"
              name="phone"
              value={formik.values.phone || ''}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <span className="p-inputwrapper-focus">
              <Dropdown
                id="role"
                name="role"
                data-testid="role"
                options={roles}
                value={formik.values.role}
                onChange={handleChange}
              />
            </span>
            <label>Role</label>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              type="password"
              id="password"
              data-testid="password"
              name="password"
              value={formik.values.password || ''}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          {passwordError && (
            <Message
              id="password-error"
              severity="error"
              text={passwordError}
            ></Message>
          )}
        </div>
        <div className="p-col-12 center action">
          <Button
            type="submit"
            label="Save"
            data-testid="save"
            className="p-button-raised"
            disabled={loading}
          />
        </div>
      </form>
    </StyledUserForm>
  );
};
