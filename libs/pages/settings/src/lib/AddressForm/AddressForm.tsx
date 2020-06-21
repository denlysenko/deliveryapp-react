import React, { useEffect, useRef, useState } from 'react';

import { useFormik } from 'formik';

import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { InputText } from 'primereact/inputtext';

import { isEmpty, isNil } from 'lodash-es';

import { MESSAGES } from '@deliveryapp/common';
import { Address, settingsClient } from '@deliveryapp/data-access';

import { StyledForm } from '../StyledForm';

interface AddressFormProps {
  address?: Address;
}

export const AddressForm: React.FC<AddressFormProps> = ({ address }) => {
  const growl = useRef<Growl>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik<Address>({
    initialValues: {
      id: undefined,
      country: '',
      city: '',
      street: '',
      house: ''
    },
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const { id, ...rest } = values;

        const { data } = isNil(id)
          ? await settingsClient.createAddress(rest)
          : await settingsClient.updateAddress(id, rest);

        !isNil(growl.current) &&
          growl.current.show({
            severity: 'success',
            summary: isNil(id)
              ? MESSAGES.CREATE_ADDRESS_SUCCESS
              : MESSAGES.UPDATE_ADDRESS_SUCCESS,
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
    if (!isNil(address) && !isEmpty(address)) {
      formik.setValues(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <StyledForm>
      <Growl ref={growl} />
      <div className="p-grid">
        <form className="p-md-4" onSubmit={formik.handleSubmit}>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="country"
                type="text"
                data-testid="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
              />
              <label htmlFor="country">Country</label>
              <i className="fa fa-globe"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="city"
                type="text"
                name="city"
                data-testid="city"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
              <label htmlFor="city">City</label>
              <i className="fa fa-globe"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="street"
                type="text"
                name="street"
                data-testid="street"
                value={formik.values.street}
                onChange={formik.handleChange}
              />
              <label htmlFor="street">Street</label>
              <i className="fa fa-building-o"></i>
            </div>
          </div>
          <div className="p-col-12 row">
            <div className="input-wrapper p-float-label">
              <InputText
                id="house"
                type="text"
                name="house"
                data-testid="house"
                value={formik.values.house}
                onChange={formik.handleChange}
              />
              <label htmlFor="house">House</label>
              <i className="fa fa-building-o"></i>
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
