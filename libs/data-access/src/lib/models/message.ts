export interface Message {
  _id: string;
  text: string;
  read: boolean;
  recipientId?: number;
  forEmployee: boolean;
  createdAt: string;
}

export interface FCMMessagePayload {
  notification: {
    title: string;
    body: string;
  };
  data: {
    _id: string;
    text: string;
    read: 'true' | 'false';
    recipientId: string;
    forEmployee: 'true' | 'false';
    createdAt: string;
  };
}
