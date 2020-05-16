export interface CreateOrderFormValues {
  destination: {
    cityFrom: string;
    cityTo: string;
    addressFrom: string;
    addressTo: string;
    additionalData: string;
    clientId?: number;
  };
  cargo: {
    cargoName: string;
    cargoWeight: number | null;
    cargoVolume: number | null;
    comment: string;
  };
  sender: {
    senderCompany: string;
    senderName: string;
    senderEmail: string;
    senderPhone: string;
  };
}
