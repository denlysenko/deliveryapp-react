export const getSortOrder = (order?: {
  [field: string]: 'asc' | 'desc' | undefined;
}) =>
  order
    ? Object.values(order)[0] === undefined
      ? -1
      : Object.values(order)[0] === 'asc'
      ? 1
      : -1
    : undefined;
