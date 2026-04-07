export interface ResultCreateUserUseCaseInterface {
  data: {
    id: string;
    isPaidMembership: boolean;
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    role: string;
    status: string;
    documents?: {
      identityDocument?: string;
      socialDocument?: string;
      otherDocumentt?: string;
    };
    details?: {
      phone?: string;
      isWhatsapp?: boolean;
      isTelegram?: boolean;
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
    social?: {
      facebook?: string;
      x?: string;
      instagram?: string;
      linkedin?: string;
      whatsapp?: string;
      telegram?: string;
    };
  };
}
