import type { UserInterface } from './user.interface';

export type ListUsersOutputDto = UserInterface;

export interface ListUsersPaginationOutputDto {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface ResultListUserUseCaseInterface {
  data: ListUsersOutputDto[];
  pagination: ListUsersPaginationOutputDto;
}
