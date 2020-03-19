import React from 'react';

import { FormikContextType } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Message } from 'primereact/message';

import { ProfileFormValues } from '../Profile';
import { StyledForm } from '../StyledForm';

interface ContactsFormProps {
  formik: FormikContextType<ProfileFormValues>;
}

export const ContactsForm: React.FC<ContactsFormProps> = ({ formik }) => (
  <StyledForm>
    <h3>Contacts</h3>
    <div className="p-grid">
      <div className="p-col-12 row">
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
      <div className="p-col-12 row">
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
      <div className="p-col-12 row">
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
      <div className="p-col-12 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="email"
            data-testid="email"
            className={
              formik.touched.email && formik.errors.email ? 'invalid' : ''
            }
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <label htmlFor="email">Email</label>
          <i className="fa fa-envelope-o"></i>
        </div>
        {formik.touched.email && formik.errors.email && (
          <Message
            id="email-error"
            severity="error"
            text={formik.errors.email}
          ></Message>
        )}
      </div>
      <div className="p-col-12 row">
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
    </div>
  </StyledForm>
);
