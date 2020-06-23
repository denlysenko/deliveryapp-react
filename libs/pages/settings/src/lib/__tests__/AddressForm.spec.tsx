import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { settingsClient } from '@deliveryapp/data-access';
import { address } from '@deliveryapp/testing';

import { AddressForm } from '../AddressForm/AddressForm';

describe('AddressForm', () => {
  beforeEach(() => {
    jest
      .spyOn(settingsClient, 'createAddress')
      .mockImplementation(() => Promise.resolve({ data: { id: address.id } }));

    jest
      .spyOn(settingsClient, 'updateAddress')
      .mockImplementation(() => Promise.resolve({ data: { id: address.id } }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<AddressForm />);
    expect(baseElement).toBeTruthy();
  });

  describe('Submitting', () => {
    it('should create successfully', async () => {
      const country = 'Country';
      const city = 'City';

      render(<AddressForm />);

      fireEvent.change(screen.getByTestId('country'), {
        target: {
          value: country
        }
      });

      fireEvent.change(screen.getByTestId('city'), {
        target: {
          value: city
        }
      });

      fireEvent.click(screen.getByTestId('save'));

      await waitFor(() => {
        expect(settingsClient.createAddress).toBeCalledTimes(1);
      });

      expect(settingsClient.createAddress).toBeCalledWith({
        country,
        city,
        street: '',
        house: ''
      });
    });

    it('should update successfully', async () => {
      const updatedCity = 'Updated City';

      render(<AddressForm address={address} />);

      fireEvent.change(screen.getByTestId('city'), {
        target: {
          value: updatedCity
        }
      });

      fireEvent.click(screen.getByTestId('save'));

      await waitFor(() => {
        expect(settingsClient.updateAddress).toBeCalledTimes(1);
      });

      expect(settingsClient.updateAddress).toBeCalledWith(address.id, {
        country: address.country,
        city: updatedCity,
        street: address.street,
        house: address.house
      });
    });
  });
});
