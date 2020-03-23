import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { isNil, isEmpty, has, omit, omitBy } from 'lodash-es';

import { Steps } from 'primereact/steps';
import { Growl } from 'primereact/growl';

import { ERRORS } from '@deliveryapp/common';
import { createOrderSelf, ValidationError } from '@deliveryapp/data-access';

import { CreateOrderFormValues } from './CreateOrderFormValues';
import {
  initialValues,
  steps,
  touchedFields,
  items,
  destinationFormFields,
  cargoFormFields,
  senderFormFields
} from './constants';
import { StyledCreateOrder } from './StyledCreateOrder';
import { DestinationForm } from './DestinationForm/DestinationForm';
import { CargoForm } from './CargoForm/CargoForm';
import { SenderForm } from './SenderForm/SenderForm';

const ValidationSchema = Yup.object().shape({
  destination: Yup.object().shape({
    cityFrom: Yup.string().required(ERRORS.REQUIRED_FIELD),
    cityTo: Yup.string().required(ERRORS.REQUIRED_FIELD),
    addressFrom: Yup.string().required(ERRORS.REQUIRED_FIELD),
    addressTo: Yup.string().required(ERRORS.REQUIRED_FIELD)
  }),
  cargo: Yup.object().shape({
    cargoName: Yup.string().required(ERRORS.REQUIRED_FIELD),
    cargoWeight: Yup.number()
      .required(ERRORS.REQUIRED_FIELD)
      .typeError(ERRORS.NUMBER_FIELD)
  }),
  sender: Yup.object().shape({
    senderEmail: Yup.string()
      .required(ERRORS.REQUIRED_FIELD)
      .email(ERRORS.INVALID_EMAIL),
    senderPhone: Yup.string().required(ERRORS.REQUIRED_FIELD)
  })
});

export const CreateOrder = () => {
  const history = useHistory();
  const growl = useRef<Growl>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const formik = useFormik<CreateOrderFormValues>({
    initialValues,
    initialStatus: {
      apiErrors: {}
    },
    validationSchema: ValidationSchema,
    onSubmit: async values => {
      if (!isNil(formik.status.apiErrors[steps[activeIndex]])) {
        return;
      }

      const order = {
        ...values.destination,
        ...values.cargo,
        ...values.sender
      };

      setLoading(true);

      try {
        await createOrderSelf(order);
        history.push('/orders');
      } catch (error) {
        setLoading(false);
        setActiveIndex(0);

        !isNil(growl.current) &&
          growl.current.show({
            severity: 'error',
            summary: ERRORS.CREATE_ORDER_FAILED,
            closable: false
          });

        const err: ValidationError = error.response.data;

        if (err.errors && err.errors.length) {
          const apiErrors = err.errors.reduce<
            FormikErrors<CreateOrderFormValues>
          >((apiErrors, { path, message }) => {
            if (destinationFormFields.has(path)) {
              return {
                ...apiErrors,
                destination: {
                  ...apiErrors.destination,
                  [path]: message
                }
              };
            }

            if (cargoFormFields.has(path)) {
              return {
                ...apiErrors,
                cargo: {
                  ...apiErrors.cargo,
                  [path]: message
                }
              };
            }

            if (senderFormFields.has(path)) {
              return {
                ...apiErrors,
                sender: {
                  ...apiErrors.sender,
                  [path]: message
                }
              };
            }

            return apiErrors;
          }, {});

          formik.setStatus({ apiErrors });
        }
      }
    }
  });

  const onNext = async () => {
    if (!isNil(formik.status.apiErrors[steps[activeIndex]])) {
      return;
    }

    const errors = await formik.setTouched({
      [steps[activeIndex]]: touchedFields[steps[activeIndex]]
    });

    if (isNil(errors[steps[activeIndex]]) && activeIndex !== steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const onPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;

    if (has(formik.status.apiErrors, name)) {
      formik.setStatus({
        apiErrors: omitBy(omit(formik.status.apiErrors, name), isEmpty)
      });
    }

    formik.handleChange(event);
  };

  return (
    <StyledCreateOrder>
      <Growl ref={growl} />
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <Steps model={items} activeIndex={activeIndex} />
            <div className="ui-widget-content">
              {activeIndex === 0 && (
                <DestinationForm
                  values={formik.values.destination}
                  touched={formik.touched.destination}
                  errors={formik.errors.destination}
                  apiErrors={formik.status.apiErrors.destination}
                  handleChange={handleChange}
                  onNext={onNext}
                />
              )}
              {activeIndex === 1 && (
                <CargoForm
                  values={formik.values.cargo}
                  touched={formik.touched.cargo}
                  errors={formik.errors.cargo}
                  apiErrors={formik.status.apiErrors.cargo}
                  handleChange={handleChange}
                  onNext={onNext}
                  onPrev={onPrev}
                />
              )}
              {activeIndex === 2 && (
                <SenderForm
                  loading={loading}
                  values={formik.values.sender}
                  touched={formik.touched.sender}
                  errors={formik.errors.sender}
                  apiErrors={formik.status.apiErrors.sender}
                  handleChange={handleChange}
                  onPrev={onPrev}
                  onSubmit={formik.handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledCreateOrder>
  );
};
