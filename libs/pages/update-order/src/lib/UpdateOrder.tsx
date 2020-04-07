import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';

import { isNil, has, omit, isEmpty } from 'lodash-es';
import * as Yup from 'yup';

import { Roles, ERRORS, MESSAGES } from '@deliveryapp/common';
import {
  UpdateOrderDTO,
  ordersClient,
  User,
  useAuth
} from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';
import { useIsMounted, handleValidationError } from '@deliveryapp/utils';

import { StyledUpdateOrder } from './StyledUpdateOrder';
import { MainInfo } from './MainInfo/MainInfo';
import { SenderInfo } from './SenderInfo/SenderInfo';
import { PaymentInfo } from './PaymentInfo/PaymentInfo';
import { ClientInfo } from './ClientInfo/ClientInfo';
import { AdditionalInfo } from './AdditionalInfo/AdditionalInfo';

const ValidationSchema = Yup.object().shape({
  cityFrom: Yup.string().required(ERRORS.REQUIRED_FIELD),
  cityTo: Yup.string().required(ERRORS.REQUIRED_FIELD),
  addressFrom: Yup.string().required(ERRORS.REQUIRED_FIELD),
  addressTo: Yup.string().required(ERRORS.REQUIRED_FIELD),
  cargoName: Yup.string().required(ERRORS.REQUIRED_FIELD),
  cargoWeight: Yup.number()
    .required(ERRORS.REQUIRED_FIELD)
    .typeError(ERRORS.NUMBER_FIELD),
  senderEmail: Yup.string()
    .required(ERRORS.REQUIRED_FIELD)
    .email(ERRORS.INVALID_EMAIL),
  senderPhone: Yup.string().required(ERRORS.REQUIRED_FIELD)
});

export const UpdateOrder = () => {
  const isMounted = useIsMounted();
  const growl = useRef<Growl>(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [client, setClient] = useState<Partial<User> | null>(null);
  const [createDate, setCreateDate] = useState<string | undefined>(undefined);
  const [updateDate, setUpdateDate] = useState<string | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [{ user }] = useAuth();
  const formik = useFormik<UpdateOrderDTO>({
    initialValues: {
      cityFrom: '',
      cityTo: '',
      addressFrom: '',
      addressTo: '',
      cargoName: '',
      additionalData: '',
      comment: '',
      cargoWeight: 0,
      cargoVolume: null,
      senderName: '',
      senderCompany: '',
      senderEmail: '',
      senderPhone: '',
      status: 0,
      deliveryCosts: null,
      deliveryDate: null,
      paid: false,
      paymentDate: null,
      invoiceId: null
    },
    initialStatus: {
      apiErrors: {}
    },
    validationSchema: ValidationSchema,
    onSubmit: async values => {
      if (!isEmpty(formik.status.apiErrors)) {
        return;
      }

      setPending(true);

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await ordersClient.updateOrderSelf(values.id!, values);
        setPending(false);
        !isNil(growl.current) &&
          growl.current.show({
            severity: 'success',
            summary: MESSAGES.UPDATE_ORDER_SUCCESS,
            closable: false
          });
      } catch (error) {
        setPending(false);
        handleValidationError<UpdateOrderDTO>(error.response.data, formik);
      }
    }
  });

  useEffect(() => {
    setLoading(true);

    ordersClient
      .getOrdersSelf({ 'filter[id]': parseInt(id, 10) })
      .then(({ data }) => {
        if (isMounted.current) {
          setLoading(false);

          if (!isNil(data.rows[0])) {
            const {
              createdAt,
              updatedAt,
              deletedAt,
              creatorId,
              creator,
              clientId,
              client,
              payment,
              ...rest
            } = data.rows[0];

            formik.setValues(rest);
            setCreateDate(createdAt);
            setUpdateDate(updatedAt);

            if (user?.role !== Roles.CLIENT) {
              setClient(client);
            }
          } else {
            history.push('/orders/create');
          }
        }
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
    <StyledUpdateOrder>
      <Growl ref={growl} />
      {loading ? (
        <FullPageSpinner />
      ) : (
        <div className="p-grid">
          <div className="p-col-12">
            <div className="card no-margin-bottom">
              <h2>Order Info</h2>
            </div>
          </div>
          <form
            id="updateOrderForm"
            data-testid="updateOrderForm"
            className="p-grid"
            onSubmit={formik.handleSubmit}
          >
            <div className="p-col-12 p-lg-4">
              <div className="card no-margin-bottom">
                <MainInfo
                  values={formik.values}
                  errors={formik.errors}
                  apiErrors={formik.status.apiErrors}
                  touched={formik.touched}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="p-col-12 p-lg-8">
              <div className="card">
                <SenderInfo
                  values={formik.values}
                  errors={formik.errors}
                  apiErrors={formik.status.apiErrors}
                  touched={formik.touched}
                  handleChange={handleChange}
                />
              </div>
              <div className="card">
                <PaymentInfo
                  values={formik.values}
                  handleChange={formik.handleChange}
                />
              </div>
              {user?.role !== Roles.CLIENT && (
                <div className="card client-block">
                  <ClientInfo client={client} />
                </div>
              )}
              <div className="card no-margin-bottom">
                <AdditionalInfo
                  values={formik.values}
                  handleChange={formik.handleChange}
                  createdAt={createDate}
                  updatedAt={updateDate}
                />
              </div>
            </div>
          </form>
          <div className="p-col-12">
            <div className="card no-margin-bottom center actions">
              <Button
                type="submit"
                form="updateOrderForm"
                label="Save"
                data-testid="save"
                className="p-button-raised"
                disabled={pending}
              ></Button>
              <Button
                type="button"
                label="Back"
                data-testid="back"
                className="p-button-secondary"
                disabled={pending}
                onClick={history.goBack}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </StyledUpdateOrder>
  );
};
