import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DEFAULT_LIMIT } from '@deliveryapp/common';
import { Log, logsClient, LogsProvider } from '@deliveryapp/data-access';
import { log } from '@deliveryapp/testing';

import { Logs } from '../Logs';
import { options } from '../LogsFilter/LogsFilter';

const logs: Log[] = [];

for (let i = 0; i < 12; i++) {
  logs.push(log);
}

describe('Logs', () => {
  beforeEach(() => {
    jest.spyOn(logsClient, 'getLogs').mockResolvedValue({
      data: { rows: logs, count: 11 }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(
      <LogsProvider>
        <Logs />
      </LogsProvider>
    );
    await waitFor(() => expect(logsClient.getLogs).toBeCalledTimes(1));
    expect(baseElement).toBeTruthy();
  });

  it('should get orders with default filter', async () => {
    render(
      <LogsProvider>
        <Logs />
      </LogsProvider>
    );
    await waitFor(() => expect(logsClient.getLogs).toBeCalledTimes(1));

    expect(logsClient.getLogs).toBeCalledWith({
      filter: {},
      limit: DEFAULT_LIMIT,
      offset: 0,
      order: {
        createdAt: 'desc'
      }
    });
  });

  describe('filtering', () => {
    it('should filter orders', async () => {
      render(
        <LogsProvider>
          <Logs />
        </LogsProvider>
      );
      await waitFor(() => expect(logsClient.getLogs).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getAllByRole('option')[1]);

      await waitFor(() => {
        expect(logsClient.getLogs).toBeCalledWith({
          filter: {
            action: options[1].value
          },
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            createdAt: 'desc'
          }
        });
      });
    });
  });

  describe('sorting', () => {
    it('should sort logs by createdAt', async () => {
      render(
        <LogsProvider>
          <Logs />
        </LogsProvider>
      );
      await waitFor(() => expect(logsClient.getLogs).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('Created At'));

      await waitFor(() => {
        expect(logsClient.getLogs).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 0,
          order: {
            createdAt: 'asc'
          }
        });
      });
    });
  });

  describe('pagination', () => {
    it('should paginate logs', async () => {
      render(
        <LogsProvider>
          <Logs />
        </LogsProvider>
      );
      await waitFor(() => expect(logsClient.getLogs).toBeCalledTimes(1));

      jest.clearAllMocks();

      fireEvent.click(screen.getByText('2', { selector: '.p-paginator-page' }));

      await waitFor(() => {
        expect(logsClient.getLogs).toBeCalledWith({
          filter: {},
          limit: DEFAULT_LIMIT,
          offset: 10,
          order: {
            createdAt: 'desc'
          }
        });
      });
    });
  });
});
