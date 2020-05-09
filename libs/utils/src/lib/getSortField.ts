export const getSortField = (order: {
  [field: string]: 'asc' | 'desc' | undefined;
}) => Object.keys(order)[0];
