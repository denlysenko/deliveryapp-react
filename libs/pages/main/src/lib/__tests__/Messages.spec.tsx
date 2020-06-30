import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { message } from '@deliveryapp/testing';

import { Messages } from '../Messages/Messages';

const onMarkAsRead = jest.fn();
const onLoadMore = jest.fn();

class IntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver
});

describe('Messages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <Messages
        count={1}
        messages={[{ ...message, read: false }]}
        onMarkAsRead={onMarkAsRead}
        onLoadMore={onLoadMore}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should call onMarkAsRead', () => {
    render(
      <Messages
        count={1}
        messages={[{ ...message, read: false }]}
        onMarkAsRead={onMarkAsRead}
        onLoadMore={onLoadMore}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onMarkAsRead).toBeCalledWith(message._id);
  });
});
