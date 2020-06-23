import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { settingsClient } from '@deliveryapp/data-access';
import { address, bankDetails } from '@deliveryapp/testing';

import { Settings } from '../Settings';

describe('Settings', () => {
  beforeEach(() => {
    jest
      .spyOn(settingsClient, 'getAddress')
      .mockResolvedValue({ data: address });
    jest
      .spyOn(settingsClient, 'getBankDetails')
      .mockResolvedValue({ data: bankDetails });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(<Settings />);

    await waitFor(() => {
      expect(settingsClient.getAddress).toBeCalledTimes(1);
      expect(settingsClient.getBankDetails).toBeCalledTimes(1);
    });

    expect(baseElement).toBeTruthy();
  });
});
