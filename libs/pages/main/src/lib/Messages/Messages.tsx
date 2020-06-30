import React, { useCallback } from 'react';

import { Button } from 'primereact/button';

import dayjs from 'dayjs';

import { Message } from '@deliveryapp/data-access';
import { InfiniteScroll } from '@deliveryapp/ui';

import { StyledMessages } from './StyledMessages';

interface MessagesProps {
  count: number;
  messages: Message[];
  onMarkAsRead: (id: string) => void;
  onLoadMore: () => void;
}

export const Messages: React.FC<MessagesProps> = ({
  count,
  messages,
  onMarkAsRead,
  onLoadMore
}) => {
  const loadMore = useCallback(() => {
    if (messages.length < count) {
      onLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, count]);

  return (
    <StyledMessages>
      <div className="card" data-testid="messages-list">
        <InfiniteScroll onLoadMore={loadMore}>
          {messages.length > 0 ? (
            <>
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`p-message ${message.read ? 'read' : ''}`}
                >
                  <Button
                    type="button"
                    icon="pi pi-check"
                    className="status-icon"
                    tooltip="Mark As Read"
                    onClick={() => onMarkAsRead(message._id)}
                  />
                  <p className="text">{message.text}</p>
                  <span className="date">
                    {dayjs(message.createdAt).format('DD.MM.YYYY HH:mm')}
                  </span>
                </div>
              ))}
            </>
          ) : (
            <p>You don't have any message yet</p>
          )}
        </InfiniteScroll>
      </div>
    </StyledMessages>
  );
};
