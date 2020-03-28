import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import { isNil } from 'lodash-es';

import { Order, ordersClient } from '@deliveryapp/data-access';
import { FullPageSpinner } from '@deliveryapp/ui';
import { useIsMounted } from '@deliveryapp/utils';

import { StyledUpdateOrder } from './StyledUpdateOrder';

export const UpdateOrder = () => {
  const isMounted = useIsMounted();
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
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
          }
        }
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <StyledUpdateOrder>
      <h1>Welcome to update-order page!</h1>
      {loading ? (
        <FullPageSpinner />
      ) : (
        <div>{JSON.stringify(formik.values, null, 2)}</div>
      )}
    </StyledUpdateOrder>
  );
};
