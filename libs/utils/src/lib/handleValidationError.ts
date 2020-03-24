import { FormikContextType, FormikErrors } from 'formik';
import { ValidationError } from '@deliveryapp/data-access';

export function handleValidationError<T>(
  error: ValidationError,
  formik: FormikContextType<T>
) {
  const apiErrors = error.errors.reduce<FormikErrors<T>>(
    (acc, { path, message }) => ({ ...acc, [path]: message }),
    {}
  );

  formik.setStatus({ apiErrors });
}
