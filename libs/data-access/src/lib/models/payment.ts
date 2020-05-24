import { User } from './user';
import { Order } from './order';

export interface PaymentDTO {
  method: number;
  status: boolean;
  total: number;
  paymentAmount?: number;
  paymentDate?: Date;
  dueDate: Date;
  notes?: string;
  description?: string;
  clientId: number;
  orders: number[];
}

export interface Payment extends Omit<PaymentDTO, 'orders'> {
  id: number;
  client: User;
  orders: Order[];
  createdAt: Date;
}
