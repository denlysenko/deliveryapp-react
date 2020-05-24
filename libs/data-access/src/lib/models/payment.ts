import { User } from './user';
import { Order } from './order';

export interface Payment {
  id?: number;
  method: number;
  status: boolean;
  total: number;
  paymentAmount?: number;
  paymentDate?: Date;
  dueDate: Date;
  notes?: string;
  description?: string;
  client?: User;
  clientId?: number;
  creator?: User;
  orders?: Order[];
  createdAt?: Date;
}
