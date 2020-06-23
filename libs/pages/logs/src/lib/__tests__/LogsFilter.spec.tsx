/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { LogsFilter, options } from '../LogsFilter/LogsFilter';

jest.mock('lodash', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...jest.requireActual<any>('lodash'),
  debounce: jest.fn((fn) => fn)
}));

const handleFilterChange = jest.fn();

describe('LogsFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <LogsFilter handleFilterChange={handleFilterChange} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render options', () => {
    render(<LogsFilter handleFilterChange={handleFilterChange} />);
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  it('should render first option for action if filter prop is not present', () => {
    const { container } = render(
      <LogsFilter handleFilterChange={handleFilterChange} />
    );
    expect(container.querySelector('.p-dropdown-label')).toHaveTextContent(
      options[0].label!
    );
  });

  it('should render first option for action if filter prop is empty', () => {
    const { container } = render(
      <LogsFilter filter={{}} handleFilterChange={handleFilterChange} />
    );
    expect(container.querySelector('.p-dropdown-label')).toHaveTextContent(
      options[0].label!
    );
  });

  it('should render action from filter', () => {
    const { container } = render(
      <LogsFilter
        filter={{ action: options[2].value }}
        handleFilterChange={handleFilterChange}
      />
    );
    expect(container.querySelector('.p-dropdown-label')).toHaveTextContent(
      options[2].label!
    );
  });

  describe('handleFilterChange', () => {
    it('should call if action has changed', () => {
      render(
        <LogsFilter
          filter={{ action: options[2].value }}
          handleFilterChange={handleFilterChange}
        />
      );

      fireEvent.click(screen.getAllByRole('option')[1]);

      expect(handleFilterChange).toBeCalledTimes(1);
      expect(handleFilterChange).toBeCalledWith({ action: options[1].value });
    });
  });
});
