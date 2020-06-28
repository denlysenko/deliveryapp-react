import { BaseFilter } from './base-filter';

type OrderField = 'cargoName' | 'cityTo' | 'cityFrom' | 'id';

export interface OrdersFilter extends BaseFilter {
  filter?: {
    clientId?: number;
    cargoName?: string;
    cityTo?: string;
    cityFrom?: string;
    id?: number;
  };
  order?: Partial<
    {
      [key in OrderField]: 'desc' | 'asc';
    }
  >;
}
