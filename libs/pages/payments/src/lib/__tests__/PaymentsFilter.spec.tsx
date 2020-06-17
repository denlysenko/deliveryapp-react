import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { PaymentsFilter } from '../PaymentsFilter/PaymentsFilter';

jest.mock('lodash', () => ({
  ...jest.requireActual<any>('lodash'),
  debounce: jest.fn((fn) => fn)
}));

const handleFilterChange = jest.fn();

describe('PaymentsFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <PaymentsFilter handleFilterChange={handleFilterChange} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should render empty string for searchTerm if filter prop is not present', () => {
    render(<PaymentsFilter handleFilterChange={handleFilterChange} />);
    expect(screen.getByPlaceholderText(/search by number/i)).toHaveValue('');
  });

  it('should render empty string for searchTerm if filter prop is empty', () => {
    render(
      <PaymentsFilter filter={{}} handleFilterChange={handleFilterChange} />
    );
    expect(screen.getByPlaceholderText(/search by number/i)).toHaveValue('');
  });

  it('should render searchTerm from filter', () => {
    render(
      <PaymentsFilter
        filter={{ id: 1 }}
        handleFilterChange={handleFilterChange}
      />
    );
    expect(screen.getByPlaceholderText(/search by number/i)).toHaveValue('1');
  });

  describe('handleFilterChange', () => {
    it('should call if searchTerm has changed', () => {
      render(
        <PaymentsFilter filter={{}} handleFilterChange={handleFilterChange} />
      );

      fireEvent.change(screen.getByPlaceholderText(/search by number/i), {
        target: {
          value: '2'
        }
      });

      expect(handleFilterChange).toBeCalledTimes(1);
      expect(handleFilterChange).toBeCalledWith({ id: 2 });
    });
  });
});
