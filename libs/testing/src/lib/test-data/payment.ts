import { savedOrder } from './order';

export const createPaymentDto = {
  method: 1,
  status: false,
  total: 10,
  dueDate: new Date('2019-04-22T21:00:00.000Z'),
  clientId: 1,
  orders: [1]
};

export const updatePaymentDto = {
  status: true,
  description: 'test'
};

export const savedPayment = {
  id: 1,
  method: 1,
  status: false,
  total: 10,
  paymentAmount: 10,
  paymentDate: '2019-04-16T21:00:00.000Z',
  dueDate: '2019-04-22T21:00:00.000Z',
  notes: null,
  description: null,
  createdAt: '2019-04-16T10:14:05.617Z',
  orders: [savedOrder],
  client: {
    id: 1,
    email: 'test@test.com',
    firstName: '',
    lastName: '',
    company: 'DL',
    phone: ''
  }
};
