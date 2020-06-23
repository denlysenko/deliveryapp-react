import { apiClient } from '@deliveryapp/core';

import { ListResponse } from '../models/list-response';
import { Log } from '../models/log';
import { LogsFilter } from '../models/logs-filter';

export function getLogs(
  query: LogsFilter
): Promise<{ data: ListResponse<Log> }> {
  return apiClient.get('/logs', query);
}
