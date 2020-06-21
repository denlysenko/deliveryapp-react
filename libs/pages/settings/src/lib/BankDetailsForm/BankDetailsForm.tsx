import React, { useEffect, useRef, useState } from 'react';

import { useFormik } from 'formik';

import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';

import { isEmpty, isNil } from 'lodash-es';

import { MESSAGES } from '@deliveryapp/common';
import { BankDetails, settingsClient } from '@deliveryapp/data-access';

import { StyledForm } from '../StyledForm';

interface BankDetailsFormProps {
  bankDetails?: BankDetails;
}

export const BankDetailsForm: React.FC<BankDetailsFormProps> = ({
  bankDetails
}) => {
  const growl = useRef<Growl>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik<BankDetails>({
    initialValues: {
      id: undefined,
      name: '',
      accountNumber: '',
      swift: '',
      bin: ''
    },
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const { id, ...rest } = values;

        const { data } = isNil(id)
          ? await settingsClient.createBankDetails(rest)
          : await settingsClient.updateBankDetails(id, rest);

        !isNil(growl.current) &&
          growl.current.show({
            severity: 'success',
            summary: isNil(id)
              ? MESSAGES.CREATE_BANK_DETAILS_SUCCESS
              : MESSAGES.UPDATE_BANK_DETAILS_SUCCESS,
            closable: false
          });

        setLoading(false);
        formik.setFieldValue('id', data.id);
      } catch (error) {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    if (!isNil(bankDetails) && !isEmpty(bankDetails)) {
      formik.setValues(bankDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankDetails]);

  return (
    <StyledForm>
      <Growl ref={growl} />
      <div className="p-grid">
        <form className="p-md-4" onSubmit={formik.handleSubmit}>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="name"
                type="text"
                name="name"
                data-testid="name"
                value={formik.values.name}
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
                name="accountNumber"
                data-testid="accountNumber"
                mask="9999 9999 9999 9999"
                unmask
                value={formik.values.accountNumber}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => formik.handleChange(e as any)}
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
                name="bin"
                data-testid="bin"
                mask="9999999"
                unmask
                value={formik.values.bin}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => formik.handleChange(e as any)}
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
                name="swift"
                data-testid="swift"
                mask="********"
                unmask
                value={formik.values.swift}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => formik.handleChange(e as any)}
              />
              <label htmlFor="swift">SWIFT</label>
              <i className="fa fa-credit-card"></i>
            </div>
          </div>
          <div className="p-col-12 row center">
            <Button
              label="Save"
              type="submit"
              className="p-button-raised"
              data-testid="save"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </StyledForm>
  );
};
