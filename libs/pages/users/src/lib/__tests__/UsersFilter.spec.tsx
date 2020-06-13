/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { options, UsersFilter } from '../UsersFilter/UsersFilter';

jest.mock('lodash', () => ({
  ...require.requireActual('lodash'),
  debounce: jest.fn((fn) => fn)
}));

const handleFilterChange = jest.fn();

describe('UsersFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <UsersFilter handleFilterChange={handleFilterChange} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render options', () => {
    render(<UsersFilter handleFilterChange={handleFilterChange} />);
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  it('should render first option for criteria if filter prop is not present', () => {
    const { container } = render(
      <UsersFilter handleFilterChange={handleFilterChange} />
    );
    expect(container.querySelector('.p-dropdown-label')).toHaveTextContent(
      options[0].label!
    );
  });

  it('should render first option for criteria if filter prop is empty', () => {
    const { container } = render(
      <UsersFilter filter={{}} handleFilterChange={handleFilterChange} />
    );
    expect(container.querySelector('.p-dropdown-label')).toHaveTextContent(
      options[0].label!
    );
  });

  it('should render empty string for searchTerm if filter prop is not present', () => {
    render(<UsersFilter handleFilterChange={handleFilterChange} />);
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('');
  });

  it('should render empty string for searchTerm if filter prop is empty', () => {
    render(<UsersFilter filter={{}} handleFilterChange={handleFilterChange} />);
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('');
  });

  it('should render searchTerm and criteria from filter', () => {
    const { container } = render(
      <UsersFilter
        filter={{ [options[2].value]: 'test' }}
        handleFilterChange={handleFilterChange}
      />
    );
    expect(container.querySelector('.p-dropdown-label')).toHaveTextContent(
      options[2].label!
    );
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('test');
  });

  describe('handleFilterChange', () => {
    it('should not call if criteria has changed, but searchTerm is empty', () => {
      render(
        <UsersFilter filter={{}} handleFilterChange={handleFilterChange} />
      );

      fireEvent.click(screen.getAllByRole('option')[0]);
      expect(handleFilterChange).toBeCalledTimes(0);
    });

    it('should call if searchTerm has changed', () => {
      render(
        <UsersFilter filter={{}} handleFilterChange={handleFilterChange} />
      );

      fireEvent.change(screen.getByPlaceholderText(/search/i), {
        target: {
          value: 'test'
        }
      });

      expect(handleFilterChange).toBeCalledTimes(1);
      expect(handleFilterChange).toBeCalledWith({ [options[0].value]: 'test' });
    });

    it('should call if criteria has changed', () => {
      render(
        <UsersFilter
          filter={{ [options[2].value]: 'test' }}
          handleFilterChange={handleFilterChange}
        />
      );

      fireEvent.click(screen.getAllByRole('option')[1]);

      expect(handleFilterChange).toBeCalledTimes(1);
      expect(handleFilterChange).toBeCalledWith({ [options[1].value]: 'test' });
    });
  });
});
