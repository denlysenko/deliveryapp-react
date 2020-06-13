/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef } from 'react';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';

import * as Yup from 'yup';
import { isNil, has, omit } from 'lodash-es';

import { Roles, ERRORS, MESSAGES } from '@deliveryapp/common';
import {
  useAuth,
  UserDTO,
  Address,
  BankDetails,
  usersClient,
  AuthActionTypes
} from '@deliveryapp/data-access';
import { handleValidationError } from '@deliveryapp/utils';

import { StyledProfile } from './StyledProfile';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { PasswordForm } from './PasswordForm/PasswordForm';
import { AddressForm } from './AddressForm/AddressForm';
import { BankDetailsForm } from './BankDetailsForm/BankDetailsForm';

export interface ProfileFormValues extends Omit<UserDTO, 'role' | 'password'> {
  address?: Address;
  bankDetails?: BankDetails;
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(ERRORS.REQUIRED_FIELD)
    .email(ERRORS.INVALID_EMAIL)
});

export const Profile = () => {
  const growl = useRef<Growl>(null);
  const [loading, setLoading] = useState(false);
  const [{ user }, dispatch] = useAuth();

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      firstName: !isNil(user!.firstName) ? user!.firstName : '',
      lastName: !isNil(user!.lastName) ? user!.lastName : '',
      email: user!.email || '',
      company: !isNil(user!.company) ? user!.company : '',
      phone: !isNil(user!.phone) ? user!.phone : '',
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
    initialStatus: {
      apiErrors: {}
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        await usersClient.updateProfile(values);
        dispatch({
          type: AuthActionTypes.USER_LOADED,
          payload: {
            ...user!,
            ...values,
            ...(user!.role === Roles.CLIENT && {
              address: {
                ...user!.address,
                ...values.address!
              },
              bankDetails: {
                ...user!.bankDetails,
                ...values.bankDetails!
              }
            })
          }
        });
        setLoading(false);
        !isNil(growl.current) &&
          growl.current.show({
            severity: 'success',
            summary: MESSAGES.UPDATE_PROFILE_SUCCESS,
            closable: false
          });
      } catch (error) {
        setLoading(false);
        handleValidationError<ProfileFormValues>(error.response.data, formik);
      }
    }
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
    <StyledProfile>
      <Growl ref={growl} />
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
                apiErrors={formik.status.apiErrors}
                touched={formik.touched}
                handleChange={handleChange}
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
