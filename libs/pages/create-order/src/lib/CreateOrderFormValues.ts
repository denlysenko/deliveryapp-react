export interface CreateOrderFormValues {
  destination: {
    cityFrom: string;
    cityTo: string;
    addressFrom: string;
    addressTo: string;
    additionalData?: string;
  };
  cargo: {
    cargoName: string;
    cargoWeight?: number;
    cargoVolume?: number;
    comment?: string;
  };
  sender: {
    senderCompany?: string;
    senderName?: string;
    senderEmail: string;
    senderPhone: string;
  };
}
