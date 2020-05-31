import { User } from './user';
import { Order } from './order';

export interface PaymentDTO {
  id: number | null;
  method: number;
  status: boolean;
  total: number | null;
  paymentAmount: number | null;
  paymentDate: Date | null;
  dueDate: Date | null;
  notes?: string;
  description?: string;
  clientId: number | null;
  orders: number[];
}

export interface Payment {
  id: number;
  method: number;
  status: boolean;
  total: number;
  paymentAmount: number | null;
  paymentDate: Date | null;
  dueDate: Date | null;
  notes?: string;
  description?: string;
  client: User;
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
}
