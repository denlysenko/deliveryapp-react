export const toCurrency = (num: number) =>
  num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
