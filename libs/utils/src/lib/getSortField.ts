export const getSortField = (order?: {
  [field: string]: 'asc' | 'desc' | undefined;
}) => (order ? Object.keys(order)[0] : undefined);
