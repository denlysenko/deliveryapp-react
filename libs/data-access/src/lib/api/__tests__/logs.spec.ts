import { apiClient } from '@deliveryapp/core';
import { log } from '@deliveryapp/testing';

import { LogsFilter } from '../../models/logs-filter';
import { getLogs } from '../logs';

describe('API Logs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getLogs', () => {
    const query: LogsFilter = {
      limit: 10,
      offset: 0,
      order: { createdAt: 'asc' }
    };

    beforeEach(() => {
      jest
        .spyOn(apiClient, 'get')
        .mockResolvedValue({ data: { count: 1, rows: [log] } });
    });

    it('should send GET request', () => {
      getLogs(query);
      expect(apiClient.get).toBeCalledWith('/logs', query);
    });

    it('should return count and logs', async () => {
      expect(await getLogs(query)).toEqual({
        data: { count: 1, rows: [log] }
      });
    });
  });
});
