export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  role: number;
  address?: Address;
  bankDetails?: BankDetails;
}

export interface Address {
  country: string;
  city: string;
  street: string;
  house: string;
}

export interface BankDetails {
  name: string;
  accountNumber: string;
  bin: string;
  swift: string;
}
