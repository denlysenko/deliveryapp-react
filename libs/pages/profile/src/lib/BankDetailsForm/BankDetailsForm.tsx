import React from 'react';

import { FormikContextType } from 'formik';

import { InputText } from 'primereact/inputtext';

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
            <InputText
              id="accountNumber"
              type="text"
              data-testid="accountNumber"
              value={formik.values.bankDetails?.accountNumber}
              onChange={formik.handleChange}
            />
            <label htmlFor="accountNumber">Account Number</label>
            <i className="fa fa-credit-card"></i>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="bin"
              type="text"
              data-testid="bin"
              value={formik.values.bankDetails?.bin}
              onChange={formik.handleChange}
            />
            <label htmlFor="bin">BIN</label>
            <i className="fa fa-credit-card"></i>
          </div>
        </div>
        <div className="p-col-12 row">
          <div className="input-wrapper p-float-label">
            <InputText
              id="swift"
              type="text"
              data-testid="swift"
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
