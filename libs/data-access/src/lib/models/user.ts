import { Address } from './address';
import { BankDetails } from './bank-details';

export interface UserDTO {
  id?: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  company?: string;
  phone: string | null;
  role: number | null;
  password?: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  phone: string | null;
  role: number;
  address?: Address | null;
  bankDetails?: BankDetails | null;
  createdAt: string;
}

export interface PasswordPayload {
  oldPassword: string;
  newPassword: string;
}
