type OrderField = 'createdAt';

export interface LogsFilter {
  filter?: {
    userId?: number;
    action?: number;
  };
  order?: Partial<
    {
      [key in OrderField]: 'desc' | 'asc';
    }
  >;
  offset?: number;
  limit?: number;
}
