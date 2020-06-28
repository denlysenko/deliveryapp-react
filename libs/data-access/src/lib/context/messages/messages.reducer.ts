import { Message } from '../../models/message';
import { MessagesAction, MessagesActionTypes } from './messages.actions';

export interface MessagesState {
  entities: { [key: string]: Message };
  unread: number;
  totalCount: number;
}

export const initialMessagesState: MessagesState = {
  entities: {},
  unread: 0,
  totalCount: 0
};

export function messagesReducer(
  state: MessagesState,
  action: MessagesAction
): MessagesState {
  switch (action.type) {
    case MessagesActionTypes.MESSAGES_LOADED: {
      const { rows, count } = action.payload;
      let unread = state.unread;

      const entities = rows.reduce(
        (accumulator: { [id: string]: Message }, message: Message) => {
          if (!message.read) {
            unread++;
          }

          return {
            ...accumulator,
            [message._id]: message
          };
        },
        { ...state.entities }
      );

      return {
        ...state,
        entities,
        unread,
        totalCount: count
      };
    }

    case MessagesActionTypes.MESSAGE_RECEIVED: {
      const message = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [message._id]: message
        },
        unread: state.unread + 1,
        totalCount: state.totalCount + 1
      };
    }

    case MessagesActionTypes.MARKED_AS_READ: {
      const messageId = action.payload;
      const updatedMessage = { ...state.entities[messageId], read: true };

      return {
        ...state,
        entities: {
          ...state.entities,
          [messageId]: updatedMessage
        },
        unread: state.unread - 1
      };
    }

    default:
      return state;
  }
}
