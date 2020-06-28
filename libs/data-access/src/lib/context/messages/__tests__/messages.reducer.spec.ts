import { message } from '@deliveryapp/testing';

import { MessagesAction, MessagesActionTypes } from '../messages.actions';
import { initialMessagesState, messagesReducer } from '../messages.reducer';

const newMessage = {
  forEmployee: true,
  read: false,
  _id: 'new_message_id',
  text: 'New order # 2 created by client 1',
  createdAt: '2020-04-07T19:10:32.859Z',
  __v: 0
};

describe('[Messages Context] Reducer', () => {
  describe('Unknown type', () => {
    it('should return passed state', () => {
      const action = {} as MessagesAction;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const state: any = { type: 'UNKNOWN' };
      const updatedState = messagesReducer(state, action);
      expect(updatedState).toBe(state);
    });
  });

  describe('MESSAGES_LOADED', () => {
    const payload = {
      count: 1,
      rows: [message]
    };

    it('should update state with new messages', () => {
      const action: MessagesAction = {
        type: MessagesActionTypes.MESSAGES_LOADED,
        payload
      };
      const updatedState = messagesReducer(initialMessagesState, action);
      expect(updatedState.entities).toEqual({ [message._id]: message });
      expect(updatedState.unread).toEqual(0);
      expect(updatedState.totalCount).toEqual(1);
    });
  });

  describe('MESSAGE_RECEIVED', () => {
    it('should update state with new message', () => {
      const action: MessagesAction = {
        type: MessagesActionTypes.MESSAGE_RECEIVED,
        payload: newMessage
      };
      const updatedState = messagesReducer(initialMessagesState, action);
      expect(updatedState.entities).toEqual({
        [newMessage._id]: newMessage
      });
      expect(updatedState.unread).toEqual(1);
      expect(updatedState.totalCount).toEqual(1);
    });
  });

  describe('MARKED_AS_READ', () => {
    it('should update message in state', () => {
      const action: MessagesAction = {
        type: MessagesActionTypes.MARKED_AS_READ,
        payload: newMessage._id
      };

      const updatedState = messagesReducer(initialMessagesState, {
        type: MessagesActionTypes.MESSAGE_RECEIVED,
        payload: newMessage
      });
      expect(updatedState.unread).toEqual(1);

      const updatedState2 = messagesReducer(updatedState, action);

      expect(updatedState2.entities).toEqual({
        [newMessage._id]: { ...newMessage, read: true }
      });
      expect(updatedState2.unread).toEqual(0);
    });
  });
});
