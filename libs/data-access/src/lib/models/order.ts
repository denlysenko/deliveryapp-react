import { User } from './user';

export interface Order {
  id?: number;
  cityFrom: string;
  cityTo: string;
  addressFrom: string;
  addressTo: string;
  cargoName: string;
  additionalData?: string;
  comment?: string;
  cargoWeight?: number;
  cargoVolume?: number;
  senderName?: string;
  senderCompany?: string;
  senderEmail: string;
  senderPhone: string;
  status?: number;
  deliveryCosts?: number;
  deliveryDate?: Date;
  paid?: boolean;
  paymentDate?: Date;
  invoiceId?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payment?: any;
  clientId?: number;
  client?: User;
  creatorId?: number;
  creator?: User;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
