type OrderField = 'cargoName' | 'cityTo' | 'cityFrom' | 'id';

export interface OrdersFilter {
  filter?: {
    clientId?: number;
    cargoName?: string;
    cityTo?: string;
    cityFrom?: string;
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
