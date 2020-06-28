import { ListResponse } from '../../models/list-response';
import { Message } from '../../models/message';

export enum MessagesActionTypes {
  MESSAGES_LOADED = '[Messages] Messages Loaded',
  MESSAGE_RECEIVED = '[Messages] Message Received',
  MARKED_AS_READ = '[Messages] Message Marked As Read'
}

interface MessagesLoadedAction {
  type: MessagesActionTypes.MESSAGES_LOADED;
  payload: ListResponse<Message>;
}

interface MessageReceivedAction {
  type: MessagesActionTypes.MESSAGE_RECEIVED;
  payload: Message;
}

interface MarkedAsReadAction {
  type: MessagesActionTypes.MARKED_AS_READ;
  payload: string;
}

export type MessagesAction =
  | MessagesLoadedAction
  | MessageReceivedAction
  | MarkedAsReadAction;

export type MessagesDispatch = (action: MessagesAction) => void;
