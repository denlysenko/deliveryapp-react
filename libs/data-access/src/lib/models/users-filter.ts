type OrderField = 'id' | 'firstName' | 'lastName' | 'email';

export interface UsersFilter {
  filter?: {
    id?: number;
    role?: number[];
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  order?: Partial<
    {
      [key in OrderField]: 'desc' | 'asc';
    }
  >;
  offset?: number;
  limit?: number;
}
