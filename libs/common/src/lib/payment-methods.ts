export enum PaymentMethod {
  CASH = 1,
  CASHLESS
}

export const paymentMethodNames: { [key: string]: string } = {
  [PaymentMethod.CASH]: 'Cash',
  [PaymentMethod.CASHLESS]: 'Cashless'
};
