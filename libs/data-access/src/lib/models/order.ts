import { User } from './user';

export interface CreateOrderDTO {
  cityFrom: string;
  cityTo: string;
  addressFrom: string;
  addressTo: string;
  additionalData: string;
  cargoName: string;
  cargoWeight: number | null;
  cargoVolume: number | null;
  comment: string;
  senderCompany: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
}

export interface UpdateOrderDTO extends CreateOrderDTO {
  id?: number;
  cargoVolume: number | null;
  status: number;
  deliveryCosts: number | null;
  deliveryDate: Date | null;
  paid: boolean;
  paymentDate: Date | null;
  invoiceId: number | null;
}

export interface Order extends UpdateOrderDTO {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payment: any | null;
  clientId: number;
  client: Partial<User>;
  creatorId: number;
  creator: Partial<User>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
