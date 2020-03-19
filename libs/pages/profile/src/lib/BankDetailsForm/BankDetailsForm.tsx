import React from 'react';

import { FormikContextType } from 'formik';

import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';

import { ProfileFormValues } from '../Profile';
import { StyledForm } from '../StyledForm';

interface BankDetailsFormProps {
  formik: FormikContextType<ProfileFormValues>;
}

export const BankDetailsForm: React.FC<BankDetailsFormProps> = ({ formik }) => {
  return (
    <StyledForm>
      <h3>Bank Details</h3>
      <div className="p-grid">
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="name"
              type="text"
              name="bankDetails.name"
              data-testid="name"
              value={formik.values.bankDetails?.name}
              onChange={formik.handleChange}
            />
            <label htmlFor="name">Name</label>
            <i className="fa fa-building-o"></i>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputMask
              id="accountNumber"
              type="text"
              name="bankDetails.accountNumber"
              data-testid="accountNumber"
              mask="9999 9999 9999 9999"
              unmask
              value={formik.values.bankDetails?.accountNumber}
              onChange={formik.handleChange}
            />
            <label htmlFor="accountNumber">Account Number</label>
            <i className="fa fa-credit-card"></i>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputMask
              id="bin"
              type="text"
              name="bankDetails.bin"
              data-testid="bin"
              mask="9999999"
              unmask
              value={formik.values.bankDetails?.bin}
              onChange={formik.handleChange}
            />
            <label htmlFor="bin">BIN</label>
            <i className="fa fa-credit-card"></i>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputMask
              id="swift"
              type="text"
              name="bankDetails.swift"
              data-testid="swift"
              mask="********"
              unmask
              value={formik.values.bankDetails?.swift}
              onChange={formik.handleChange}
            />
            <label htmlFor="swift">SWIFT</label>
            <i className="fa fa-credit-card"></i>
          </div>
        </div>
      </div>
    </StyledForm>
  );
};
