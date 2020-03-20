import { FormikContextType } from 'formik';
import { ValidationError } from '@deliveryapp/data-access';

export function handleValidationError(
  error: ValidationError,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikContextType<any>
) {
  error.errors.forEach(({ path, message }) => {
    formik.setFieldError(path, message);
  });
}
