import ResultPaginationInterface from '@src/shared/applications/contracts/result-pagination.interface';

export const LIST_USERS_USE_CASE_INTERFACE = 'ListUsersUseCaseInterface';

export interface ResultListUserUseCaseInterface {
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
    };
  }[];
  metadata: { pagination: ResultPaginationInterface };
}

export interface DataListUsersUseCaseInterface {
  page?: number;
  limit?: number;
  route: string;
  sort?: string;
}

export default interface ListUsersUseCaseInterface {
  execute(
    data: DataListUsersUseCaseInterface,
  ): Promise<ResultListUserUseCaseInterface>;
}
