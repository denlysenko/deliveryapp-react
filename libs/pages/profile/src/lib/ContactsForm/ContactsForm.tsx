import React from 'react';

import { FormikHandlers, FormikErrors, FormikTouched } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Message } from 'primereact/message';

import { ProfileFormValues } from '../Profile';
import { StyledForm } from '../StyledForm';

interface ContactsFormProps {
  handleChange: FormikHandlers['handleChange'];
  values: ProfileFormValues;
  errors: FormikErrors<ProfileFormValues>;
  touched: FormikTouched<ProfileFormValues>;
}

export const ContactsForm: React.FC<ContactsFormProps> = ({
  handleChange,
  values,
  errors,
  touched
}) => (
  <StyledForm>
    <h3>Contacts</h3>
    <div className="p-grid">
      <div className="p-col-12 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="firstName"
            data-testid="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          <label htmlFor="firstName">First Name</label>
          <i className="fa fa-user-circle-o"></i>
        </div>
      </div>
      <div className="p-col-12 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="lastName"
            data-testid="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <i className="fa fa-user-circle-o"></i>
        </div>
      </div>
      <div className="p-col-12 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="company"
            data-testid="company"
            value={values.company}
            onChange={handleChange}
          />
          <label htmlFor="company">Company</label>
          <i className="fa fa-building-o"></i>
        </div>
      </div>
      <div className="p-col-12 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="email"
            data-testid="email"
            className={touched.email && errors.email ? 'invalid' : ''}
            value={values.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <i className="fa fa-envelope-o"></i>
        </div>
        {touched.email && errors.email && (
          <Message
            id="email-error"
            severity="error"
            text={errors.email}
          ></Message>
        )}
      </div>
      <div className="p-col-12 row">
        <div className="input-wrapper p-float-label">
          <InputMask
            id="phone"
            mask="(999) 999-9999"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone</label>
          <i className="fa fa-phone"></i>
        </div>
      </div>
    </div>
  </StyledForm>
);
