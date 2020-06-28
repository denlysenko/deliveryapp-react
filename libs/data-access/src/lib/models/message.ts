export interface Message {
  _id: string;
  text: string;
  read: boolean;
  recipientId?: number;
  forEmployee: boolean;
  createdAt: string;
}
