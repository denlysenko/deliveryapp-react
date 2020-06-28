import { BaseFilter } from './base-filter';

type OrderField = 'id' | 'firstName' | 'lastName' | 'email';

export interface UsersFilter extends BaseFilter {
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
}
