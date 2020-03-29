import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { Button } from 'primereact/button';

import { isNil, has, omit } from 'lodash-es';

import { Roles } from '@deliveryapp/common';
import { Order, ordersClient, User, useAuth } from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';
import { useIsMounted } from '@deliveryapp/utils';

import { StyledUpdateOrder } from './StyledUpdateOrder';
import { MainInfo } from './MainInfo/MainInfo';
import { SenderInfo } from './SenderInfo/SenderInfo';
import { PaymentInfo } from './PaymentInfo/PaymentInfo';
import { ClientInfo } from './ClientInfo/ClientInfo';
import { AdditionalInfo } from './AdditionalInfo/AdditionalInfo';

export const UpdateOrder = () => {
  const isMounted = useIsMounted();
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [client, setClient] = useState<User | undefined>(undefined);
  const [createDate, setCreateDate] = useState<Date | undefined>(undefined);
  const [updateDate, setUpdateDate] = useState<Date | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();
  const [{ user }] = useAuth();
  const formik = useFormik<Order>({
    initialValues: {
      cityFrom: '',
      cityTo: '',
      addressFrom: '',
      addressTo: '',
      cargoName: '',
      additionalData: '',
      comment: '',
      cargoWeight: undefined,
      cargoVolume: undefined,
      senderName: '',
      senderCompany: '',
      senderEmail: '',
      senderPhone: '',
      status: undefined,
      deliveryCosts: undefined,
      deliveryDate: undefined,
      paid: undefined,
      paymentDate: undefined,
      invoiceId: undefined
    },
    initialStatus: {
      apiErrors: {}
    },
    onSubmit: values => {
      console.log(values);
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
                <div className="card">
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
                className="p-button-raised"
                disabled={pending}
              ></Button>
              <Button
                type="button"
                label="Back"
                className="p-button-secondary"
                disabled={pending}
                onClick={goBack}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </StyledUpdateOrder>
  );
};
