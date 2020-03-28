export interface OrdersFilter {
  'order[cargoName]'?: 'desc' | 'asc';
  'order[cityTo]'?: 'desc' | 'asc';
  'order[cityFrom]'?: 'desc' | 'asc';
  'order[id]'?: 'desc' | 'asc';
  'filter[cargoName]'?: string;
  'filter[cityTo]'?: string;
  'filter[cityFrom]'?: string;
  'filter[id]'?: number;
  offset?: number;
  limit?: number;
}
