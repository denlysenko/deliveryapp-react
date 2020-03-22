import React, { useState } from 'react';

import { useFormik, FormikTouched } from 'formik';
import * as Yup from 'yup';
import { isNil } from 'lodash-es';

import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/api';

import { ERRORS } from '@deliveryapp/common';

import { StyledCreateOrder } from './StyledCreateOrder';
import { DestinationForm } from './DestinationForm/DestinationForm';
import { CargoForm } from './CargoForm/CargoForm';
import { SenderForm } from './SenderForm/SenderForm';

export interface CreateOrderFormValues {
  destination: {
    cityFrom: string;
    cityTo: string;
    addressFrom: string;
    addressTo: string;
    additionalData?: string;
  };
  cargo: {
    cargoName: string;
    cargoWeight?: number;
    cargoVolume?: number;
    comment?: string;
  };
  sender: {
    senderCompany?: string;
    senderName?: string;
    senderEmail: string;
    senderPhone: string;
  };
}

const items: MenuItem[] = [
  { label: 'Destination' },
  { label: 'Cargo' },
  { label: 'Sender' }
];

const initialValues = {
  destination: {
    cityFrom: '',
    cityTo: '',
    addressFrom: '',
    addressTo: '',
    additionalData: ''
  },
  cargo: {
    cargoName: '',
    cargoWeight: undefined,
    cargoVolume: undefined,
    comment: ''
  },
  sender: {
    senderCompany: '',
    senderName: '',
    senderEmail: '',
    senderPhone: ''
  }
};

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

const touchedFields: FormikTouched<CreateOrderFormValues> = {
  destination: {
    cityFrom: true,
    cityTo: true,
    addressFrom: true,
    addressTo: true
  },
  cargo: {
    cargoName: true,
    cargoWeight: true
  },
  sender: {
    senderEmail: true,
    senderPhone: true
  }
};

const steps: (keyof CreateOrderFormValues)[] = [
  'destination',
  'cargo',
  'sender'
];

export const CreateOrder = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const formik = useFormik<CreateOrderFormValues>({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: values => {
      const order = {
        ...values.destination,
        ...values.cargo,
        ...values.sender
      };
      console.log(order);
    }
  });

  const onNext = async () => {
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

  return (
    <StyledCreateOrder>
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
                  handleChange={formik.handleChange}
                  onNext={onNext}
                />
              )}
              {activeIndex === 1 && (
                <CargoForm
                  values={formik.values.cargo}
                  touched={formik.touched.cargo}
                  errors={formik.errors.cargo}
                  handleChange={formik.handleChange}
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
                  handleChange={formik.handleChange}
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
