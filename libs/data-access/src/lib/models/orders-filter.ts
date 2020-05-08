export interface OrdersFilter {
  filter?: {
    clientId?: number;
    cargoName?: string;
    cityTo?: string;
    cityFrom?: string;
    id?: number;
  };
  order?: {
    cargoName?: 'desc' | 'asc';
    cityTo?: 'desc' | 'asc';
    cityFrom?: 'desc' | 'asc';
    id?: 'desc' | 'asc';
  };
  offset?: number;
  limit?: number;
}
