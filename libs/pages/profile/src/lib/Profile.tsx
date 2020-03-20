import React, { useState } from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';

import * as Yup from 'yup';
import { isNil } from 'lodash-es';

import { Roles, ERRORS, handleValidationError } from '@deliveryapp/common';
import {
  useAuth,
  User,
  Address,
  BankDetails,
  updateProfile,
  AuthActionTypes
} from '@deliveryapp/data-access';

import { StyledProfile } from './StyledProfile';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { PasswordForm } from './PasswordForm/PasswordForm';
import { AddressForm } from './AddressForm/AddressForm';
import { BankDetailsForm } from './BankDetailsForm/BankDetailsForm';

export interface ProfileFormValues
  extends Omit<User, 'id' | 'role' | 'address' | 'bankDetails'> {
  address?: Address;
  bankDetails?: BankDetails;
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(ERRORS.REQUIRED_FIELD)
    .email(ERRORS.INVALID_EMAIL)
});

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [{ user }, dispatch] = useAuth();

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      firstName: !isNil(user) ? user.firstName : '',
      lastName: !isNil(user) ? user.lastName : '',
      email: !isNil(user) ? user.email : '',
      company: !isNil(user) ? user.company : '',
      phone: !isNil(user) ? user.phone : '',
      ...(!isNil(user) &&
        user.role === Roles.CLIENT && {
          address: {
            country: !isNil(user.address) ? user.address.country : '',
            city: !isNil(user.address) ? user.address.city : '',
            street: !isNil(user.address) ? user.address.street : '',
            house: !isNil(user.address) ? user.address.house : ''
          },
          bankDetails: {
            name: !isNil(user.bankDetails) ? user.bankDetails.name : '',
            accountNumber: !isNil(user.bankDetails)
              ? user.bankDetails.accountNumber
              : '',
            bin: !isNil(user.bankDetails) ? user.bankDetails.bin : '',
            swift: !isNil(user.bankDetails) ? user.bankDetails.swift : ''
          }
        })
    },
    validationSchema: ValidationSchema,
    onSubmit: async values => {
      setLoading(true);

      try {
        const { data } = await updateProfile(values);
        dispatch({
          type: AuthActionTypes.USER_LOADED,
          payload: data
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleValidationError(error.response.data, formik);
      }
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
        <form
          id="profileForm"
          data-testid="profile-form"
          onSubmit={formik.handleSubmit}
        >
          <div className="p-col-12 p-lg-4">
            <div className="card">
              <ContactsForm
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
              />
              <PasswordForm />
            </div>
          </div>
          {user?.role === Roles.CLIENT && (
            <div className="p-col-12 p-lg-4">
              <div className="card">
                <AddressForm
                  address={formik.values.address}
                  handleChange={formik.handleChange}
                />
              </div>
            </div>
          )}
          {user?.role === Roles.CLIENT && (
            <div className="p-col-12 p-lg-4">
              <div className="card">
                <BankDetailsForm
                  bankDetails={formik.values.bankDetails}
                  handleChange={formik.handleChange}
                />
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
              className="p-button-raised"
              data-testid="save-profile"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </StyledProfile>
  );
};
