import { BaseFilter } from './base-filter';

type OrderField = 'createdAt';

export interface LogsFilter extends BaseFilter {
  filter?: {
    userId?: number;
    action?: number;
  };
  order?: Partial<
    {
      [key in OrderField]: 'desc' | 'asc';
    }
  >;
}
