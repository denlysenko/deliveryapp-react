type OrderField = 'id' | 'createdAt' | 'total' | 'status';

export interface PaymentsFilter {
  filter?: {
    id?: number;
  };
  order: Partial<
    {
      [key in OrderField]: 'desc' | 'asc';
    }
  >;
  offset?: number;
  limit?: number;
}
