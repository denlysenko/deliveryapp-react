import React from 'react';

import { useFormik } from 'formik';

import { Button } from 'primereact/button';

import { isNil } from 'lodash-es';

import { Roles } from '@deliveryapp/common';
import { useAuth, User, Address, BankDetails } from '@deliveryapp/data-access';

import { StyledProfile } from './StyledProfile';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { PasswordForm } from './PasswordForm/PasswordForm';
import { AddressForm } from './AddressForm/AddressForm';
import { BankDetailsForm } from './BankDetailsForm/BankDetailsForm';

export interface ProfileFormValues {
  contacts: Omit<User, 'id' | 'role' | 'address' | 'bankDetails'>;
  address?: Address;
  bankDetails?: BankDetails;
}

export const Profile = () => {
  const [{ user }] = useAuth();

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      contacts: {
        firstName: !isNil(user) ? user.firstName : '',
        lastName: !isNil(user) ? user.lastName : '',
        email: !isNil(user) ? user.email : '',
        company: !isNil(user) ? user.company : '',
        phone: !isNil(user) ? user.phone : ''
      }
    },
    // validationSchema: ValidationSchema,
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <StyledProfile>
      <div className="p-grid">
        <div
          className={`p-col-12 ${user?.role !== Roles.CLIENT ? 'p-lg-4' : ''}`}
        >
          <div className="card no-margin-bottom">
            <h2>Profile</h2>
          </div>
        </div>
        <form id="profileForm">
          <div className="p-col-12 p-lg-4">
            <div className="card">
              <ContactsForm formik={formik} />
              <PasswordForm />
            </div>
          </div>
          {user?.role === Roles.CLIENT && (
            <div className="p-col-12 p-lg-4">
              <div className="card">
                <AddressForm formik={formik} />
              </div>
            </div>
          )}
          {user?.role === Roles.CLIENT && (
            <div className="p-col-12 p-lg-4">
              <div className="card">
                <BankDetailsForm formik={formik} />
              </div>
            </div>
          )}
        </form>
        <div
          className={`p-col-12 ${user?.role !== Roles.CLIENT ? 'p-lg-4' : ''}`}
        >
          <div className="card no-margin-bottom center">
            <Button
              label="Save"
              type="submit"
              form="profileForm"
              className="blue-btn p-button-raised"
            />
          </div>
        </div>
      </div>
    </StyledProfile>
  );
};
