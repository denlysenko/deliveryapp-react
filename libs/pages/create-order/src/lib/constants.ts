import { FormikTouched } from 'formik';
import { MenuItem } from 'primereact/api';

import { CreateOrderFormValues } from './CreateOrderFormValues';

export const items: MenuItem[] = [
  { label: 'Destination' },
  { label: 'Cargo' },
  { label: 'Sender' }
];

export const touchedFields: FormikTouched<CreateOrderFormValues> = {
  destination: {
    cityFrom: true,
    cityTo: true,
    addressFrom: true,
    addressTo: true,
    clientId: true
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

export const steps: (keyof CreateOrderFormValues)[] = [
  'destination',
  'cargo',
  'sender'
];

export const destinationFormFields = new Set([
  'cityFrom',
  'cityTo',
  'addressFrom',
  'addressTo'
]);
export const cargoFormFields = new Set(['cargoName', 'cargoWeight']);
export const senderFormFields = new Set(['senderEmail', 'senderPhone']);
