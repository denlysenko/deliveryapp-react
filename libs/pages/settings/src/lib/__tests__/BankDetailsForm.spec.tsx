import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { settingsClient } from '@deliveryapp/data-access';
import { bankDetails } from '@deliveryapp/testing';

import { BankDetailsForm } from '../BankDetailsForm/BankDetailsForm';

describe('BankDetailsForm', () => {
  beforeEach(() => {
    jest
      .spyOn(settingsClient, 'createBankDetails')
      .mockImplementation(() =>
        Promise.resolve({ data: { id: bankDetails.id } })
      );

    jest
      .spyOn(settingsClient, 'updateBankDetails')
      .mockImplementation(() =>
        Promise.resolve({ data: { id: bankDetails.id } })
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<BankDetailsForm />);
    expect(baseElement).toBeTruthy();
  });

  describe('Submitting', () => {
    it('should create successfully', async () => {
      const name = 'Bank Name';

      render(<BankDetailsForm />);

      fireEvent.change(screen.getByTestId('name'), {
        target: {
          value: name
        }
      });

      fireEvent.click(screen.getByTestId('save'));

      await waitFor(() => {
        expect(settingsClient.createBankDetails).toBeCalledTimes(1);
      });

      expect(settingsClient.createBankDetails).toBeCalledWith({
        name,
        accountNumber: '',
        bin: '',
        swift: ''
      });
    });

    it('should update successfully', async () => {
      const updatedName = 'Updated Name';

      render(<BankDetailsForm bankDetails={bankDetails} />);

      fireEvent.change(screen.getByTestId('name'), {
        target: {
          value: updatedName
        }
      });

      fireEvent.click(screen.getByTestId('save'));

      await waitFor(() => {
        expect(settingsClient.updateBankDetails).toBeCalledTimes(1);
      });

      expect(settingsClient.updateBankDetails).toBeCalledWith(bankDetails.id, {
        name: updatedName,
        accountNumber: bankDetails.accountNumber,
        bin: bankDetails.bin,
        swift: bankDetails.swift
      });
    });
  });
});
